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
// LIGHTBOX (Evita errores si no existe)
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
