/* =====================================================
   AÑO AUTOMÁTICO
===================================================== */
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* =====================================================
   DONITAS – ANIMACIÓN SOLO EN EL PRIMER HOVER
===================================================== */

const donutItems = document.querySelectorAll(".donut-item");

donutItems.forEach(item => {
  const canvas = item.querySelector(".mini-donut");
  const label = item.dataset.label;
  const value = Number(item.dataset.value);
  const color = item.dataset.color;

  /* -------------------------------
     Crear tooltip fijo por dona
  -------------------------------- */
  const tooltip = item.querySelector(".donut-fixed-tooltip");
  tooltip.style.opacity = 0;

  /* -------------------------------
     Bandera para animar solo una vez
  -------------------------------- */
  let animatedOnce = false;

  /* -------------------------------
     Crear donut inicialmente vacío
  -------------------------------- */
  const chart = new Chart(canvas, {
    type: "doughnut",
    data: {
      labels: [label],
      datasets: [{
        data: [0, 100],           // empieza en 0%
        backgroundColor: [color, "#e6e6e6"],
        borderWidth: 0
      }]
    },
    options: {
      cutout: "70%",
      animation: { duration: 0 }, // sin animación inicial
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      }
    }
  });

  /* =====================================================
     EVENTOS DE MOUSE
  ====================================================== */

  // Mostrar tooltip + activar animación si no ha ocurrido
  item.addEventListener("mouseenter", () => {
    tooltip.innerHTML = `<strong>${label}</strong><br>${value}%`;
    tooltip.style.opacity = 1;

    if (!animatedOnce) {
      animatedOnce = true;
      animateDonut(chart, value);
    }
  });

  // Ocultar tooltip al salir
  item.addEventListener("mouseleave", () => {
    tooltip.style.opacity = 0;
  });
});

/* =====================================================
   FUNCIÓN DE ANIMACIÓN PROGRESIVA
===================================================== */
function animateDonut(chart, finalValue) {
  let progress = 0;
  const step = 2;

  const interval = setInterval(() => {
    progress += step;

    if (progress >= finalValue) {
      progress = finalValue;
      clearInterval(interval);
    }

    chart.data.datasets[0].data = [progress, 100 - progress];
    chart.update();
  }, 18); // velocidad ideal
}
