document.addEventListener("DOMContentLoaded", () => {

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

  let chart = null;
  let mode = "all";
  let selectedKey = null;

  // 🔒 CONFIGURACIÓN DE POSICIÓN
  // -90 grados es el estándar para mover el inicio de las 3:00 PM a las 12:00 PM.
  const START_ANGLE = -90; 

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
          spacing: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "75%",
        // Forzamos inicio a las 12 y rotación horaria (por defecto en Chart.js)
        rotation: START_ANGLE,
        circumference: 360,
        animation: {
          animateRotate: true,
          duration: 700
        },
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        }
      }
    });

    // Tooltip personalizado
    if (wrapper && tooltip) {
      wrapper.addEventListener("mousemove", (e) => {
        const rect = wrapper.getBoundingClientRect();
        tooltip.style.left = (e.clientX - rect.left) + "px";
        tooltip.style.top  = (e.clientY - rect.top) + "px";
      });
    }

    canvas.addEventListener("mousemove", (evt) => {
      if (!tooltip || !chart) return;
      const points = chart.getElementsAtEventForMode(evt, "nearest", { intersect: true }, true);
      
      if (!points.length) {
        tooltip.style.opacity = "0";
        return;
      }

      const idx = points[0].index;
      if (mode === "single" && idx === 1) { // Ignorar el fondo gris
        tooltip.style.opacity = "0";
        return;
      }

      const s = (mode === "all") ? skills[keys[idx]] : skills[selectedKey];
      tooltip.textContent = `${s.label} — ${s.value}%`;
      tooltip.style.background = s.color;
      tooltip.style.opacity = "1";
    });

    canvas.addEventListener("mouseleave", () => {
      if (tooltip) tooltip.style.opacity = "0";
    });
  }

  /* ==========================
     LÓGICA DE ACTUALIZACIÓN
  ========================== */
  function showSingle(key){
    if (!chart || !skills[key]) return;

    mode = "single";
    selectedKey = key;
    const s = skills[key];
    const rest = 100 - s.value;

    // ✅ Al poner s.value en el índice [0], garantizamos que empiece 
    // en la rotación de las 12 PM y crezca hacia la derecha.
    chart.data.labels = [s.label, "Resto"];
    chart.data.datasets[0].data = [s.value, rest];
    chart.data.datasets[0].backgroundColor = [s.color, "#e8e4db"]; // Fondo neutro
    
    chart.options.rotation = START_ANGLE;
    chart.update();
  }

  function showAll(){
    if (!chart) return;
    mode = "all";
    selectedKey = null;

    chart.data.labels = labels;
    chart.data.datasets[0].data = values;
    chart.data.datasets[0].backgroundColor = colors;
    
    chart.options.rotation = START_ANGLE;
    chart.update();
  }

  /* ==========================
     EVENTOS Y BOTONES
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

  // Inicialización
  createDonut();
  showAll();
});
