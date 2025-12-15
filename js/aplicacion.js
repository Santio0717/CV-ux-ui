document.addEventListener("DOMContentLoaded", () => {
  // Año footer
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Selección de elementos DOM
  const canvas = document.getElementById("skillsDonut");
  const wrapper = canvas?.closest(".donut-wrapper");
  const tooltip = document.getElementById("donutTooltip");
  const showAllBtn = document.getElementById("showAll");

  // Validación de la existencia de los elementos necesarios
  if (!canvas || !wrapper || !tooltip || typeof Chart === "undefined") return;

  // Datos de las habilidades
  const skills = [
    { key: "uxui", label: "UX/UI", value: 35, color: "#f39c12" },
    { key: "docs", label: "Documentación", value: 20, color: "#2ecc71" },
    { key: "front", label: "Frontend", value: 15, color: "#3498db" },
    { key: "motion", label: "Motion", value: 30, color: "#9b59b6" },
    { key: "prod", label: "Producción", value: 10, color: "#e74c3c" }
  ];
  
  const remainderColor = "#e6e6e6";  // Color para el espacio vacío de la dona
  
  // Estado inicial
  let mode = "all";  // Modo puede ser "all" o "single"
  let active = skills[0];  // Habilidad activa por defecto
  let raf = null;

  // Función de ayuda para restringir un valor entre dos valores
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

  // Función para actualizar el tooltip
  function setTooltip({ text, x, y, bg }) {
    tooltip.textContent = text;
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
    tooltip.style.background = bg || "rgba(0,0,0,.9)";
    tooltip.style.opacity = "1";
  }

  // Función para ocultar el tooltip
  function hideTooltip() {
    tooltip.style.opacity = "0";
  }

  // Función para obtener el punto de un arco (usado para el tooltip)
  function getArcPoint(chart, index) {
    const meta = chart.getDatasetMeta(0);
    const arc = meta?.data?.[index];
    if (!arc) return null;
    // tooltipPosition() devuelve la posición sobre el arco
    const p = arc.tooltipPosition();
    return { x: p.x, y: p.y };
  }

  // Función para posicionar el tooltip sobre el arco
  function positionAboveArc(chart, index) {
    const p = getArcPoint(chart, index);
    if (!p) return null;

    const rect = canvas.getBoundingClientRect();
    const wRect = wrapper.getBoundingClientRect();

    const cx = p.x + (rect.left - wRect.left);
    const cy = p.y + (rect.top - wRect.top);

    // Lo subimos un poco para que quede “encima” del arco
    return { x: cx, y: cy };
  }

  // Crear datasets para el gráfico de todas las habilidades
  function datasetAll() {
    return {
      labels: skills.map(s => s.label),
      datasets: [{
        data: skills.map(s => s.value),
        backgroundColor: skills.map(s => s.color),
        borderWidth: 0,
        hoverOffset: 6
      }]
    };
  }

  // Crear dataset para el gráfico de una sola habilidad
  function datasetSingle(skill) {
    return {
      labels: [skill.label, "Resto"],
      datasets: [{
        data: [skill.value, 100 - skill.value],
        backgroundColor: [skill.color, remainderColor],
        borderWidth: 0,
        hoverOffset: 6
      }]
    };
  }

  // Crear gráfico de tipo Doughnut
  const chart = new Chart(canvas, {
    type: "doughnut",
    data: datasetAll(),
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "68%",
      animation: { duration: 650, easing: "easeOutQuart" },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }  // Usamos el tooltip personalizado
      }
    }
  });

  // Animación suave para cambiar entre el modo "single" (una habilidad) sin parpadeos
  function animateToSingle(skill) {
    mode = "single";
    active = skill;

    const target = skill.value;
    const start = chart.data.datasets[0].data?.[0] ?? 0;

    const t0 = performance.now();
    const duration = 520;

    const step = (t) => {
      const k = clamp((t - t0) / duration, 0, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - k, 3);
      const val = start + (target - start) * eased;

      chart.data = datasetSingle(skill);
      chart.data.datasets[0].data = [val, 100 - val];
      chart.update("none");

      if (k < 1) raf = requestAnimationFrame(step);
    };

    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(step);
  }

  // Mostrar todas las habilidades (modo "all")
  function showAll() {
    mode = "all";
    chart.data = datasetAll();
    chart.update();
    hideTooltip();
  }

  // Eventos para los botones de habilidades
  document.querySelectorAll(".tech-btn[data-key]").forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.key;
      const s = skills.find(x => x.key === key);
      if (!s) return;
      animateToSingle(s);
      hideTooltip();
    });

    // Accesibilidad: permitir Enter/Espacio
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        btn.click();
      }
    });
  });

  // Botón "Diseñador UX/UI" (deja el modo "all")
  if (showAllBtn) {
    showAllBtn.addEventListener("click", showAll);
    showAllBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        showAllBtn.click();
      }
    });
  }

  // Hover: Solo mostrar tooltip cuando estamos sobre el segmento pintado
  function handleHover(evt) {
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

    const { index } = points[0];

    // Si estamos en el modo "single", el índice 1 es el gris (vacío) -> NO mostrar
    if (mode === "single" && index === 1) {
      hideTooltip();
      return;
    }

    // Texto y color del tooltip según el modo
    let text = "";
    let bg = "rgba(0,0,0,.9)";

    if (mode === "all") {
      const s = skills[index];
      if (!s) return hideTooltip();
      text = `${s.label} — ${s.value}%`;
      bg = s.color;
    } else {
      // En "single", el índice 0 es el segmento pintado
      text = `${active.label} — ${active.value}%`;
      bg = active.color;
    }

    const pos = positionAboveArc(chart, index);
    if (!pos) return hideTooltip();

    setTooltip({
      text,
      x: pos.x,
      y: pos.y,
      bg
    });
  }

  // Eventos de hover para el gráfico
  canvas.addEventListener("mousemove", handleHover);
  canvas.addEventListener("mouseleave", hideTooltip);

  // Estado inicial: “Diseñador UX/UI” (modo ALL) como pediste
  showAll();
});
