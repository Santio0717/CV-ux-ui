/* =====================================================
   AÑO AUTOMÁTICO
===================================================== */
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* =====================================================
   DONUT ELEMENTS
===================================================== */
const donutCards = document.querySelectorAll(".donut-card");
const tip = document.getElementById("donutTip");

/* =====================================================
   SETUP: COLOR DEL DONUT
===================================================== */
function setupDonuts() {
  donutCards.forEach(card => {
    const valuePath = card.querySelector(".value");
    const color = card.dataset.color;

    if (valuePath && color) {
      valuePath.style.stroke = color;
      card.style.color = color; // Glow
    }
  });
}
window.addEventListener("load", setupDonuts);

/* =====================================================
   ANIMACIÓN DE DONUTS
===================================================== */
function animateDonuts() {
  donutCards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const valuePath = card.querySelector(".value");
    if (!valuePath) return;

    const endValue = parseInt(valuePath.dataset.end);
    if (isNaN(endValue)) return;

    // Fix crítico
    valuePath.style.strokeDashoffset = "0";

    if (rect.top < window.innerHeight * 0.85) {
      valuePath.style.strokeDasharray = `${endValue} 100`;
    }
  });
}

window.addEventListener("scroll", animateDonuts);
window.addEventListener("load", animateDonuts);

/* =====================================================
   TOOLTIP: SEGUIMIENTO
===================================================== */
let mouseX = 0;
let mouseY = 0;

function followTooltip() {
  tip.style.left = mouseX + 20 + "px";
  tip.style.top = mouseY + 20 + "px";
  requestAnimationFrame(followTooltip);
}
followTooltip();

/* =====================================================
   TOOLTIP: EVENTOS DONUT
===================================================== */
donutCards.forEach(card => {
  
  const color = card.dataset.color;
  const icon = card.dataset.icon;

  card.addEventListener("mouseenter", (e) => {
    mouseX = e.pageX;
    mouseY = e.pageY;

    tip.style.border = `2px solid ${color}`;
    tip.style.boxShadow = `0 0 14px ${color}`;

    tip.innerHTML = `
      <div class="tt-title" style="color:${color}">
        ${icon} ${card.dataset.title}
      </div>
      <ul style="margin:0; padding-left:18px;">
        <li><strong>Nivel:</strong> ${card.dataset.nivel}</li>
        <li><strong>Porcentaje:</strong> ${card.dataset.porc}%</li>
      </ul>
      <div class="nivel" style="color:${color}; margin-top:8px;">
        ${card.dataset.desc}
      </div>
    `;

    tip.classList.add("visible");
  });

  card.addEventListener("mousemove", (e) => {
    mouseX = e.pageX;
    mouseY = e.pageY;
  });

  card.addEventListener("mouseleave", () => {
    tip.classList.remove("visible");
  });
});
