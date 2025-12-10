/* =====================================================
   AÑO AUTOMÁTICO
===================================================== */
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* =====================================================
   DONITAS TECNOLOGÍAS – TOOLTIP FIJO
===================================================== */

const donutItems = document.querySelectorAll(".donut-item");

donutItems.forEach(item => {

  const canvas = item.querySelector(".mini-donut");
  const tooltipBox = item.querySelector(".donut-fixed-tooltip");

  const value = Number(item.dataset.value);
  const color = item.dataset.color;
  const label = item.dataset.label;

  /* =====================================================
     CREAR DONA CON CHART.JS
  ===================================================== */
  new Chart(canvas, {
    type: "doughnut",

    data: {
      labels: [label],
      datasets: [{
        data: [value, 100 - value],
        backgroundColor: [color, "#e6e6e6"],
        hoverBackgroundColor: [color, "#cccccc"],
        borderWidth: 0
      }]
    },

    options: {
      cutout: "70%", // grosor del donut

      plugins: {
        legend: { display: false },
        tooltip: { enabled: false } // tooltip nativo desactivado
      },

      animation: {
        duration: 1200,
        easing: "easeOutCubic",
        animateRotate: true
      }
    }
  });

  /* =====================================================
     MOSTRAR TOOLTIP FIJO AL PASAR EL MOUSE
  ===================================================== */
  canvas.addEventListener("mouseenter", () => {
    tooltipBox.innerHTML = `
      <strong>${label}</strong><br>
      ${value}%
    `;
    tooltipBox.style.border = `2px solid ${color}`;
    tooltipBox.style.boxShadow = `0 0 12px ${color}`;
    item.classList.add("show-tooltip");
  });

  /* =====================================================
     OCULTAR TOOLTIP AL SALIR
  ===================================================== */
  canvas.addEventListener("mouseleave", () => {
    item.classList.remove("show-tooltip");
  });

});
