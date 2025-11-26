// =============================
// REVEAL EN SCROLL
// =============================
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;

  reveals.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < triggerBottom) el.classList.add("show");
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


// =============================
// AÑO AUTOMÁTICO
// =============================
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}


// =============================
// LIGHTBOX SEGURO
// =============================
const lightbox = document.getElementById("lightbox");

if (lightbox) {
  const img = document.getElementById("lightbox-img");
  const pdf = document.getElementById("lightbox-pdf");
  const closeBtn = document.querySelector(".lightbox-close");

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      lightbox.classList.remove("show");

      if (img) img.style.display = "none";
      if (pdf) pdf.style.display = "none";
    });
  }
}


// =============================
// TOOLTIP DONUT – TECNOLOGÍAS
// =============================
const donutCards = document.querySelectorAll(".donut-card");
const tip = document.getElementById("donutTip");

donutCards.forEach(card => {
  card.addEventListener("mousemove", (e) => {
    if (!tip) return;

    tip.style.display = "block";
    tip.style.left = e.pageX + 15 + "px";
    tip.style.top = e.pageY + 15 + "px";

    tip.innerHTML = `
      <div class="tt-title">${card.dataset.title}</div>
      <ul>
        <li><strong>Nivel:</strong> ${card.dataset.nivel}</li>
        <li><strong>Porcentaje:</strong> ${card.dataset.porc}%</li>
      </ul>
      <div class="nivel">${card.dataset.desc}</div>
    `;
  });

  card.addEventListener("mouseleave", () => {
    if (tip) tip.style.display = "none";
  });
});
