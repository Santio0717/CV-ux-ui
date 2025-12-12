document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById("skillsDonut");
  const tooltip = document.querySelector(".donut-tooltip");

  if (!canvas) return;

  const skills = {
    uxui: { value: 35, color: "#f39c12", label: "UX/UI — 35%" },
    docs: { value: 20, color: "#2ecc71", label: "Documentación — 20%" },
    front: { value: 15, color: "#3498db", label: "Frontend — 15%" },
    motion: { value: 30, color: "#9b59b6", label: "Motion — 30%" },
    prod: { value: 10, color: "#e74c3c", label: "Producción — 10%" }
  };

  const chart = new Chart(canvas, {
    type: "doughnut",
    data: {
      datasets: [{
        data: [0, 100],
        backgroundColor: ["#ddd", "#eee"],
        borderWidth: 0
      }]
    },
    options: {
      cutout: "65%",
      animation: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      }
    }
  });

  /* ======================
     FUNCIONES
  ====================== */
  function animateSkill(skill) {
    let progress = 0;
    const step = Math.max(1, skill.value / 25);

    tooltip.textContent = skill.label;

    const interval = setInterval(() => {
      progress += step;
      if (progress >= skill.value) {
        progress = skill.value;
        clearInterval(interval);
      }

      chart.data.datasets[0].data = [progress, 100 - progress];
      chart.data.datasets[0].backgroundColor = [skill.color, "#ddd"];
      chart.update();
    }, 16);
  }

  function resetDonut() {
    chart.data.datasets[0].data = [0, 100];
    chart.data.datasets[0].backgroundColor = ["#ddd", "#eee"];
    chart.update();
    tooltip.style.opacity = 0;
  }

  function showAll() {
    chart.data.datasets[0].data = Object.values(skills).map(s => s.value);
    chart.data.datasets[0].backgroundColor = Object.values(skills).map(s => s.color);
    chart.update();
    tooltip.textContent = "Diseñador UX/UI";
  }

  /* ======================
     EVENTOS BOTONES
  ====================== */
  document.querySelectorAll(".tech-btn[data-key]").forEach(btn => {
    btn.addEventListener("click", () => {
      animateSkill(skills[btn.dataset.key]);
    });
  });

  document.getElementById("showAll").addEventListener("click", showAll);
  document.getElementById("resetDonut").addEventListener("click", resetDonut);

  /* ======================
     TOOLTIP HOVER DONA
  ====================== */
  canvas.addEventListener("mouseenter", () => {
    if (tooltip.textContent) tooltip.style.opacity = 1;
  });

  canvas.addEventListener("mouseleave", () => {
    tooltip.style.opacity = 0;
  });

  /* ESTADO INICIAL */
  resetDonut();
});
