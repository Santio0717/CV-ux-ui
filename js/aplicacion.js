document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById("skillsDonut");
  if (!canvas) return;

  const tooltip = document.getElementById("donutTooltip");

  const skills = {
    uxui:   { value: 35, color: "#f39c12", label: "UX/UI — 35%" },
    docs:   { value: 20, color: "#2ecc71", label: "Documentación — 20%" },
    front:  { value: 15, color: "#3498db", label: "Frontend — 15%" },
    motion: { value: 30, color: "#9b59b6", label: "Motion — 30%" },
    prod:   { value: 10, color: "#e74c3c", label: "Producción — 10%" }
  };

  let currentData = [0, 100];
  let currentColors = ["#ddd", "#ddd"];

  const chart = new Chart(canvas, {
    type: "doughnut",
    data: {
      datasets: [{
        data: currentData,
        backgroundColor: currentColors,
        borderWidth: 0,
        hoverOffset: 6
      }]
    },
    options: {
      cutout: "65%",
      animation: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      },
      onHover: (evt, elements) => {
        if (!elements.length) {
          tooltip.style.opacity = 0;
          return;
        }

        const el = elements[0];
        const dataset = chart.data.datasets[0];
        const value = dataset.data[el.index];
        const total = dataset.data.reduce((a,b)=>a+b,0);
        const percent = Math.round((value / total) * 100);

        // posición del arco
        const angle = (el.startAngle + el.endAngle) / 2;
        const r = (el.outerRadius + el.innerRadius) / 2;

        const x = chart.canvas.offsetLeft + chart.chartArea.left +
                  chart.chartArea.width / 2 + Math.cos(angle) * r;

        const y = chart.canvas.offsetTop + chart.chartArea.top +
                  chart.chartArea.height / 2 + Math.sin(angle) * r;

        tooltip.textContent = percent + "%";
        tooltip.style.left = x + "px";
        tooltip.style.top  = y + "px";
        tooltip.style.opacity = 1;
      }
    }
  });

  /* ============================
     ANIMACIÓN SUAVE
  ============================ */
  function animateSingle(skill) {
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
      chart.data.datasets[0].backgroundColor = [skill.color, "#ddd"];
      chart.update();
    }, 16);
  }

  function showAll() {
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

  /* ============================
     ESTADO INICIAL (VACÍO)
  ============================ */
  chart.update();

});
