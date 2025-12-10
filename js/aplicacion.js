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

  const tooltip = item.querySelector(".donut-fixed-tooltip");
  tooltip.style.opacity = 0;

  let animatedOnce = false;

  /* Crear donut vacío */
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

  /* Evento mouseenter */
  item.addEventListener("mouseenter", () => {
    tooltip.innerHTML = `<strong>${label}</strong><br>${value}%`;
    tooltip.style.opacity = 1;

    if (!animatedOnce) {
      animatedOnce = true;
      animateDonut(chart, value);
    }
  });

  /* Evento mouseleave */
  item.addEventListener("mouseleave", () => {
    tooltip.style.opacity = 0;
  });
});

/* =====================================================
   ANIMACIÓN PROGRESIVA DE LA DONA
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
  }, 18);
}

/* =====================================================
   FILTRO UX / CATEGORÍAS
===================================================== */

const filterButtons = document.querySelectorAll(".ux-btn");
const projectCards = document.querySelectorAll(".project");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {

    /* Quitar activo a todos */
    filterButtons.forEach(b => b.classList.remove("active"));

    /* Activar el actual */
    btn.classList.add("active");

    const category = btn.dataset.filter;

    /* Mostrar todos */
    if (category === "all") {
      projectCards.forEach(card => card.classList.remove("hide"));
      return;
    }

    /* Filtrar */
    projectCards.forEach(card => {
      const tags = card.dataset.tags.split(",");

      if (tags.includes(category)) {
        card.classList.remove("hide");
      } else {
        card.classList.add("hide");
      }
    });
  });
});
