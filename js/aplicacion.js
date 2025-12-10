/* =====================================================
   AÑO AUTOMÁTICO
===================================================== */
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* =====================================================
   DONITAS – ANIMAR SOLO EN EL PRIMER HOVER
===================================================== */

const donutItems = document.querySelectorAll(".donut-item");

donutItems.forEach(item => {
  const canvas = item.querySelector(".mini-donut");
  const label = item.dataset.label;
  const value = Number(item.dataset.value);
  const color = item.dataset.color;

  const tooltip = document.createElement("div");
  tooltip.classList.add("donut-fixed-tooltip");
  item.appendChild(tooltip);

  let animatedOnce = false;

  // Crear dona vacía inicialmente
  const chart = new Chart(canvas, {
    type: "doughnut",
    data: {
      labels: [label],
      datasets: [{
        data: [0, 100],
        backgroundColor: [color, "#e6e6e6"],
        borderWidth: 0
      }]
    },
    options: {
      cutout: "70%",
      animation: { duration: 0 },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      }
    }
  });

  /* =====================================================
     MOSTRAR TOOLTIP + ANIMACIÓN SOLO UNA VEZ
  ====================================================== */
  item.addEventListener("mouseenter", () => {
    tooltip.innerHTML = `<strong>${label}</strong><br>${value}%`;
    tooltip.style.opacity = 1;

    if (!animatedOnce) {
      animatedOnce = true;
      animateDonut(chart, value);
    }
  });

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
  }, 20);
}
