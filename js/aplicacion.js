/* =====================================================
   AÑO AUTOMÁTICO
   ===================================================== */
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}


/* =====================================================
   ANIMACIÓN DE DONUTS AL HACER SCROLL
   ===================================================== */
const donutCards = document.querySelectorAll(".donut-card");

function animateDonuts() {
  donutCards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const valuePath = card.querySelector(".value");
    const endValue = parseInt(valuePath.dataset.end);

    if (rect.top < window.innerHeight * 0.85) {
      valuePath.style.strokeDasharray = `${endValue}, 100`;
    }
  });
}

window.addEventListener("scroll", animateDonuts);
window.addEventListener("load", animateDonuts);


/* =====================================================
   TOOLTIP DONUT (CON ICONOS Y COLOR DINÁMICO)
   ===================================================== */
const tip = document.getElementById("donutTip");

let mouseX = 0;
let mouseY = 0;

/* Movimiento suave */
function followTooltip() {
  tip.style.left = mouseX + 20 + "px";
  tip.style.top = mouseY + 20 + "px";
  requestAnimationFrame(followTooltip);
}
followTooltip();

donutCards.forEach(card => {
  const color = card.dataset.color;
  const icon = card.dataset.icon;

  card.addEventListener("mousemove", (e) => {
    mouseX = e.pageX;
    mouseY = e.pageY;

    /* Cambia color dinámico del tooltip */
    tip.style.border = `2px solid ${color}`;
    tip.style.boxShadow = `0 0 14px ${color}`;

    /* Contenido del tooltip */
    tip.innerHTML = `
      <div class="tt-title" style="color:${color}">
        ${icon} ${card.dataset.title}
      </div>

      <ul>
        <li><strong>Nivel:</strong> ${card.dataset.nivel}</li>
        <li><strong>Porcentaje:</strong> ${card.dataset.porc}%</li>
      </ul>

      <div class="nivel" style="color:${color}">
        ${card.dataset.desc}
      </div>
    `;

    tip.classList.add("visible");
  });

  card.addEventListener("mouseleave", () => {
    tip.classList.remove("visible");
  });
});
