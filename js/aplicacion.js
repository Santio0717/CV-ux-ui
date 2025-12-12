document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById("skillsDonut");
  const tooltip = document.getElementById("donutTooltip");
  if (!canvas || !tooltip) return;

  /* ============================
     DATA
  ============================ */
  const skills = {
    uxui: { value: 35, color: "#f39c12", label: "UX/UI", percent: "35%" },
    docs: { value: 20, color: "#2ecc71", label: "Documentación", percent: "20%" },
    front: { value: 15, color: "#3498db", label: "Frontend", percent: "15%" },
    motion: { value: 30, color: "#9b59b6", label: "Motion", percent: "30%" },
    prod: { value: 10, color: "#e74c3c", label: "Producción", percent: "10%" }
  };

  let currentMode = "single";
  let currentSkill = skills.uxui;

  /* ============================
     CHART INIT
  ============================ */
  const chart = new Chart(canvas, {
    type: "doughnut",
    data: {
      labels: [currentSkill.label, "Resto"],
      datasets: [{
        data: [currentSkill.value, 100 - currentSkill.value],
        backgroundColor: [currentSkill.color, "#e6e6e6"],
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

        const element = elements[0];
        const dataset = chart.data.datasets[element.datasetIndex];

        // Solo mostrar si es parte pintada (index 0)
        if (element.index !== 0) {
          tooltip.style.opacity = 0;
          return;
        }

        const rect = canvas.getBoundingClientRect();
        const angle = (element.startAngle + element.endAngle) / 2;
        const radius = (element.outerRadius + element.innerRadius) / 2;

        const x = rect.left + window.scrollX + canvas.width / 2 + Math.cos(angle) * radius;
        const y = rect.top + window.scrollY + canvas.height / 2 + Math.sin(angle) * radius;

        tooltip.textContent = currentMode === "all"
          ? chart.data.labels[element.index] + " — " + chart.data.datasets[0].data[element.index] + "%"
          : currentSkill.percent;

        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
        tooltip.style.opacity = 1;
      }
    }
  });

  /* ============================
     FUNCTIONS
  ============================ */
  function showSkill(skill) {
    currentMode = "single";
    currentSkill = skill;

    chart.data.labels = [skill.label, "Resto"];
    chart.data.datasets[0].data = [skill.value, 100 - skill.value];
    chart.data.datasets[0].backgroundColor = [skill.color, "#e6e6e6"];
    chart.update();

    tooltip.style.opacity = 0;
  }

  function showAll() {
    currentMode = "all";

    chart.data.labels = Object.values(skills).map(s => s.label);
    chart.data.datasets[0].data = Object.values(skills).map(s => s.value);
    chart.data.datasets[0].backgroundColor = Object.values(skills).map(s => s.color);
    chart.update();

    tooltip.style.opacity = 0;
  }

  /* ============================
     EVENTS
  ============================ */
  document.querySelectorAll(".tech-btn[data-key]").forEach(btn => {
    btn.addEventListener("click", () => {
      showSkill(skills[btn.dataset.key]);
    });
  });

  const showAllBtn = document.getElementById("showAll");
  if (showAllBtn) {
    showAllBtn.addEventListener("click", showAll);
  }

  /* ============================
     INIT
  ============================ */
  showAll();

});
