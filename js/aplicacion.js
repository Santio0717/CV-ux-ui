document.addEventListener("DOMContentLoaded", () => {

  const ctx = document.getElementById("skillsDonut");
  const tooltip = document.getElementById("donutTooltip");

  const skills = [
    { label: "UX/UI", value: 35, color: "#f39c12" },
    { label: "Documentación", value: 20, color: "#2ecc71" },
    { label: "Frontend", value: 15, color: "#3498db" },
    { label: "Motion", value: 30, color: "#9b59b6" },
    { label: "Producción", value: 10, color: "#e74c3c" }
  ];

  let donut = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["UX/UI"],
      datasets: [{
        data: [35, 65],
        backgroundColor: ["#f39c12", "#e0e0e0"],
        borderWidth: 0
      }]
    },
    options: {
      cutout: "70%",
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      }
    }
  });

  function animateTo(value, color, label) {
    let current = 0;
    tooltip.textContent = `${label} — ${value}%`;
    tooltip.style.opacity = 1;

    const interval = setInterval(() => {
      current += 2;
      if (current >= value) {
        current = value;
        clearInterval(interval);
      }

      donut.data.datasets[0].data = [current, 100 - current];
      donut.data.datasets[0].backgroundColor = [color, "#e0e0e0"];
      donut.update();
    }, 15);
  }

  document.querySelectorAll(".tech-btn[data-skill]").forEach(btn => {
    btn.addEventListener("click", () => {
      animateTo(
        btn.dataset.value,
        btn.dataset.color,
        btn.dataset.skill
      );
    });
  });

  document.getElementById("showAll").addEventListener("click", () => {
    donut.data.labels = skills.map(s => s.label);
    donut.data.datasets[0].data = skills.map(s => s.value);
    donut.data.datasets[0].backgroundColor = skills.map(s => s.color);
    donut.update();
    tooltip.style.opacity = 0;
  });

  document.getElementById("resetDonut").addEventListener("click", () => {
    donut.data.labels = ["UX/UI"];
    donut.data.datasets[0].data = [35, 65];
    donut.data.datasets[0].backgroundColor = ["#f39c12", "#e0e0e0"];
    donut.update();
    tooltip.style.opacity = 0;
  });

});
