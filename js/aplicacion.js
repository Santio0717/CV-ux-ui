document.addEventListener("DOMContentLoaded", () => {

  // Año footer
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const canvas = document.getElementById("skillsDonut");
  const wrapper = canvas?.closest(".donut-wrapper");
  const tooltip = document.getElementById("donutTooltip");

  const skills = {
    uxui:   { label: "UX/UI", value: 35, color: "#f39c12" },
    docs:   { label: "Documentación", value: 20, color: "#2ecc71" },
    front:  { label: "Frontend", value: 15, color: "#3498db" },
    motion: { label: "Motion", value: 20, color: "#9b59b6" },
    prod:   { label: "Producción", value: 10, color: "#e74c3c" }
  };

  const allKeys = Object.keys(skills);
  const allLabels = allKeys.map(k => skills[k].label);
  const allValues = allKeys.map(k => skills[k].value);
  const allColors = allKeys.map(k => skills[k].color);

  let mode = "all";
  let selectedKey = null;
  let chart = null;

  // ✅ Punto fijo: arriba (12 en punto)
  // -90° => inicia en la parte superior siempre
  const FIXED_ROTATION = -90;
  const FIXED_CIRCUMFERENCE = 360;

  function createDonut(){
    if (!canvas || typeof Chart === "undefined") return;

    chart = new Chart(canvas, {
      type: "doughnut",
      data: {
        labels: allLabels,
        datasets: [{
          data: allValues,
          backgroundColor: allColors,
          borderWidth: 0,
          hoverOffset: 10,
          // ✅ evita que Chart.js “acomode” arcos raro
          spacing: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%",
        rotation: FIXED_ROTATION,
        circumference: FIXED_CIRCUMFERENCE,
        animation: { duration: 250 },
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        }
      }
    });

    // Tooltip follow mouse (opcional)
    wrapper?.addEventListener("mousemove", (e) => {
      if (!tooltip || !wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      tooltip.style.left = (e.clientX - rect.left) + "px";
      tooltip.style.top  = (e.clientY - rect.top) + "px";
    });

    canvas.addEventListener("mousemove", (evt) => {
      if (!tooltip || !chart) return;

      const points = chart.getElementsAtEventForMode(evt, "nearest", { intersect: true }, true);
      if (!points.length) {
        tooltip.style.opacity = "0";
        return;
      }

      const idx = points[0].index;

      // Si está en single, index 1 es el “resto gris”, no mostramos tooltip
      if (mode === "single" && idx === 1) {
        tooltip.style.opacity = "0";
        return;
      }

      if (mode === "all") {
        const key = allKeys[idx];
        const s = skills[key];
        tooltip.textContent = `${s.label} — ${s.value}%`;
        tooltip.style.background = s.color;
        tooltip.style.opacity = "1";
      } else {
        const s = skills[selectedKey];
        tooltip.textContent = `${s.label} — ${s.value}%`;
        tooltip.style.background = s.color;
        tooltip.style.opacity = "1";
      }
    });

    canvas.addEventListener("mouseleave", () => {
      if (tooltip) tooltip.style.opacity = "0";
    });
  }

  function showAll(){
    if (!chart) return;

    mode = "all";
    selectedKey = null;

    chart.options.rotation = FIXED_ROTATION;
    chart.options.circumference = FIXED_CIRCUMFERENCE;

    chart.data.labels = allLabels;
    chart.data.datasets[0].data = allValues;
    chart.data.datasets[0].backgroundColor = allColors;

    chart.update();
  }

  function showSingle(key){
    if (!chart) return;
    const s = skills[key];
    if (!s) return;

    mode = "single";
    selectedKey = key;

    const rest = Math.max(0, 100 - s.value);

    // ✅ SIEMPRE inicia en el mismo punto: fijamos rotation/circumference
    chart.options.rotation = FIXED_ROTATION;
    chart.options.circumference = FIXED_CIRCUMFERENCE;

    // ✅ 2 segmentos: [valor, resto]
    chart.data.labels = [s.label, ""];
    chart.data.datasets[0].data = [s.value, rest];
    chart.data.datasets[0].backgroundColor = [s.color, "rgba(0,0,0,.12)"];

    chart.update();
  }

  // Botones
  document.querySelectorAll(".tech-btn[data-key]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tech-btn").forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      showSingle(btn.dataset.key);
    });
  });

  document.getElementById("showAll")?.addEventListener("click", function() {
    document.querySelectorAll(".tech-btn").forEach(b => b.classList.remove("is-active"));
    this.classList.add("is-active");
    showAll();
  });

  // Animación cards
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".card").forEach(card => observer.observe(card));

  // INIT
  createDonut();
  showAll();
});
