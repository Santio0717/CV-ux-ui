document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById("skillsDonut");
  if (!canvas) return;

  const tooltip = document.getElementById("donutTooltip");

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

  let mode = "empty"; // empty | single | all

  /* ============================
     CHART INIT (VACÍO)
  ============================ */
  const chart = new Chart(canvas, {
    type: "doughnut",
    data: {
      datasets: [{
        data: [100],
        backgroundColor: ["#ddd"],
        borderWidth: 0
      }]
    },
    options: {
      cutout: "65%",
      animation: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false } // ❌ desactivamos tooltip nativo
      },
      onHover: (event, elements) => {
        if (elements.length && mode !== "empty") {
          const index = elements[0].index;
          let label = "";

          if (mode === "single") {
            label = chart.$activeLabel;
          } else if (mode === "all") {
            label = Object.values(skills)[index].label;
          }

          showTooltip(event.native, label);
        } else {
          hideTooltip();
        }
      }
    }
  });

  /* ============================
     TOOLTIP FLOTANTE (EXTERNO)
  ============================ */
  function showTooltip(event, text) {
    tooltip.textContent = text;
    tooltip.style.opacity = 1;
    tooltip.style.left = event.offsetX + 20 + "px";
    tooltip.style.top = event.offsetY + 20 + "px";
  }

  function hideTooltip() {
    tooltip.style.opacity = 0;
  }

  /* ============================
     DONA INDIVIDUAL
  ============================ */
  function showSingle(skill) {
    mode = "single";
    chart.$activeLabel = skill.label;

    chart.data.datasets[0].data = [skill.value, 100 - skill.value];
    chart.data.datasets[0].backgroundColor = [skill.color, "#ddd"];
    chart.update();
  }

  /* ============================
     RESUMEN (TODOS)
  ============================ */
  function showAll() {
    mode = "all";
    chart.data.datasets[0].data = Object.values(skills).map(s => s.value);
    chart.data.datasets[0].backgroundColor = Object.values(skills).map(s => s.color);
    chart.update();
  }

  /* ============================
     RESET (VACÍO)
  ============================ */
  function resetDonut() {
    mode = "empty";
    hideTooltip();
    chart.data.datasets[0].data = [100];
    chart.data.datasets[0].backgroundColor = ["#ddd"];
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
  document.getElementById("resetDonut").addEventListener("click", resetDonut);

  /* ============================
     ESTADO INICIAL → VACÍO
  ============================ */
  resetDonut();

});
