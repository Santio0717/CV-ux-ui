document.addEventListener("DOMContentLoaded", () => {

  /* ==========================
     AÑO FOOTER
  ========================== */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ==========================
     DONUT CHART
     - Inicio fijo: 12 en punto
     - Crece hacia la derecha (horario)
     - Single: porcentaje + resto gris
  ========================== */
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

  let mode = "all";        // all | single
  let selectedKey = null;
  let chart = null;

  // 🔒 PUNTO FIJO
  const ROTATION_FIXED = -90;  // 12 en punto
  const CIRC_FIXED     = 360;  // horario → derecha

  function createDonut(){
    if (!canvas || typeof Chart === "undefined") return;

    chart = new Chart(canvas, {
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
          animateRotate: false, // 🔑 evita saltos raros
          duration: 200
        },
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        }
      }
    });

    /* Tooltip personalizado (opcional) */
    if (wrapper && tooltip) {
      wrapper.addEventListener("mousemove", (e) => {
        const rect = wrapper.getBoundingClientRect();
        tooltip.style.left = (e.clientX - rect.left) + "px";
        tooltip.style.top  = (e.clientY - rect.top) + "px";
      });
    }

    canvas.addEventListener("mousemove", (evt) => {
      if (!tooltip || !chart) return;

      const points = chart.getElementsAtEventForMode(
        evt,
        "nearest",
        { intersect: true },
        true
      );

      if (!points.length) {
        tooltip.style.opacity = "0";
        return;
      }

      const idx = points[0].index;

      // En modo single, el índice 1 es el resto gris
      if (mode === "single" && idx === 1) {
        tooltip.style.opacity = "0";
        return;
      }

      if (mode === "all") {
        const key = keys[idx];
        const s = skills[key];
        tooltip.textContent = `${s.label} — ${s.value}%`;
        tooltip.style.background = s.color;
      } else {
        const s = skills[selectedKey];
        tooltip.textContent = `${s.label} — ${s.value}%`;
        tooltip.style.background = s.color;
      }

      tooltip.style.opacity = "1";
    });

    canvas.addEventListener("mouseleave", () => {
      if (tooltip) tooltip.style.opacity = "0";
    });
  }

  function showAll(){
    if (!chart) return;

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
    if (!chart || !skills[key]) return;

    mode = "single";
    selectedKey = key;

    const s = skills[key];
    const rest = Math.max(0, 100 - s.value);

    chart.options.rotation = ROTATION_FIXED;
    chart.options.circumference = CIRC_FIXED;

    // ✅ SOLO porcentaje + resto gris
    chart.data.labels = [s.label, ""];
    chart.data.datasets[0].data = [s.value, rest];
    chart.data.datasets[0].backgroundColor = [
      s.color,
      "rgba(0,0,0,.15)"
    ];

    chart.update();
  }

  /* ==========================
     BOTONES
  ========================== */
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

  /* ==========================
     ANIMACIÓN CARDS
  ========================== */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("is-visible");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".card").forEach(card => observer.observe(card));

  /* ==========================
     INIT
  ========================== */
  createDonut();
  showAll();

});
