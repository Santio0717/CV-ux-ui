document.addEventListener("DOMContentLoaded", () => {

  const translations = {
    es: {
      skill_uxui: "UX/UI",
      skill_docs: "Documentación",
      skill_front: "Frontend",
      skill_motion: "Motion",
      skill_prod: "Producción",
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

  // Año footer
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ==========================
     DONUT CHART (FIX 3)
     - En modo “Perfil completo”: dona por categorías
     - En modo filtro 1 habilidad: pinta SOLO su porcentaje y el resto queda vacío
  ========================== */
  const canvas = document.getElementById("skillsDonut");
  const wrapper = canvas?.closest(".donut-wrapper");
  const tooltip = document.getElementById("donutTooltip");

  // ✅ Ajusta aquí tus porcentajes (suman 100)
  const allSkills = [
    { key: "uxui",   labelKey: "skill_uxui",   value: 35, color: "#f39c12" },
    { key: "docs",   labelKey: "skill_docs",   value: 20, color: "#2ecc71" },
    { key: "front",  labelKey: "skill_front",  value: 15, color: "#3498db" },
    { key: "motion", labelKey: "skill_motion", value: 20, color: "#9b59b6" },
    { key: "prod",   labelKey: "skill_prod",   value: 10, color: "#e74c3c" }
  ];

  let mode = "all"; // "all" | "single"
  let selectedKey = null;
  let chart = null;

  function buildAllDataset(){
    return {
      labels: allSkills.map(s => currentDict[s.labelKey] || s.key),
      data: allSkills.map(s => s.value),
      colors: allSkills.map(s => s.color)
    };
  }

  function buildSingleDataset(skill){
    const rest = Math.max(0, 100 - skill.value);
    return {
      labels: [currentDict[skill.labelKey] || skill.key, ""],
      data: [skill.value, rest],
      colors: [skill.color, "rgba(0,0,0,.08)"] // “vacío”
    };
  }

  function createDonut(){
    if (!canvas || typeof Chart === "undefined") return;

    const initial = buildAllDataset();

    chart = new Chart(canvas, {
      type: "doughnut",
      data: {
        labels: initial.labels,
        datasets: [{
          data: initial.data,
          backgroundColor: initial.colors,
          borderWidth: 0,
          hoverOffset: 10
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%",
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        }
      }
    });

    // Tooltip position
    wrapper?.addEventListener("mousemove", (e) => {
      const rect = wrapper.getBoundingClientRect();
      if(tooltip) {
        tooltip.style.left = (e.clientX - rect.left) + "px";
        tooltip.style.top  = (e.clientY - rect.top) + "px";
      }
    });

    // Tooltip content
    canvas.addEventListener("mousemove", (evt) => {
      if (!chart) return;

      const points = chart.getElementsAtEventForMode(evt, "nearest", { intersect: true }, true);
      if (!points.length) {
        if(tooltip) tooltip.style.opacity = "0";
        return;
      }

      const i = points[0].index;

      // Si estamos en single, el index 1 es el “resto vacío”, no mostramos tooltip
      if (mode === "single" && i === 1) {
        if(tooltip) tooltip.style.opacity = "0";
        return;
      }

      if (mode === "all") {
        const skill = allSkills[i];
        if(tooltip) {
          tooltip.textContent = `${currentDict[skill.labelKey] || skill.key} — ${skill.value}%`;
          tooltip.style.background = skill.color;
          tooltip.style.opacity = "1";
        }
      } else {
        const skill = allSkills.find(s => s.key === selectedKey);
        if (!skill) return;
        if(tooltip) {
          tooltip.textContent = `${currentDict[skill.labelKey] || skill.key} — ${skill.value}%`;
          tooltip.style.background = skill.color;
          tooltip.style.opacity = "1";
        }
      }
    });

    canvas.addEventListener("mouseleave", () => {
      if(tooltip) tooltip.style.opacity = "0";
    });
  }

  function updateDonut(){
    if (!chart) return;

    if (mode === "all") {
      const ds = buildAllDataset();
      chart.data.labels = ds.labels;
      chart.data.datasets[0].data = ds.data;
      chart.data.datasets[0].backgroundColor = ds.colors;
    } else {
      const skill = allSkills.find(s => s.key === selectedKey);
      if (!skill) return;
      const ds = buildSingleDataset(skill);
      chart.data.labels = ds.labels;
      chart.data.datasets[0].data = ds.data;
      chart.data.datasets[0].backgroundColor = ds.colors;
    }

    chart.update();
  }

  // Botones filtros
  document.querySelectorAll(".tech-btn[data-key]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tech-btn").forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      selectedKey = btn.dataset.key;
      mode = "single";
      updateDonut();
    });
  });

  document.getElementById("showAll")?.addEventListener("click", function() {
    document.querySelectorAll(".tech-btn").forEach(b => b.classList.remove("is-active"));
    this.classList.add("is-active");

    mode = "all";
    selectedKey = null;
    updateDonut();
  });

  /* ==========================
     TRADUCCIONES (si luego agregas data-i18n)
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
  }

  /* ==========================
     Animación Cards
  ========================== */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("is-visible");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".card").forEach(card => observer.observe(card));

  // Init
  createDonut();
  applyTranslations("es");
});
