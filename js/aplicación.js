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

document.getElementById("year").textContent = new Date().getFullYear();

const lightbox = document.getElementById("lightbox");
if (lightbox) {
  const img = document.getElementById("lightbox-img");
  const pdf = document.getElementById("lightbox-pdf");
  const closeBtn = document.querySelector(".lightbox-close");

  closeBtn?.addEventListener("click", () => {
    lightbox.classList.remove("show");
    img.style.display = "none";
    pdf.style.display = "none";
  });
}

