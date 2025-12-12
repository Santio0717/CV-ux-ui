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

  let activeSkill = null;

  const chart = new Chart(canvas, {
    type: "doughnut",
    data: {
      datasets: [{
        data: [],
        backgroundColor: [],
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

        // ❌ No hover
        if (!elements.length || !activeSkill) {
          tooltip.style.opacity = 0;
          return;
        }

        const el = elements[0];

        // 🔥 SOLO parte pintada
        if (el.index !== 0) {
          tooltip.style.opacity = 0;
          return;
        }

        const rect = canvas.getBoundingClientRect();
        const angle = (el.startAngle + el.endAngle) / 2;
        const radius = el.outerRadius + 14;

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
          18; // 🔥 siempre arriba

        tooltip.textContent = activeSkill.label;
        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
        tooltip.style.opacity = 1;
      }
    }
  });

  /* =========================
     FUNCIONES
  ========================= */
  function showSkill(skill) {
    activeSkill = skill;

    chart.data.datasets[0].data = [skill.value, 100 - skill.value];
    chart.data.datasets[0].backgroundColor = [skill.color, "#e6e6e6"];
    chart.update();
  }

  function showAll() {
    activeSkill = { label: "Diseñador UX/UI" };

    chart.data.datasets[0].data = Object.values(skills).map(s => s.value);
    chart.data.datasets[0].backgroundColor = Object.values(skills).map(s => s.color);
    chart.update();
  }

  /* =========================
     BOTONES
  ========================= */
  document.querySelectorAll(".tech-btn[data-key]").forEach(btn => {
    btn.addEventListener("click", () => {
      showSkill(skills[btn.dataset.key]);
    });
  });

  document.getElementById("showAll").addEventListener("click", showAll);

  // Estado inicial
  showAll();
});
