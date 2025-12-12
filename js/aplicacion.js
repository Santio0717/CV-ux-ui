document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById("skillsDonut");
  const tooltip = document.getElementById("donutTooltip");
  if (!canvas) return;

  const skills = {
    uxui:   { value: 35, color: "#f39c12", label: "UX/UI — 35%" },
    docs:   { value: 20, color: "#2ecc71", label: "Documentación — 20%" },
    front:  { value: 15, color: "#3498db", label: "Frontend — 15%" },
    motion: { value: 30, color: "#9b59b6", label: "Motion — 30%" },
    prod:   { value: 10, color: "#e74c3c", label: "Producción — 10%" }
  };

  const chart = new Chart(canvas, {
    type: "doughnut",
    data: {
      datasets: [{
        data: [0, 100],
        backgroundColor: ["#ddd", "#eee"],
        borderWidth: 0
      }]
    },
    options: {
      cutout: "65%",
      animation: false,
      plugins: { legend: { display:false }, tooltip:{ enabled:false } }
    }
  });

  function showTooltip(text){
    tooltip.textContent = text;
    tooltip.style.opacity = 1;
  }

  function hideTooltip(){
    tooltip.style.opacity = 0;
  }

  function animateSingle(skill){
    let progress = 0;
    const target = skill.value;
    const step = Math.max(1, target / 30);

    const interval = setInterval(() => {
      progress += step;
      if(progress >= target){
        progress = target;
        clearInterval(interval);
      }

      chart.data.datasets[0].data = [progress, 100 - progress];
      chart.data.datasets[0].backgroundColor = [skill.color, "#ddd"];
      chart.update();
    }, 16);

    showTooltip(skill.label);
  }

  function showAll(){
    chart.data.datasets[0].data = Object.values(skills).map(s => s.value);
    chart.data.datasets[0].backgroundColor = Object.values(skills).map(s => s.color);
    chart.update();
    showTooltip("Resumen de habilidades — Diseñador UX/UI");
  }

  function reset(){
    chart.data.datasets[0].data = [0,100];
    chart.data.datasets[0].backgroundColor = ["#ddd","#eee"];
    chart.update();
    hideTooltip();
  }

  document.querySelectorAll(".tech-btn[data-key]").forEach(btn=>{
    btn.addEventListener("click",()=>{
      animateSingle(skills[btn.dataset.key]);
    });
  });

  document.getElementById("showAll").addEventListener("click", showAll);
  document.getElementById("resetDonut").addEventListener("click", reset);

});
