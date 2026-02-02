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

  const keys   = Object.keys(skills);
  const labels = keys.map(k => skills[k].label);
  const values = keys.map(k => skills[k].value);
  const baseColors = keys.map(k => skills[k].color);

  // Fijar inicio en 12 y dirección a la derecha (horario)
  const ROTATION_12_PM = -90;
  const CIRCUMFERENCE_FULL = 360;

  // Estado de selección
  let selectedIndex = null; // 0..n-1 o null

  // Helpers para opacidad
  function hexToRgba(hex, a = 1){
    const h = hex.replace("#", "");
    const bigint = parseInt(h.length === 3 ? h.split("").map(c=>c+c).join("") : h, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
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

        // ✅ Colores “inteligentes” según selección (scriptable)
        backgroundColor: (ctx) => {
          const i = ctx.dataIndex;
          const base = baseColors[i];

          // Sin selección: normal
          if (selectedIndex === null) return base;

          // Seleccionado: 100% opacidad
          if (i === selectedIndex) return base;

          // No seleccionado: más opaco
          return hexToRgba(base, 0.25);
        },

        borderWidth: 0,

        // ✅ “Elevación” del segmento seleccionado
        offset: (ctx) => {
          const i = ctx.dataIndex;
          if (selectedIndex === null) return 0;
          return (i === selectedIndex) ? 14 : 0;
        },

        // Separación estética (déjalo bajo para que no se “rompa” visualmente)
        spacing: 2,

        // Grosor del hover (por si pasa mouse)
        hoverOffset: 10
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "75%",
      rotation: ROTATION_12_PM,
      circumference: CIRCUMFERENCE_FULL,
      animation: {
        animateRotate: true,
        duration: 450
      },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      }
    }
  });

  /* ==========================
     TOOLTIP (mostrar %)
  ========================== */
  function showTooltipForIndex(i){
    if (!tooltip) return;
    const key = keys[i];
    const s = skills[key];
    tooltip.textContent = `${s.label} — ${s.value}%`;
    tooltip.style.background = s.color;
    tooltip.style.opacity = "1";
  }

  function hideTooltip(){
    if (tooltip) tooltip.style.opacity = "0";
  }

  // Posicionamiento tooltip
  if (wrapper && tooltip) {
    wrapper.addEventListener("mousemove", (e) => {
      const rect = wrapper.getBoundingClientRect();
      tooltip.style.left = (e.clientX - rect.left) + "px";
      tooltip.style.top  = (e.clientY - rect.top) + "px";
    });
  }

  /* ==========================
     SELECCIÓN (BOTONES)
     - Mantener todas
     - Opacar otras
     - Elevar seleccionada
     - Mostrar %
  ========================== */
  function selectIndex(i){
    selectedIndex = i;

    // Resalta también “active element” para accesibilidad interna del chart
    chart.setActiveElements([{ datasetIndex: 0, index: i }]);

    chart.update();
    showTooltipForIndex(i);
  }

  function clearSelection(){
    selectedIndex = null;
    chart.setActiveElements([]);
    chart.update();
    hideTooltip();
  }

  // Botones (selección por key)
  document.querySelectorAll(".tech-btn[data-key]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tech-btn").forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const key = btn.dataset.key;
      const i = keys.indexOf(key);
      if (i !== -1) selectIndex(i);
    });
  });

  // Perfil completo = sin selección (todo normal)
  document.getElementById("showAll")?.addEventListener("click", function() {
    document.querySelectorAll(".tech-btn").forEach(b => b.classList.remove("is-active"));
    this.classList.add("is-active");
    clearSelection();
  });

  /* ==========================
     (Opcional) Click en la dona también selecciona
  ========================== */
  canvas.addEventListener("click", (evt) => {
    const points = chart.getElementsAtEventForMode(evt, "nearest", { intersect: true }, true);
    if (!points.length) return;

    const i = points[0].index;
    selectIndex(i);

    // sincronizar botones
    document.querySelectorAll(".tech-btn").forEach(b => b.classList.remove("is-active"));
    const key = keys[i];
    const btn = document.querySelector(`.tech-btn[data-key="${key}"]`);
    btn?.classList.add("is-active");
  });

  canvas.addEventListener("mouseleave", () => {
    // si quieres que el tooltip quede fijo cuando hay selección, NO lo ocultes:
    if (selectedIndex === null) hideTooltip();
  });

  /* ==========================
     ANIMACIÓN DE ENTRADA (CARDS)
  ========================== */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("is-visible");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".card").forEach(card => observer.observe(card));

  /* ==========================
     INICIALIZACIÓN
  ========================== */
  clearSelection(); // inicia con todo normal (perfil completo)

});
