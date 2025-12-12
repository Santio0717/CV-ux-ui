document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById("skillsDonut");
  if (!canvas) return;

  const tooltip = document.getElementById("donutTooltip");

  /* ============================
     DATA
  ============================ */
  const skills = {
    uxui: { value: 35, color: "#f39c12", label: "UX/UI — 35%", key: "uxui" },
    docs: { value: 20, color: "#2ecc71", label: "Documentación — 20%", key: "docs" },
    front:{ value: 15, color: "#3498db", label: "Frontend — 15%", key: "front" },
    motion:{ value: 30, color: "#9b59b6", label: "Motion — 30%", key: "motion" },
    prod: { value: 10, color: "#e74c3c", label: "Producción — 10%", key: "prod" }
  };

  let mode = "single"; // single | all
  let activeSkill = skills.uxui;

  /* ============================
     CHART INIT
  ============================ */
  const chart = new Chart(canvas, {
    type: "doughnut",
    data: {
      labels: Object.values(skills).map(s => s.label),
      datasets: [{
        data: [0, 100],
        backgroundColor: [activeSkill.color, "#e0e0e0"],
        borderWidth: 0
      }]
    },
    options: {
      cutout: "65%",
      animation: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      },
      onHover: (evt, elements) => handleHover(evt, elements)
    }
  });

  /* ============================
     TOOLTIP MANUAL (NEGRO)
  ============================ */
  function handleHover(evt, elements) {
    if (!elements.length || mode === "single") {
      hideTooltip();
      return;
    }

    const el = elements[0];
    const index = el.index;
    const skill = Object.values(skills)[index];

    const rect = canvas.getBoundingClientRect();

    tooltip.textContent = skill.label;
    tooltip.className = `donut-tooltip show tooltip-${skill.key}`;
    tooltip.style.left = evt.clientX - rect.left + 12 + "px";
    tooltip.style.top  = evt.clientY - rect.top + 12 + "px";
  }

  function hideTooltip() {
    tooltip.classList.remove("show");
  }

  canvas.addEventListener("mouseleave", hideTooltip);

  /* ============================
     ANIMACIÓN INDIVIDUAL
  ============================ */
  function animateSingle(skill) {
    mode = "single";
    activeSkill = skill;
    hideTooltip();

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
      chart.data.datasets[0].backgroundColor = [skill.color, "#e0e0e0"];
      chart.update();
    }, 16);
  }

  /* ============================
     MOSTRAR TODO
  ============================ */
  function showAll() {
    mode = "all";

    chart.data.datasets[0].data = Object.values(skills).map(s => s.value);
    chart.data.datasets[0].backgroundColor = Object.values(skills).map(s => s.color);
    chart.update();
  }

  /* ============================
     BOTONES
  ============================ */
  document.querySelectorAll(".tech-btn[data-key]").forEach(btn => {
    btn.addEventListener("click", () => {
      animateSingle(skills[btn.dataset.key]);
    });
  });

  document.getElementById("showAll").addEventListener("click", showAll);
  document.getElementById("resetDonut").addEventListener("click", () => {
    animateSingle(skills.uxui);
  });

  /* ============================
     ESTADO INICIAL (VACÍO)
  ============================ */
  chart.data.datasets[0].data = [0, 100];
  chart.update();

});
