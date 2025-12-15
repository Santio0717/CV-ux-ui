document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById("skillsDonut");
  const tooltip = document.getElementById("donutTooltip");
  if (!canvas || !tooltip) return;

  const skills = {
    uxui:   { value: 35, color: "#f39c12", label: "UX/UI — 35%" },
    docs:   { value: 20, color: "#2ecc71", label: "Documentación — 20%" },
    front:  { value: 15, color: "#3498db", label: "Frontend — 15%" },
    motion: { value: 30, color: "#9b59b6", label: "Motion — 30%" },
    prod:   { value: 10, color: "#e74c3c", label: "Producción — 10%" }
  };

  let mode = "single";
  let activeSkill = skills.uxui;

  /* ============================
     CHART
  ============================ */
  const chart = new Chart(canvas, {
    type: "doughnut",
    data: {
      datasets: [{
        data: [activeSkill.value, 100 - activeSkill.value],
        backgroundColor: [activeSkill.color, "#e5e5e5"],
        borderWidth: 0
      }]
    },
    options: {
      cutout: "65%",
      animation: {
        animateRotate: true,
        duration: 700,
        easing: "easeOutCubic"
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: false,
          external: (ctx) => externalTooltip(ctx)
        }
      }
    }
  });

  /* ============================
     TOOLTIP EXTERNO (REAL)
  ============================ */
  function externalTooltip({ tooltip: t }) {

    if (!t || !t.opacity) {
      tooltip.classList.remove("show");
      return;
    }

    const index = t.dataPoints[0].dataIndex;

    // ❌ NO MOSTRAR PARTE GRIS
    if (mode === "single" && index === 1) {
      tooltip.classList.remove("show");
      return;
    }

    let label;

    if (mode === "single") {
      label = activeSkill.label;
    } else {
      label = Object.values(skills)[index].label;
    }

    tooltip.textContent = label;

    const rect = canvas.getBoundingClientRect();
    tooltip.style.left = `${t.caretX}px`;
    tooltip.style.top  = `${t.caretY}px`;

    tooltip.classList.add("show");
  }

  /* ============================
     MODOS
  ============================ */
  function showSingle(skill) {
    mode = "single";
    activeSkill = skill;

    chart.data.datasets[0].data = [skill.value, 100 - skill.value];
    chart.data.datasets[0].backgroundColor = [skill.color, "#e5e5e5"];
    chart.update();
  }

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
      showSingle(skills[btn.dataset.key]);
    });
  });

  document.getElementById("showAll").addEventListener("click", showAll);

  /* INICIAL */
  showSingle(skills.uxui);
});
