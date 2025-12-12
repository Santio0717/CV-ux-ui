document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById("skillsDonut");
  const tooltip = document.getElementById("donutTooltip");
  if (!canvas || !tooltip) return;

  const skills = {
    uxui: { value: 35, color: "#f39c12", percent: "35%" },
    docs: { value: 20, color: "#2ecc71", percent: "20%" },
    front: { value: 15, color: "#3498db", percent: "15%" },
    motion: { value: 30, color: "#9b59b6", percent: "30%" },
    prod: { value: 10, color: "#e74c3c", percent: "10%" }
  };

  let currentMode = "all";
  let activeSkill = null;

  const chart = new Chart(canvas, {
    type: "doughnut",
    data: {
      labels: Object.keys(skills),
      datasets: [{
        data: Object.values(skills).map(s => s.value),
        backgroundColor: Object.values(skills).map(s => s.color),
        borderWidth: 0
      }]
    },
    options: {
      cutout: "65%",
      responsive: false,
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
        const value = chart.data.datasets[0].data[el.index];
        const percent = value + "%";

        const rect = canvas.getBoundingClientRect();
        const angle = (el.startAngle + el.endAngle) / 2;
        const radius = el.outerRadius + 12; // 🔥 salir del arco

        const x =
          rect.left +
          window.scrollX +
          canvas.width / 2 +
          Math.cos(angle) * radius;

        const y =
          rect.top +
          window.scrollY +
          canvas.height / 2 +
          Math.sin(angle) * radius -
          14; // 🔥 subir el tooltip

        tooltip.textContent = percent;
        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
        tooltip.style.opacity = 1;
      }
    }
  });

  /* ============================
     BOTONES
  ============================ */
  document.querySelectorAll(".tech-btn[data-key]").forEach(btn => {
    btn.addEventListener("click", () => {
      const skill = skills[btn.dataset.key];

      chart.data.datasets[0].data = [skill.value, 100 - skill.value];
      chart.data.datasets[0].backgroundColor = [skill.color, "#e6e6e6"];
      chart.update();

      activeSkill = skill;
    });
  });

  const showAllBtn = document.getElementById("showAll");
  if (showAllBtn) {
    showAllBtn.addEventListener("click", () => {
      chart.data.datasets[0].data = Object.values(skills).map(s => s.value);
      chart.data.datasets[0].backgroundColor = Object.values(skills).map(s => s.color);
      chart.update();
      activeSkill = null;
    });
  }

});
