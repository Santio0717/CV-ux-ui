document.addEventListener("DOMContentLoaded", () => {

  /* ==========================
     AÑO FOOTER
  ========================== */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ==========================
     DATOS
  ========================== */
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

  // Inicio fijo 12 (arriba) y crece a la derecha (horario)
  const ROTATION_12 = -90;
  const CIRC_FULL = 360;

  // Selección (opacar/elevación)
  let selectedIndex = null;

  function hexToRgba(hex, a = 1){
    const h = hex.replace("#", "");
    const full = (h.length === 3) ? h.split("").map(c => c + c).join("") : h;
    const n = parseInt(full, 16);
    const r = (n >> 16) & 255;
    const g = (n >> 8) & 255;
    const b = n & 255;
    return `rgba(${r},${g},${b},${a})`;
  }

  /* ==========================
     CHART
  ========================== */
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

  /* ==========================
     TOOLTIP (SOLO SOBRE COLOR)
     - Aparece solo si hay un arco debajo del mouse
     - Se posiciona pegado al arco (tooltipPosition)
     - Desaparece si sales del arco o del canvas
  ========================== */
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

    // Convertir coords canvas -> wrapper
    const canvasRect = canvas.getBoundingClientRect();
    const wrapRect = wrapper.getBoundingClientRect();

    const left = (p.x + (canvasRect.left - wrapRect.left));
    const top  = (p.y + (canvasRect.top  - wrapRect.top));

    tooltip.textContent = `${s.label} — ${s.value}%`;
    tooltip.style.background = s.color;

    // Pegadito al segmento (arriba del punto)
    tooltip.style.left = `${left}px`;
    tooltip.style.top  = `${top}px`;
    tooltip.style.transform = "translate(-50%, -120%)";
    tooltip.style.opacity = "1";
  }

  // ✅ IMPORTANTE: se detecta el arco con Chart.js, no con wrapper mousemove
  canvas.addEventListener("mousemove", (evt) => {
    if (!tooltip) return;

    const points = chart.getElementsAtEventForMode(
      evt,
      "nearest",
      { intersect: true },
      true
    );

    // Si NO está encima de un segmento de color, ocultar
    if (!points.length) {
      hideTooltip();
      return;
    }

    // Está encima de un segmento
    const index = points[0].index;
    showTooltipAtArc(index);
  });

  // Al salir del canvas: ocultar
  canvas.addEventListener("mouseleave", () => {
    hideTooltip();
  });

  /* ==========================
     SELECCIÓN POR BOTONES
     - Mantiene todas visibles
     - Opaca las demás
     - Eleva la seleccionada
  ========================== */
  function selectIndex(i){
    selectedIndex = i;
    chart.setActiveElements([{ datasetIndex: 0, index: i }]);
    chart.update();
  }

  function clearSelection(){
    selectedIndex = null;
    chart.setActiveElements([]);
    chart.update();
    hideTooltip();
  }

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
    clearSelection(); // perfil completo sin selección (pero tooltip funciona al hover)
  });

  /* (Opcional) Click en la dona para seleccionar */
  canvas.addEventListener("click", (evt) => {
    const points = chart.getElementsAtEventForMode(evt, "nearest", { intersect: true }, true);
    if (!points.length) return;

    const i = points[0].index;
    selectIndex(i);

    // sincroniza botones
    document.querySelectorAll(".tech-btn").forEach(b => b.classList.remove("is-active"));
    const key = keys[i];
    document.querySelector(`.tech-btn[data-key="${key}"]`)?.classList.add("is-active");
  });

  /* ==========================
     ANIMACIÓN CARDS
  ========================== */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("is-visible");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".card").forEach(card => observer.observe(card));

  /* INIT */
  clearSelection();

});
