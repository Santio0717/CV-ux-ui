document.addEventListener("DOMContentLoaded", () => {

  /* ==========================
     ✅ 0) TRADUCCIONES (Indispensable para el gráfico)
  ========================== */
  const translations = {
    es: {
      skill_uxui: "UX/UI",
      skill_docs: "Documentación",
      skill_front: "Frontend",
      skill_motion: "Motion",
      skill_prod: "Producción",
      // Agrega aquí más llaves si usas data-i18n en el HTML
    },
    en: {
      skill_uxui: "UX/UI Design",
      skill_docs: "Documentation",
      skill_front: "Frontend",
      skill_motion: "Motion Graphics",
      skill_prod: "Production",
    }
  };

  let currentLang = "es";
  let currentDict = translations[currentLang];

  /* ==========================
     1) Año footer
  ========================== */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ==========================
     2) DROPDOWNS
  ========================== */
  const langDropdown = document.getElementById("langDropdown");
  const a11yDropdown = document.getElementById("a11yDropdown");

  function closeAllDropdowns(){
    document.querySelectorAll(".dropdown.open").forEach(d => d.classList.remove("open"));
    document.querySelectorAll(".drop-btn").forEach(btn => btn.setAttribute("aria-expanded", "false"));
  }

  function toggleDropdown(drop){
    if (!drop) return;
    const btn = drop.querySelector(".drop-btn");
    const isOpen = drop.classList.contains("open");
    closeAllDropdowns();
    if (!isOpen) {
      drop.classList.add("open");
      if(btn) btn.setAttribute("aria-expanded", "true");
    }
  }

  langDropdown?.querySelector(".drop-btn")?.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleDropdown(langDropdown);
  });

  a11yDropdown?.querySelector(".drop-btn")?.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleDropdown(a11yDropdown);
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown")) closeAllDropdowns();
  });

  /* ==========================
     3) ACCESIBILIDAD
  ========================== */
  const fontMinus = document.getElementById("fontMinus");
  const fontPlus = document.getElementById("fontPlus");
  const resetA11y = document.getElementById("resetA11y");
  const toggleContrast = document.getElementById("toggleContrast");
  const toggleReadable = document.getElementById("toggleReadable");

  let fontSize = 16;
  let contrast = false;
  let readable = false;

  function applyA11y(){
    document.documentElement.style.fontSize = fontSize + "px";
    document.body.classList.toggle("high-contrast", contrast);
    document.body.classList.toggle("readable-font", readable);
    if(toggleContrast) toggleContrast.checked = contrast;
    if(toggleReadable) toggleReadable.checked = readable;
  }

  fontPlus?.addEventListener("click", () => { fontSize = Math.min(fontSize + 2, 22); applyA11y(); });
  fontMinus?.addEventListener("click", () => { fontSize = Math.max(fontSize - 2, 14); applyA11y(); });
  toggleContrast?.addEventListener("change", () => { contrast = toggleContrast.checked; applyA11y(); });
  toggleReadable?.addEventListener("change", () => { readable = toggleReadable.checked; applyA11y(); });
  resetA11y?.addEventListener("click", () => {
    fontSize = 16; contrast = false; readable = false;
    applyA11y();
    closeAllDropdowns();
  });

  /* ==========================
     4) TRADUCCIONES LOGIC
  ========================== */
  function applyTranslations(lang){
    currentLang = lang;
    currentDict = translations[lang] || translations.es;

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      if (currentDict[key]) el.textContent = currentDict[key];
    });

    document.documentElement.lang = lang;
    updateDonut();
    closeAllDropdowns();
  }

  /* ==========================
     5) DONUT CHART (Corregido)
  ========================== */
  const canvas = document.getElementById("skillsDonut");
  const wrapper = canvas?.closest(".donut-wrapper");
  const tooltip = document.getElementById("donutTooltip");

  const allSkills = [
    { key: "uxui", labelKey: "skill_uxui", value: 35, color: "#f39c12" },
    { key: "docs", labelKey: "skill_docs", value: 20, color: "#2ecc71" },
    { key: "front", labelKey: "skill_front", value: 15, color: "#3498db" },
    { key: "motion", labelKey: "skill_motion", value: 30, color: "#9b59b6" },
    { key: "prod", labelKey: "skill_prod", value: 10, color: "#e74c3c" }
  ];

  let currentSkills = [...allSkills];
  let chart = null;

  function createDonut(){
    if (!canvas || typeof Chart === "undefined") return;

    chart = new Chart(canvas, {
      type: "doughnut",
      data: {
        labels: currentSkills.map(s => currentDict[s.labelKey] || s.key),
        datasets: [{
          data: currentSkills.map(s => s.value),
          backgroundColor: currentSkills.map(s => s.color),
          borderWidth: 0,
          hoverOffset: 10
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%",
        plugins: { legend: { display: false }, tooltip: { enabled: false } }
      }
    });

    // Tooltip personalizado
    wrapper?.addEventListener("mousemove", (e) => {
      const rect = wrapper.getBoundingClientRect();
      if(tooltip) {
        tooltip.style.left = (e.clientX - rect.left) + "px";
        tooltip.style.top  = (e.clientY - rect.top) + "px";
      }
    });

    canvas.addEventListener("mousemove", (evt) => {
      const points = chart.getElementsAtEventForMode(evt, "nearest", { intersect: true }, true);
      if (!points.length) {
        if(tooltip) tooltip.style.opacity = "0";
        return;
      }

      const i = points[0].index;
      const skill = currentSkills[i];
      if(tooltip) {
        tooltip.textContent = `${currentDict[skill.labelKey] || skill.key} — ${skill.value}%`;
        tooltip.style.background = skill.color;
        tooltip.style.opacity = "1";
      }
    });

    canvas.addEventListener("mouseleave", () => { if(tooltip) tooltip.style.opacity = "0"; });
  }

  function updateDonut(){
    if (!chart) return;
    chart.data.labels = currentSkills.map(s => currentDict[s.labelKey] || s.key);
    chart.data.datasets[0].data = currentSkills.map(s => s.value);
    chart.data.datasets[0].backgroundColor = currentSkills.map(s => s.color);
    chart.update();
  }

  /* ==========================
     6) FILTROS Y EVENTOS
  ========================== */
  document.querySelectorAll(".tech-btn[data-key]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tech-btn").forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const key = btn.dataset.key;
      currentSkills = (key === "all") ? [...allSkills] : allSkills.filter(s => s.key === key);
      updateDonut();
    });
  });

  document.getElementById("showAll")?.addEventListener("click", function() {
      document.querySelectorAll(".tech-btn").forEach(b => b.classList.remove("is-active"));
      this.classList.add("is-active");
      currentSkills = [...allSkills];
      updateDonut();
  });

  /* ==========================
     7) Animación Cards (Intersection Observer)
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
     🚀 INICIALIZACIÓN
  ========================== */
  applyA11y();
  createDonut(); // Primero creamos el objeto Chart
  applyTranslations("es"); // Luego aplicamos textos iniciales

});
