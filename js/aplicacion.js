/* =====================================================
   AÑO AUTOMÁTICO
===================================================== */
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* =====================================================
   DONITAS TECNOLOGÍAS – CHART.JS
===================================================== */

const donutItems = document.querySelectorAll(".donut-item");
const tooltip = document.getElementById("donutTooltip");

let mouseX = 0;
let mouseY = 0;

/* -----------------------------------------------------
   EL TOOLTIP SIGUE AL MOUSE (MUY CERCA)
----------------------------------------------------- */
window.addEventListener("mousemove", e => {
  mouseX = e.pageX;
  mouseY = e.pageY;

  // Tooltip más cerca del cursor (ajuste solicitado)
  tooltip.style.left = (mouseX + 10) + "px";
  tooltip.style.top = (mouseY - 10) + "px";
});

/* -----------------------------------------------------
   CREAR DONITAS INDIVIDUALES
----------------------------------------------------- */
donutItems.forEach(item => {
  const canvas = item.querySelector(".mini-donut");
  const value = Number(item.dataset.value);
  const color = item.dataset.color;
  const label = item.dataset.label;

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
      cutout: "70%", // agujero interno

      animation: {
        duration: 1200,
        easing: "easeOutCubic",
        animateRotate: true
      },

      plugins: {
        legend: { display: false },

        tooltip: {
          enabled: false, // Tooltip nativo desactivado

          external: function (ctx) {
            const dp = ctx.tooltip.dataPoints?.[0];

            if (!dp) {
              tooltip.style.opacity = 0;
              return;
            }

            // CONTENIDO DEL TOOLTIP PERSONALIZADO
            tooltip.innerHTML = `
              <strong>${label}</strong><br>
              ${value}%
            `;

            tooltip.style.opacity = 1;
            tooltip.style.border = `2px solid ${color}`;
            tooltip.style.boxShadow = `0 0 12px ${color}`;
          }
        }
      },

      // Al salir del donut se oculta el tooltip
      onHover: (evt, active) => {
        if (active.length === 0) tooltip.style.opacity = 0;
      }
    }
  });
});
