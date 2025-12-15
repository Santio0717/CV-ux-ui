document.addEventListener("DOMContentLoaded", () => {
  /* ================= FOOTER ================= */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ================= ELEMENTOS ================= */
  const canvas = document.getElementById("skillsDonut");
  const wrapper = canvas?.closest(".donut-wrapper");
  const tooltip = document.getElementById("donutTooltip");
  const showAllBtn = document.getElementById("showAll");

  if (!canvas || !wrapper || !tooltip || typeof Chart === "undefined") return;

  /* ================= DATA ================= */
  const skills = [
    { key: "uxui",   label: "UX/UI",         value: 35, color: "#f39c12" },
    { key: "docs",   label: "Documentación", value: 20, color: "#2ecc71" },
    { key: "front",  label: "Frontend",      value: 15, color: "#3498db" },
    { key: "motion", label: "Motion",        value: 30, color: "#9b59b6" },
    { key: "prod",   label: "Producción",    value: 10, color: "#e74c3c" }
  ];

  const remainderColor = "#e6e6e6";

  let mode = "all"; // all | single
  let activeSkill = null;

  /* ================= HELPERS ================= */
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  function showTooltip({ text, x, y, bg }) {
    tooltip.textContent = text;
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
    tooltip.style.background = bg;
    tooltip.style.opacity = "1";
  }

  function hideTooltip() {
    tooltip.style.opacity = "0";
  }

  function getTooltipPosition(chart, arcIndex) {
    const arc = chart.getDatasetMeta(0)?.data?.[arcIndex];
    if (!arc) return null;

    const { x, y } = arc.tooltipPosition();

    const canvasRect = canvas.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();

    // Offset radial hacia afuera (encima del arco)
    const angle = (arc.startAngle + arc.endAngle) / 2;
    const offset = 18;

    const posX =
      x + Math.cos(angle) * offset + (canvasRect.left - wrapperRect.left);
    const posY =
      y + Math.sin(angle) * offset + (canvasRect.top - wrapperRect.top);

    return { x: posX, y: posY };
  }

  /* ================= DATASETS ================= */
  const datasetAll = () => ({
    labels: skills.map(s => s.label),
    datasets: [{
      data: skills.map(s => s.value),
      backgroundColor: skills.map(s => s.color),
      borderWidth: 0,
      hoverOffset: 8
    }]
  });

  const datasetSingle = (skill) => ({
    labels: [skill.label, "Resto"],
    datasets: [{
      data: [skill.value, 100 - skill.value],
      backgroundColor: [skill.color, remainderColor],
      borderWidth: 0,
      hoverOffset: 8
    }]
  });

  /* ================= CHART ================= */
  const chart = new Chart(canvas, {
    type: "doughnut",
    data: datasetAll(),
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "68%",
      animation: { duration: 600, easing: "easeOutQuart" },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      }
    }
  });

  /* ================= MODES ================= */
  function showAll() {
    mode = "all";
    activeSkill = null;
    chart.data = datasetAll();
    chart.update();
    hideTooltip();
  }

  function showSingle(skill) {
    mode = "single";
    activeSkill = skill;
    chart.data = datasetSingle(skill);
    chart.update();
    hideTooltip();
  }

  /* ================= BOTONES ================= */
  document.querySelectorAll(".tech-btn[data-key]").forEach(btn => {
    btn.addEventListener("click", () => {
      const skill = skills.find(s => s.key === btn.dataset.key);
      if (skill) showSingle(skill);
    });

    btn.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        btn.click();
      }
    });
  });

  if (showAllBtn) {
    showAllBtn.addEventListener("click", showAll);
  }

  /* ================= HOVER ================= */
  function handleHover(evt) {
    const points = chart.getElementsAtEventForMode(
      evt,
      "nearest",
      { intersect: true },
      true
    );

    if (!points.length) return hideTooltip();

    const { index } = points[0];

    // En modo single, NO mostrar tooltip en el gris
    if (mode === "single" && index === 1) return hideTooltip();

    let skill, text, color;

    if (mode === "all") {
      skill = skills[index];
    } else {
      skill = activeSkill;
    }

    if (!skill) return hideTooltip();

    const pos = getTooltipPosition(chart, index);
    if (!pos) return hideTooltip();

    text = `${skill.label} — ${skill.value}%`;
    color = skill.color;

    showTooltip({
      text,
      x: pos.x,
      y: pos.y,
      bg: color
    });
  }

  canvas.addEventListener("mousemove", handleHover);
  canvas.addEventListener("mouseleave", hideTooltip);

  /* ================= INIT ================= */
  showAll();
});
