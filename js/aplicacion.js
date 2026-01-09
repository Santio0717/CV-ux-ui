document.addEventListener("DOMContentLoaded", () => {

  /* ==========================
     1) Año footer
  ========================== */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ==========================
     2) DROPDOWNS (Idioma / Accesibilidad)
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

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllDropdowns();
  });

  /* ==========================
     3) ACCESIBILIDAD
  ========================== */
  const fontMinus = document.getElementById("fontMinus");
  const fontPlus = document.getElementById("fontPlus");
  const resetA11y = document.getElementById("resetA11y");

  const toggleContrast = document.getElementById("toggleContrast");
  const toggleReadable = document.getElementById("toggleReadable");

  let fontSize = parseInt(localStorage.getItem("fontSize")) || 16;
  let contrast = localStorage.getItem("contrast") === "true";
  let readable = localStorage.getItem("readable") === "true";

  function applyA11y(){
    document.documentElement.style.fontSize = fontSize + "px";
    localStorage.setItem("fontSize", fontSize);

    document.body.classList.toggle("high-contrast", contrast);
    localStorage.setItem("contrast", contrast);

    document.body.classList.toggle("readable-font", readable);
    localStorage.setItem("readable", readable);

    if(toggleContrast) toggleContrast.checked = contrast;
    if(toggleReadable) toggleReadable.checked = readable;
  }

  fontPlus?.addEventListener("click", () => {
    fontSize = Math.min(fontSize + 2, 22);
    applyA11y();
  });

  fontMinus?.addEventListener("click", () => {
    fontSize = Math.max(fontSize - 2, 14);
    applyA11y();
  });

  toggleContrast?.addEventListener("change", () => {
    contrast = toggleContrast.checked;
    applyA11y();
  });

  toggleReadable?.addEventListener("change", () => {
    readable = toggleReadable.checked;
    applyA11y();
  });

  resetA11y?.addEventListener("click", () => {
    fontSize = 16;
    contrast = false;
    readable = false;
    applyA11y();
    closeAllDropdowns();
  });

  applyA11y();

  /* ==========================
     4) TRADUCCIONES
  ========================== */
  const translations = window.translations || {}; 
  // Si en tu archivo ya tienes translations dentro del JS,
  // NO necesitas window.translations. Déjalo como está.

  // ✅ Si translations ya está definido abajo en tu JS, quita el window.translations.
  // Para que no se rompa, lo detectamos:
  const dicts = (typeof translations === "object" && Object.keys(translations).length) ? translations : {};

  /* ==========================
     5) DONUT + TOOLTIP (Y FILTRO)
  ========================== */
  const canvas = document.getElementById("skillsDonut");
  const wrapper = canvas?.closest(".donut-wrapper");
  const tooltip = document.getElementById("donutTooltip");

  let chart = null;

  const allSkills = [
    { key: "uxui", labelKey: "skill_uxui", value: 35, color: "#f39c12" },
    { key: "docs", labelKey: "skill_docs", value: 20, color: "#2ecc71" },
    { key: "front", labelKey: "skill_front", value: 15, color: "#3498db" },
    { key: "motion", labelKey: "skill_motion", value: 30, color: "#9b59b6" },
    { key: "prod", labelKey: "skill_prod", value: 10, color: "#e74c3c" }
  ];

  let currentSkills = [...allSkills];
  let currentDict = dicts.es || {};

  function applyTranslations(lang){
    const dict = dicts[lang] || dicts.es;
    currentDict = dict;

    // ✅ textos normales
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      if (dict[key]) el.textContent = dict[key];
    });

    // ✅ placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      if (dict[key]) el.setAttribute("placeholder", dict[key]);
    });

    // ✅ botón activo
    document.querySelectorAll(".lang-btn").forEach(btn => btn.classList.remove("is-active"));
    document.querySelector(`.lang-btn[data-lang="${lang}"]`)?.classList.add("is-active");

    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;

    closeAllDropdowns();

    // ✅ actualizar donut
    updateDonut();
  }

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
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "68%",
        plugins: { legend: { display: false }, tooltip: { enabled: false } }
      }
    });

    // ✅ tooltip
    wrapper?.addEventListener("mousemove", (e) => {
      const rect = wrapper.getBoundingClientRect();
      tooltip.style.left = (e.clientX - rect.left) + "px";
      tooltip.style.top  = (e.clientY - rect.top) + "px";
    });

    canvas.addEventListener("mousemove", (evt) => {
      const points = chart.getElementsAtEventForMode(evt, "nearest", { intersect: true }, true);
      if (!points.length) return tooltip.style.opacity = "0";

      const i = points[0].index;
      const skill = currentSkills[i];

      tooltip.textContent = `${currentDict[skill.labelKey] || skill.key} — ${skill.value}%`;
      tooltip.style.background = skill.color;
      tooltip.style.opacity = "1";
    });

    canvas.addEventListener("mouseleave", () => tooltip.style.opacity = "0");
  }

  function updateDonut(){
    if (!chart) return;

    chart.data.labels = currentSkills.map(s => currentDict[s.labelKey] || s.key);
    chart.data.datasets[0].data = currentSkills.map(s => s.value);
    chart.data.datasets[0].backgroundColor = currentSkills.map(s => s.color);
    chart.update();
  }

  // ✅ filtros donut desde botones
  function filterDonut(key){
    if (key === "all") {
      currentSkills = [...allSkills];
    } else {
      currentSkills = allSkills.filter(s => s.key === key);
    }
    updateDonut();
  }

  // ✅ activar botones
  function setActive(btn){
    document.querySelectorAll(".tech-btn").forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");
  }

  document.querySelectorAll(".tech-btn[data-key]").forEach(btn => {
    btn.addEventListener("click", () => {
      setActive(btn);
      filterDonut(btn.dataset.key);
    });
  });

  document.getElementById("showAll")?.addEventListener("click", () => {
    setActive(document.getElementById("showAll"));
    filterDonut("all");
  });

  // ✅ inicializar donut
  if (canvas && wrapper && tooltip) createDonut();

  /* ==========================
     6) Animación Cards
  ========================== */
  const cards = document.querySelectorAll(".card");
  if(cards.length){
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    cards.forEach((card, i) => {
      card.style.transitionDelay = `${i * 0.06}s`;
      observer.observe(card);
    });
  }

  /* ==========================
     7) Idioma al cargar
  ========================== */
  const savedLang = localStorage.getItem("lang") || "es";
  applyTranslations(savedLang);

  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => applyTranslations(btn.dataset.lang));
  });

  document.getElementById("resetLang")?.addEventListener("click", () => {
    applyTranslations("es");
  });

});
