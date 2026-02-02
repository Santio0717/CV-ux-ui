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
  const keys   = Object.keys(skills);
  const labels = keys.map(k => skills[k].label);
  const values = keys.map(k => skills[k].value);
  const colors = keys.map(k => skills[k].color);

  let chart = null;
  let mode = "all";
  let selectedKey = null;

  // 12:00 PM es -90 grados. 
  // Chart.js dibuja por defecto hacia ADELANTE (sentido horario).
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
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "75%",
        rotation: START_ANGLE, 
        circumference: 360,
        animation: {
          animateRotate: true,
          duration: 800
        },
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        }
      }
    });
  }

  /* ==========================
     FUNCIONES DE ACTUALIZACIÓN
  ========================== */
  function showSingle(key){
    if (!chart || !skills[key]) return;

    mode = "single";
    selectedKey = key;
    const s = skills[key];
    const rest = 100 - s.value;

    // IMPORTANTE: El primer valor [0] siempre empieza en la rotación definida.
    // Al poner s.value primero, se dibujará desde las 12:00 hacia la DERECHA.
    chart.data.labels = [s.label, "Resto"];
    chart.data.datasets[0].data = [s.value, rest];
    chart.data.datasets[0].backgroundColor = [s.color, "#e2e2e2"]; // Gris claro de fondo
    
    chart.options.rotation = START_ANGLE;
    chart.update();
  }

  function showAll(){
    if (!chart) return;
    mode = "all";
    chart.data.labels = labels;
    chart.data.datasets[0].data = values;
    chart.data.datasets[0].backgroundColor = colors;
    chart.options.rotation = START_ANGLE;
    chart.update();
  }

  /* ==========================
     EVENTOS
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

  createDonut();
  showAll();
});
