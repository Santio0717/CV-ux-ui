document.addEventListener("DOMContentLoaded", () => {

  /* ==========================
     AÑO FOOTER
  ========================== */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ==========================
     CONFIGURACIÓN DE DATOS
  ========================== */
  const skills = {
    uxui:   { label: "UX/UI", value: 35, color: "#f39c12" },
    docs:   { label: "Documentación", value: 20, color: "#2ecc71" },
    front:  { label: "Frontend", value: 15, color: "#3498db" },
    motion: { label: "Motion", value: 20, color: "#9b59b6" },
    prod:   { label: "Producción", value: 10, color: "#e74c3c" }
  };

  const canvas = document.getElementById("skillsDonut");
  const wrapper = canvas?.closest(".donut-wrapper");
  const tooltip = document.getElementById("donutTooltip");

  const keys   = Object.keys(skills);
  const labels = keys.map(k => skills[k].label);
  const values = keys.map(k => skills[k].value);
  const colors = keys.map(k => skills[k].color);

  let mode = "all";        // all | single
  let selectedKey = null;
  let chart = null;

  // 🔒 CONSTANTES DE POSICIONAMIENTO
  // -90 grados coloca el inicio a las 12:00. 
  // Chart.js por defecto dibuja en sentido horario.
  const ROTATION_12_PM = -90; 
  const CIRCUMFERENCE_FULL = 360;

  /* ==========================
     CREACIÓN DEL CHART
  ========================== */
  function createDonut(){
    if (!canvas || typeof Chart === "undefined") return;

    chart = new Chart(canvas, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: colors,
          borderWidth: 0,
          spacing: 2 // Pequeña separación estética
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "75%", // Grosor de la dona
        rotation: ROTATION_12_PM,
        circumference: CIRCUMFERENCE_FULL,
        animation: {
          animateRotate: true,
          duration: 600,
          easing: 'easeOutQuart'
        },
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false } // Desactivamos el de fábrica para usar el tuyo
        }
      }
    });

    // Eventos de Tooltip
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

      // En modo single, ignoramos el "resto gris" (índice 1)
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

  /* ==========================
     FUNCIONES DE FILTRADO
  ========================== */
  function showAll(){
    if (!chart) return;

    mode = "all";
    selectedKey = null;

    chart.data.labels = labels;
    chart.data.datasets[0].data = values;
    chart.data.datasets[0].backgroundColor = colors;

    // Aseguramos que se mantenga la orientación
    chart.options.rotation = ROTATION_12_PM;
    chart.update();
  }

  function showSingle(key){
    if (!chart || !skills[key]) return;

    mode = "single";
    selectedKey = key;

    const s = skills[key];
    const rest = Math.max(0, 100 - s.value);

    // Al ser el primer elemento del array, s.value iniciará 
    // siempre en el punto definido por rotation (-90)
    chart.data.labels = [s.label, "Resto"];
    chart.data.datasets[0].data = [s.value, rest];
    chart.data.datasets[0].backgroundColor = [
      s.color,
      "rgba(0,0,0,0.1)" // Color de fondo para el área vacía
    ];

    chart.options.rotation = ROTATION_12_PM;
    chart.update();
  }

  /* ==========================
     INTERACCIONES (BOTONES)
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
     ANIMACIÓN DE ENTRADA (CARDS)
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
     INICIALIZACIÓN
  ========================== */
  createDonut();
  // Iniciamos mostrando todo
  showAll();

});
