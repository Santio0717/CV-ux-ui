document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById("skillsDonut");
  if (!canvas) return;

  const skillText = document.getElementById("skillText");

  const skills = {
    uxui: { value: 35, color: "#f39c12", label: "UX/UI — 35%" },
    docs: { value: 20, color: "#2ecc71", label: "Documentación — 20%" },
    front: { value: 15, color: "#3498db", label: "Frontend — 15%" },
    motion: { value: 30, color: "#9b59b6", label: "Motion — 30%" },
    prod: { value: 10, color: "#e74c3c", label: "Producción — 10%" }
  };

  let chart = new Chart(canvas, {
    type: "doughnut",
    data: {
      datasets: [{
        data: [0, 100],
        backgroundColor: [skills.uxui.color, "#ddd"],
        borderWidth: 0
      }]
    },
    options: {
      cutout: "65%",
      animation: { animateRotate: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: () => skills.uxui.label
          }
        }
      }
    }
  });

  /* 🔥 ANIMACIÓN SUAVE */
  function animateDonut(value, color, label) {
    let progress = 0;
    const step = Math.max(1, value / 25);

    const interval = setInterval(() => {
      progress += step;
      if (progress >= value) {
        progress = value;
        clearInterval(interval);
      }

      chart.data.datasets[0].data = [progress, 100 - progress];
      chart.data.datasets[0].backgroundColor = [color, "#ddd"];
      chart.options.plugins.tooltip.callbacks.label = () => label;
      chart.update();
    }, 16);

    skillText.textContent = label;
  }

  /* BOTONES INDIVIDUALES */
  document.querySelectorAll(".skill-btn[data-key]").forEach(btn => {
    btn.addEventListener("click", () => {
      const s = skills[btn.dataset.key];
      animateDonut(s.value, s.color, s.label);
    });
  });

  /* MOSTRAR TODO */
  document.getElementById("showAll").addEventListener("click", () => {
    chart.data.datasets[0].data = Object.values(skills).map(s => s.value);
    chart.data.datasets[0].backgroundColor = Object.values(skills).map(s => s.color);
    chart.options.plugins.tooltip.callbacks.label = ctx =>
      Object.values(skills)[ctx.dataIndex].label;
    chart.update();
    skillText.textContent = "Resumen completo de habilidades como Diseñador UX/UI";
  });

  /* REGRESAR */
  document.getElementById("resetDonut").addEventListener("click", () => {
    const s = skills.uxui;
    animateDonut(s.value, s.color, s.label);
  });

  /* ESTADO INICIAL */
  animateDonut(skills.uxui.value, skills.uxui.color, skills.uxui.label);

});
