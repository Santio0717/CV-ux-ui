document.addEventListener("DOMContentLoaded", function () {

  const canvas = document.getElementById("skillsDonut");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const skillDescription = document.getElementById("skillDescription");

  const skills = {
    uxui: { value: 35, color: "#f39c12", text: "UX/UI — 35%" },
    docs: { value: 20, color: "#2ecc71", text: "Documentación — 20%" },
    front: { value: 15, color: "#3498db", text: "Frontend — 15%" },
    motion: { value: 30, color: "#9b59b6", text: "Motion — 30%" },
    prod: { value: 10, color: "#e74c3c", text: "Producción — 10%" }
  };

  const donutChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      datasets: [{
        data: [skills.uxui.value, 100 - skills.uxui.value],
        backgroundColor: [skills.uxui.color, "#ddd"],
        borderWidth: 0
      }]
    },
    options: {
      cutout: "65%",
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function () { return skills.uxui.text; }
          }
        }
      }
    }
  });

  function updateSkill(key) {
    const s = skills[key];
    donutChart.data.datasets[0].data = [s.value, 100 - s.value];
    donutChart.data.datasets[0].backgroundColor = [s.color, "#ddd"];
    donutChart.options.plugins.tooltip.callbacks.label = () => s.text;
    donutChart.update();
    skillDescription.textContent = s.text;
  }

  function showAllSkills() {
    donutChart.data.datasets[0].data = Object.values(skills).map(s => s.value);
    donutChart.data.datasets[0].backgroundColor = Object.values(skills).map(s => s.color);

    donutChart.options.plugins.tooltip.callbacks.label = (ctx) => {
      return Object.values(skills)[ctx.dataIndex].text;
    };

    donutChart.update();

    skillDescription.textContent =
      "Resumen: UX/UI, Documentación, Frontend, Motion y Producción.";
  }

  /* BOTONES INDIVIDUALES */
  document.querySelectorAll(".skill-btn[data-skill]").forEach(btn => {
    btn.addEventListener("click", () => updateSkill(btn.dataset.skill));
  });

  /* RESUMEN DISEÑADOR */
  document.getElementById("btn-designer").addEventListener("click", showAllSkills);

  /* REGRESAR */
  document.getElementById("btn-reset").addEventListener("click", () => updateSkill("uxui"));

});
