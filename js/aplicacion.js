/* =====================================================
   AÑO AUTOMÁTICO
===================================================== */
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* =====================================================
   DONUTS CON CHART.JS
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
   INICIALIZAR CADA DONUT
===================================================== */
cards.forEach(card => {
  const canvas = card.querySelector(".donut-chart");
  const value = Number(card.dataset.value);
  const color = card.dataset.color;
  const label = card.dataset.label;

  new Chart(canvas, {
    type: "doughnut",
    data: {
      labels: [label, ""],
      datasets: [{
        data: [value, 100 - value],
        backgroundColor: [color, "#e2e2e2"],
        hoverBackgroundColor: [color, "#dcdcdc"],
        borderWidth: 0
      }]
    },

    options: {
      cutout: "70%",
      animation: {
        animateRotate: true,
        duration: 1400
      },

      plugins: {
        tooltip: {
          enabled: false, // usamos tooltip propio

          external: function (ctx) {
            const dataPoint = ctx.tooltip.dataPoints?.[0];

            if (!dataPoint) {
              tooltip.style.opacity = 0;
              return;
            }

            tooltip.innerHTML = `
              <div style="font-weight:700; margin-bottom:4px;">
                ${label}
              </div>
              <div>Nivel: ${value}%</div>
            `;

            tooltip.style.opacity = 1;
            tooltip.style.border = `2px solid ${color}`;
            tooltip.style.boxShadow = `0 0 12px ${color}`;
          }
        }
      },
      onHover: (evt, activeEls) => {
        if (activeEls.length === 0) {
          tooltip.style.opacity = 0;
        }
      }
    }
  });
});
