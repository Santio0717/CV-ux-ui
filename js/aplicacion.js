/* =====================================================
   AÑO AUTOMÁTICO
===================================================== */
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* =====================================================
   DONA INTERACTIVA
===================================================== */
document.addEventListener("DOMContentLoaded", function () {

  const donutCanvas = document.getElementById("skillsDonut");
  if (!donutCanvas) return; // ← evita errores en páginas sin dona

  const ctx = donutCanvas.getContext("2d");

  let donutChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Nivel"],
      datasets: [{
        data: [35, 65],                  // Valor inicial
        backgroundColor: ["#f39c12", "#ddd"],
        borderWidth: 0
      }]
    },
    options: {
      cutout: "65%",
      plugins: { legend: { display: false } }
    }
  });

  /* ==============================
     ANIMACIÓN PROGRESIVA
  ============================== */

  function animateDonut(finalValue, color) {
    let progress = 0;
    const step = 2;

    const interval = setInterval(() => {
      progress += step;

      if (progress >= finalValue) {
        progress = finalValue;
        clearInterval(interval);
      }

      donutChart.data.datasets[0].data = [progress, 100 - progress];
      donutChart.data.datasets[0].backgroundColor = [color, "#ddd"];
      donutChart.update();
    }, 20);
  }

  /* ==============================
     EVENTOS DE HABILIDADES
  ============================== */
  const skillItems = document.querySelectorAll(".skill-item");

  skillItems.forEach(item => {
    item.addEventListener("mouseenter", () => {
      const value = Number(item.dataset.value);
      const color = item.dataset.color;

      animateDonut(value, color);
    });
  });

});

/* =====================================================
   FILTRO UX / CATEGORÍAS – PORTAFOLIO
===================================================== */
const filterButtons = document.querySelectorAll(".ux-btn");
const projectCards = document.querySelectorAll(".project");

if (filterButtons.length > 0) {
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {

      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.dataset.filter;

      if (category === "all") {
        projectCards.forEach(card => card.classList.remove("hide"));
        return;
      }

      projectCards.forEach(card => {
        const tags = card.dataset.category.split(" ");

        if (tags.includes(category)) {
          card.classList.remove("hide");
        } else {
          card.classList.add("hide");
        }
      });

    });
  });
}
