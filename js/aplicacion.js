/* =====================================================
   AÑO AUTOMÁTICO
===================================================== */
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* =====================================================
   DONUTS CON CHART.JS (NUEVO SISTEMA)
===================================================== */

const cards = document.querySelectorAll(".chart-card");
const tooltip = document.getElementById("chart-tooltip");

let mouseX = 0;
let mouseY = 0;

/* =====================================================
   TOOLTIP: SEGUIMIENTO DEL MOUSE
===================================================== */
window.addEventListener("mousemove", e => {
  mouseX = e.pageX;
  mouseY = e.pageY;

  tooltip.style.left = mouseX + 20 + "px";
  tooltip.style.top = mouseY + 20 + "px";
});

/* =====================================================
   INICIALIZACIÓN DE CADA DONUT
===================================================== */

cards.forEach(card => {
  const canvas = card.querySelector(".donut-chart");
  const value = Number(card.dataset.value);
  const color = card.dataset.color;
  const label = card.dataset.label;

  new Chart(canvas, {
    type: "doughnut",

    data: {
      labels: [label, ""], // pero la leyenda NO se muestra
      datasets: [{
        data: [value, 100 - value],
        backgroundColor: [color, "#e4e4e4"],
        hoverBackgroundColor: [color, "#dcdcdc"],
        borderWidth: 0
      }]
    },

    options: {
      cutout: "70%", // tamaño del agujero central

      plugins: {
        legend: { display: false }, // Quita la leyenda de arriba

        tooltip: {
          enabled: false, // usaremos tooltip personalizado

          external: function (ctx) {
            const datapoint = ctx.tooltip.dataPoints?.[0];
            if (!datapoint) {
              tooltip.style.opacity = 0;
              return;
            }

            // CONTENIDO DEL TOOLTIP
            tooltip.innerHTML = `
              <div style="font-weight:700; margin-bottom:4px; font-size:1rem;">
                ${label}
              </div>
              <div style="font-size:.95rem;">${value}%</div>
            `;

            tooltip.style.opacity = 1;
            tooltip.style.border = `2px solid ${color}`;
            tooltip.style.boxShadow = `0 0 14px ${color}`;
          }
        }
      },

      animation: {
        animateRotate: true,
        duration: 1200
      },

      // Cuando el mouse está fuera del donut → ocultar tooltip
      onHover: (evt, activeEls) => {
        if (activeEls.length === 0) tooltip.style.opacity = 0;
      }
    }
  });
});
