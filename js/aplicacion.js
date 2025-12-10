/* =====================================================
   AÑO AUTOMÁTICO
===================================================== */
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* =====================================================
   DONITAS TECNOLOGÍAS – TOOLTIP FIJO + ANIMACIÓN AL PRIMER HOVER
===================================================== */

const donutItems = document.querySelectorAll(".donut-item");

donutItems.forEach(item => {

  const canvas = item.querySelector(".mini-donut");
  const tooltipBox = item.querySelector(".donut-fixed-tooltip");

  const finalValue = Number(item.dataset.value); // valor real
  const color = item.dataset.color;
  const label = item.dataset.label;

  /* =====================================================
     1) CREAR DONA INICIAL EN 0% (SIN ANIMACIÓN)
  ===================================================== */
  const chart = new Chart(canvas, {
    type: "doughnut",

    data: {
      labels: [label],
      datasets: [{
        data: [0, 100],  // empieza vacía
        backgroundColor: [color, "#e6e6e6"],
        borderWidth: 0
      }]
    },

    options: {
      cutout: "70%",
      animation: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      }
    }
  });

  /* Marcar que aún NO se ha animado */
  item.dataset.played = "false";

  /* =====================================================
     2) ANIMACIÓN UNA SOLA VEZ CUANDO PASAS EL MOUSE
  ===================================================== */
  function animateOnce() {
    if (item.dataset.played === "true") return; // ya animó antes

    item.dataset.played = "true"; // marcar que ya animó

    let current = 0;
    const duration = 900; // duración total
    const fps = 1000 / 60;
    const steps = duration / fps;
    const increment = finalValue / steps;

    const interval = setInterval(() => {
      current += increment;

      if (current >= finalValue) {
        current = finalValue;
        clearInterval(interval);
      }

      chart.data.datasets[0].data[0] = current;
      chart.data.datasets[0].data[1] = 100 - current;
      chart.update();
    }, fps);
  }

  /* =====================================================
     3) MOSTRAR TOOLTIP + TRIGGER DE ANIMACIÓN
  ===================================================== */
  canvas.addEventListener("mouseenter", () => {

    // activar animación si es primera vez
    animateOnce();

    tooltipBox.innerHTML = `
      <strong>${label}</strong><br>
      ${finalValue}%
    `;

    tooltipBox.style.border = `2px solid ${color}`;
    tooltipBox.style.boxShadow = `0 0 12px ${color}`;

    item.classList.add("show-tooltip");
  });

  /* =====================================================
     4) OCULTAR TOOLTIP CUANDO SALES
  ===================================================== */
  canvas.addEventListener("mouseleave", () => {
    item.classList.remove("show-tooltip");
  });

});
