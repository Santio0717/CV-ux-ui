document.addEventListener("DOMContentLoaded", () => {

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

  const keys   = Object.keys(skills);
  const labels = keys.map(k => skills[k].label);
  const values = keys.map(k => skills[k].value);
  const colors = keys.map(k => skills[k].color);

  let mode = "all";
  let selectedKey = null;

  // ✅ PUNTO FIJO REAL: 12 en punto
  // Usamos grados como STRING para evitar interpretación en radianes
  const ROTATION_FIXED = "-90deg";
  const CIRC_FIXED     = "360deg"; // horario: hacia la derecha

  const chart = new Chart(canvas, {
    type: "doughnut",
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: colors,
        borderWidth: 0,
        spacing: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "70%",
      rotation: ROTATION_FIXED,
      circumference: CIRC_FIXED,
      animation: {
        animateRotate: false,
        animateScale: false,
        duration: 0
      },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      }
    }
  });

  function showAll(){
    mode = "all";
    selectedKey = null;

    chart.options.rotation = ROTATION_FIXED;
    chart.options.circumference = CIRC_FIXED;

    chart.data.labels = labels;
    chart.data.datasets[0].data = values;
    chart.data.datasets[0].backgroundColor = colors;
    chart.update();
  }

  function showSingle(key){
    const s = skills[key];
    if (!s) return;

    mode = "single";
    selectedKey = key;

    const rest = Math.max(0, 100 - s.value);

    chart.options.rotation = ROTATION_FIXED;
    chart.options.circumference = CIRC_FIXED;

    // ✅ porcentaje + resto gris
    chart.data.labels = [s.label, ""];
    chart.data.datasets[0].data = [s.value, rest];
    chart.data.datasets[0].backgroundColor = [s.color, "rgba(0,0,0,.15)"];
    chart.update();
  }

  // Tooltip opcional
  if (wrapper && tooltip) {
    wrapper.addEventListener("mousemove", (e) => {
      const rect = wrapper.getBoundingClientRect();
      tooltip.style.left = (e.clientX - rect.left) + "px";
      tooltip.style.top  = (e.clientY - rect.top) + "px";
    });

    canvas.addEventListener("mousemove", (evt) => {
      const points = chart.getElementsAtEventForMode(evt, "nearest", { intersect: true }, true);
      if (!points.length) { tooltip.style.opacity = "0"; return; }

      const idx = points[0].index;
      if (mode === "single" && idx === 1) { tooltip.style.opacity = "0"; return; }

      const s = (mode === "all")
        ? skills[keys[idx]]
        : skills[selectedKey];

      tooltip.textContent = `${s.label} — ${s.value}%`;
      tooltip.style.background = s.color;
      tooltip.style.opacity = "1";
    });

    canvas.addEventListener("mouseleave", () => tooltip.style.opacity = "0");
  }

  // Botones
  document.querySelectorAll(".tech-btn[data-key]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tech-btn").forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      showSingle(btn.dataset.key);
    });
  });

  document.getElementById("showAll")?.addEventListener("click", function(){
    document.querySelectorAll(".tech-btn").forEach(b => b.classList.remove("is-active"));
    this.classList.add("is-active");
    showAll();
  });

  // Init
  showAll();
});
