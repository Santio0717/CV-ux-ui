document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById("skillsDonut");
  if (!canvas) return;

  const tooltip = document.querySelector(".donut-tooltip");

  /* ============================
     DATA
  ============================ */
  const skills = {
    uxui: { value: 35, color: "#f39c12", label: "UX/UI — 35%" },
    docs: { value: 20, color: "#2ecc71", label: "Documentación — 20%" },
    front: { value: 15, color: "#3498db", label: "Frontend — 15%" },
    motion: { value: 30, color: "#9b59b6", label: "Motion — 30%" },
    prod: { value: 10, color: "#e74c3c", label: "Producción — 10%" }
  };

  let mode = "single"; // single | all
  let activeSkill = skills.uxui;

  /* ============================
     CHART INIT
  ============================ */
  const chart = new Chart(canvas, {
    type: "doughnut",
    data: {
      datasets: [{
        data: [0, 100],
        backgroundColor: [activeSkill.color, "#ddd"],
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

  /* ============================
     ANIMACIÓN SUAVE
  ============================ */
  function animateSingle(skill) {
    mode = "single";
    activeSkill = skill;

    let progress = 0;
    const target = skill.value;
    const step = Math.max(1, target / 25);

    const interval = setInterval(() => {
      progress += step;
      if (progress >= target) {
        progress = target;
        clearInterval(interval);
      }

      chart.data.datasets[0].data = [progress, 100 - progress];
      chart.data.datasets[0].backgroundColor = [skill.color, "#ddd"];
      chart.update();
    }, 16);

    showTooltip(skill.label);
  }

  /* ============================
     MODO RESUMEN
  ============================ */
  function showAll() {
    mode = "all";

    chart.data.datasets[0].data = Object.values(skills).map(s => s.value);
    chart.data.datasets[0].backgroundColor = Object.values(skills).map(s => s.color);
    chart.update();

    showTooltip("Resumen de habilidades — Diseñador UX/UI");
  }

  /* ============================
     TOOLTIP CENTRADO
  ============================ */
  function showTooltip(text) {
    if (!tooltip) return;
    tooltip.textContent = text;
    tooltip.style.opacity = 1;
  }

  /* ============================
     EVENTOS BOTONES
  ============================ */
  document.querySelectorAll(".tech-btn[data-key]").forEach(btn => {
    btn.addEventListener("click", () => {
      const skill = skills[btn.dataset.key];
      animateSingle(skill);
    });
  });

  const showAllBtn = document.getElementById("showAll");
  if (showAllBtn) {
    showAllBtn.addEventListener("click", showAll);
  }

  const resetBtn = document.getElementById("resetDonut");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      animateSingle(skills.uxui);
    });
  }

  /* ============================
     ESTADO INICIAL
  ============================ */
  animateSingle(skills.uxui);

});
