document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("skillsDonut");
  const tooltip = document.getElementById("donutTooltip");
  if (!canvas || !tooltip) return;

  const ctx = canvas.getContext("2d");

  const skills = {
    uxui: { value: 35, color: "#f39c12", label: "UX/UI — 35%" },
    docs: { value: 20, color: "#2ecc71", label: "Documentación — 20%" },
    front: { value: 15, color: "#3498db", label: "Frontend — 15%" },
    motion: { value: 30, color: "#9b59b6", label: "Motion — 30%" },
    prod: { value: 10, color: "#e74c3c", label: "Producción — 10%" }
  };

  let currentSkill = skills.uxui;

  const chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: [currentSkill.label],
      datasets: [{
        data: [currentSkill.value, 100 - currentSkill.value],
        backgroundColor: [currentSkill.color, "#ddd"],
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

        const arc = elements[0].element;
        const angle = (arc.startAngle + arc.endAngle) / 2;
        const radius = (arc.outerRadius + arc.innerRadius) / 2;

        const x = arc.x + Math.cos(angle) * radius;
        const y = arc.y + Math.sin(angle) * radius;

        tooltip.textContent = currentSkill.label;
        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y - 12}px`; // 👈 SIEMPRE ENCIMA
        tooltip.style.background = currentSkill.color;
        tooltip.style.opacity = 1;
      }
    }
  });

  function updateDonut(skill) {
    currentSkill = skill;
    chart.data.datasets[0].data = [skill.value, 100 - skill.value];
    chart.data.datasets[0].backgroundColor = [skill.color, "#ddd"];
    chart.update();
  }

  document.querySelectorAll(".tech-btn[data-key]").forEach(btn => {
    btn.addEventListener("click", () => {
      updateDonut(skills[btn.dataset.key]);
    });
  });

  document.getElementById("showAll").addEventListener("click", () => {
    chart.data.datasets[0].data = Object.values(skills).map(s => s.value);
    chart.data.datasets[0].backgroundColor = Object.values(skills).map(s => s.color);
    chart.update();

    currentSkill = { label: "Diseñador UX/UI", color: "#000" };
  });
});
