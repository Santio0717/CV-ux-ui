/* =====================================================
   AÑO AUTOMÁTICO
===================================================== */
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* =====================================================
   DONA DE TECNOLOGÍAS — UNA SOLA
===================================================== */
document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById("skillsDonut");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  /* DATA BASE */
  const skills = [
    { label: "UX/UI", value: 35, color: "#f39c12" },
    { label: "Documentación", value: 20, color: "#2ecc71" },
    { label: "Frontend", value: 15, color: "#3498db" },
    { label: "Motion", value: 30, color: "#9b59b6" },
    { label: "Producción", value: 10, color: "#e74c3c" }
  ];

  /* ESTADO INICIAL */
  let activeSkill = skills[0];

  const donut = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: [activeSkill.label, "Restante"],
      datasets: [{
        data: [0, 100],
        backgroundColor: [activeSkill.color, "#e0e0e0"],
        borderWidth: 0
      }]
    },
    options: {
      cutout: "68%",
      animation: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => {
              if (context.dataIndex === 0) {
                return `${activeSkill.label} — ${activeSkill.value}%`;
              }
              return "";
            }
          }
        }
      }
    }
  });

  /* =====================================================
     ANIMACIÓN PROGRESIVA
  ===================================================== */
  function animateTo(value, color, label) {
    let progress = 0;
    activeSkill = { label, value, color };

    const interval = setInterval(() => {
      progress += 2;

      if (progress >= value) {
        progress = value;
        clearInterval(interval);
      }

      donut.data.datasets[0].data = [progress, 100 - progress];
      donut.data.datasets[0].backgroundColor = [color, "#e0e0e0"];
      donut.data.labels[0] = label;
      donut.update();
    }, 14);
  }

  /* ANIMACIÓN INICIAL */
  animateTo(activeSkill.value, activeSkill.color, activeSkill.label);

  /* =====================================================
     BOTONES DE HABILIDADES
  ===================================================== */
  document.querySelectorAll(".skill-btn").forEach(btn => {

    btn.addEventListener("click", () => {

      const type = btn.dataset.type;

      /* MOSTRAR TODAS */
      if (type === "summary") {
        donut.data.labels = skills.map(s => s.label);
        donut.data.datasets[0].data = skills.map(s => s.value);
        donut.data.datasets[0].backgroundColor = skills.map(s => s.color);
        donut.update();
        return;
      }

      /* REGRESAR */
      if (type === "back") {
        animateTo(skills[0].value, skills[0].color, skills[0].label);
        return;
      }

      /* HABILIDAD INDIVIDUAL */
      const skill = skills.find(s => s.label === type);
      if (skill) {
        animateTo(skill.value, skill.color, skill.label);
      }

    });
  });

});
