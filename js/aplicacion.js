document.addEventListener("DOMContentLoaded", () => {

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const skills = {
    uxui:   { label: "UX/UI", value: 35, color: "#f39c12" },
    docs:   { label: "Documentación", value: 20, color: "#2ecc71" },
    front:  { label: "Frontend", value: 15, color: "#3498db" },
    motion: { label: "Motion", value: 20, color: "#9b59b6" },
    prod:   { label: "Producción", value: 10, color: "#e74c3c" }
  };

  const canvas = document.getElementById("skillsDonut");
  const wrapper = canvas?.closest(".donut-wrapper");
  const tooltip = document.getElementById("donutTooltip");

  const keys = Object.keys(skills);
  const labels = keys.map(k => skills[k].label);
  const values = keys.map(k => skills[k].value);
  const baseColors = keys.map(k => skills[k].color);

  const ROTATION_12 = -90; // 12 en punto
  const CIRC_FULL = 360;   // horario

  let selectedIndex = null; // null = perfil completo

  function hexToRgba(hex, a = 1){
    const h = hex.replace("#", "");
    const full = (h.length === 3) ? h.split("").map(c => c + c).join("") : h;
    const n = parseInt(full, 16);
    const r = (n >> 16) & 255;
    const g = (n >> 8) & 255;
    const b = n & 255;
    return `rgba(${r},${g},${b},${a})`;
  }

  const chart = new Chart(canvas, {
    type: "doughnut",
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: (ctx) => {
          const i = ctx.dataIndex;
          const base = baseColors[i];
          if (selectedIndex === null) return base;
          return (i === selectedIndex) ? base : hexToRgba(base, 0.25);
        },
        borderWidth: 0,
        spacing: 2,
        offset: (ctx) => {
          const i = ctx.dataIndex;
          if (selectedIndex === null) return 0;
          return (i === selectedIndex) ? 14 : 0;
        },
        hoverOffset: 10
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "75%",
      rotation: ROTATION_12,
      circumference: CIRC_FULL,
      animation: { duration: 250, animateRotate: false, animateScale: false },
      plugins: { legend: { display: false }, tooltip: { enabled: false } }
    }
  });

  function hideTooltip(){
    if (!tooltip) return;
    tooltip.style.opacity = "0";
  }

  function showTooltipAtArc(index){
    if (!tooltip || !wrapper) return;

    const arc = chart.getDatasetMeta(0).data[index];
    if (!arc) return;

    const s = skills[keys[index]];
    const p = arc.tooltipPosition(); // coords relativas al canvas

    const canvasRect = canvas.getBoundingClientRect();
    const wrapRect = wrapper.getBoundingClientRect();

    const left = (p.x + (canvasRect.left - wrapRect.left));
    const top  = (p.y + (canvasRect.top  - wrapRect.top));

    tooltip.textContent = `${s.label} — ${s.value}%`;
    tooltip.style.background = s.color;

    tooltip.style.left = `${left}px`;
    tooltip.style.top  = `${top}px`;
    tooltip.style.transform = "translate(-50%, -120%)";
    tooltip.style.opacity = "1";
  }

  // ✅ Tooltip:
  // - Perfil completo (selectedIndex === null): se muestra en cualquier segmento
  // - Con selección: SOLO se muestra si el hover está en el segmento seleccionado
  canvas.addEventListener("mousemove", (evt) => {
    if (!tooltip) return;

    const points = chart.getElementsAtEventForMode(
      evt,
      "nearest",
      { intersect: true },
      true
    );

    if (!points.length) {
      hideTooltip();
      return;
    }

    const hoverIndex = points[0].index;

    // ✅ Si hay selección y no estás encima del seleccionado: ocultar
    if (selectedIndex !== null && hoverIndex !== selectedIndex) {
      hideTooltip();
      return;
    }

    showTooltipAtArc(hoverIndex);
  });

  canvas.addEventListener("mouseleave", hideTooltip);

  function selectIndex(i){
    selectedIndex = i;
    chart.setActiveElements([{ datasetIndex: 0, index: i }]);
    chart.update();
    hideTooltip(); // tooltip solo sale cuando pases por encima del seleccionado
  }

  function clearSelection(){
    selectedIndex = null;
    chart.setActiveElements([]);
    chart.update();
    hideTooltip();
  }

  // Botones
  document.querySelectorAll(".tech-btn[data-key]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tech-btn").forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const i = keys.indexOf(btn.dataset.key);
      if (i !== -1) selectIndex(i);
    });
  });

  document.getElementById("showAll")?.addEventListener("click", function(){
    document.querySelectorAll(".tech-btn").forEach(b => b.classList.remove("is-active"));
    this.classList.add("is-active");
    clearSelection();
  });

  // ✅ Click en la dona para cambiar selección también
  canvas.addEventListener("click", (evt) => {
    const points = chart.getElementsAtEventForMode(evt, "nearest", { intersect: true }, true);
    if (!points.length) return;

    const i = points[0].index;
    selectIndex(i);

    document.querySelectorAll(".tech-btn").forEach(b => b.classList.remove("is-active"));
    document.querySelector(`.tech-btn[data-key="${keys[i]}"]`)?.classList.add("is-active");
  });

  // Cards
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("is-visible");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".card").forEach(card => observer.observe(card));

  // Init
  clearSelection();

});
