document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("skillsDonut");
  if (!canvas) return;

  const tooltip = document.getElementById("donutTooltip");

  const skills = {
    uxui: { label: "UX/UI", value: 35, color: "#f39c12" },
    docs: { label: "Documentación", value: 20, color: "#2ecc71" },
    front: { label: "Frontend", value: 15, color: "#3498db" },
    motion: { label: "Motion", value: 30, color: "#9b59b6" },
    prod: { label: "Producción", value: 10, color: "#e74c3c" }
  };

  let mode = "single";
  let activeSkill = skills.uxui;

  const chart = new Chart(canvas, {
    type: "doughnut",
    data: {
      labels: Object.values(skills).map(s => s.label),
      datasets: [{
        data: [0, 100],
        backgroundColor: [activeSkill.color, "#e6e6e6"],
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
      onHover: (event, elements) => {
        if (!elements.length) {
          tooltip.style.opacity = 0;
          return;
        }

        const el = elements[0];
        const index = el.index;

        let label, color;

        if (mode === "single") {
          label = `${activeSkill.label} — ${activeSkill.value}%`;
          color = activeSkill.color;
        } else {
          const skill = Object.values(skills)[index];
          label = `${skill.label} — ${skill.value}%`;
          color = skill.color;
        }

        const rect = canvas.getBoundingClientRect();
        tooltip.textContent = label;
        tooltip.style.background = color;
        tooltip.style.left = `${event.x - rect.left}px`;
        tooltip.style.top = `${event.y - rect.top}px`;
        tooltip.style.opacity = 1;
      }
    }
  });

  function animateSingle(skill) {
    mode = "single";
    activeSkill = skill;

    let progress = 0;
    const target = skill.value;
    const step = Math.max(1, target / 20);

    const interval = setInterval(() => {
      progress += step;
      if (progress >= target) {
        progress = target;
        clearInterval(interval);
      }

      chart.data.datasets[0].data = [progress, 100 - progress];
      chart.data.datasets[0].backgroundColor = [skill.color, "#e6e6e6"];
      chart.update();
    }, 16);
  }

  function showAll() {
    mode = "all";
    chart.data.datasets[0].data = Object.values(skills).map(s => s.value);
    chart.data.datasets[0].backgroundColor = Object.values(skills).map(s => s.color);
    chart.update();
  }

  document.querySelectorAll(".tech-btn[data-key]").forEach(btn => {
    btn.addEventListener("click", () => {
      animateSingle(skills[btn.dataset.key]);
    });
  });

  document.getElementById("showAll").addEventListener("click", showAll);

  // Estado inicial
  animateSingle(skills.uxui);
});
