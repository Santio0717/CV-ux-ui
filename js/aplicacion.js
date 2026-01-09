document.addEventListener("DOMContentLoaded", () => {
  // Marca para animaciones seguras (tu CSS ya lo contempla)
  document.body.classList.add("js");

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
      btn?.setAttribute("aria-expanded", "true");
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
  const translations = {
    es: {
      nav_projects: "Proyectos",
      nav_skills: "Tecnologías",
      nav_certificates: "Certificados",
      nav_contact: "Contacto",
      toolbar_language: "Idioma",
      toolbar_reset_language: "Restablecer idioma",
      toolbar_accessibility: "Accesibilidad",
      toolbar_reset_accessibility: "Restablecer accesibilidad",
      toolbar_contrast: "Alto contraste",
      toolbar_readable: "Fuente legible",
      projects_title: "Proyectos destacados",
      skills_title: "Tecnologías y habilidades",
      cert_title: "Certificados",
      contact_title: "Contacto",
      btn_access: "Acceder",
      btn_case: "Caso de estudio",
      btn_certificate: "Ver certificado",
      skill_uxui: "UX/UI",
      skill_docs: "Documentación",
      skill_front: "Frontend",
      skill_motion: "Motion",
      skill_prod: "Producción",
      skill_all: "Perfil completo",
      footer_text: "Portafolio de Santiago Murillo",
      tag_innovation: "Innovación",
      tag_validation: "Validación",
      tag_prototypes: "Prototipos",
      tag_designthinking: "Design Thinking"
    },
    en: {
      nav_projects: "Projects",
      nav_skills: "Skills",
      nav_certificates: "Certificates",
      nav_contact: "Contact",
      toolbar_language: "Language",
      toolbar_reset_language: "Reset language",
      toolbar_accessibility: "Accessibility",
      toolbar_reset_accessibility: "Reset accessibility",
      toolbar_contrast: "High contrast",
      toolbar_readable: "Readable font",
      projects_title: "Featured projects",
      skills_title: "Skills & technologies",
      cert_title: "Certificates",
      contact_title: "Contact",
      btn_access: "Open",
      btn_case: "Case study",
      btn_certificate: "View certificate",
      skill_uxui: "UX/UI",
      skill_docs: "Documentation",
      skill_front: "Frontend",
      skill_motion: "Motion",
      skill_prod: "Production",
      skill_all: "Full profile",
      footer_text: "Santiago Murillo Portfolio",
      tag_innovation: "Innovation",
      tag_validation: "Validation",
      tag_prototypes: "Prototypes",
      tag_designthinking: "Design Thinking"
    },
    fr: {
      nav_projects: "Projets",
      nav_skills: "Compétences",
      nav_certificates: "Certificats",
      nav_contact: "Contact",
      toolbar_language: "Langue",
      toolbar_accessibility: "Accessibilité",
      toolbar_contrast: "Haut contraste",
      toolbar_readable: "Police lisible",
      projects_title: "Projets en vedette",
      skills_title: "Compétences & technologies",
      cert_title: "Certificats",
      contact_title: "Contact",
      btn_certificate: "Voir le certificat",
      skill_uxui: "UX/UI",
      skill_docs: "Documentation",
      skill_front: "Frontend",
      skill_motion: "Motion",
      skill_prod: "Production",
      skill_all: "Profil complet",
      footer_text: "Portfolio de Santiago Murillo",
      tag_innovation: "Innovation",
      tag_validation: "Validation",
      tag_prototypes: "Prototypes",
      tag_designthinking: "Design Thinking"
    },
    pt: {
      nav_projects: "Projetos",
      nav_skills: "Tecnologias",
      nav_certificates: "Certificados",
      nav_contact: "Contato",
      toolbar_language: "Idioma",
      toolbar_accessibility: "Acessibilidade",
      toolbar_contrast: "Alto contraste",
      toolbar_readable: "Fonte legível",
      projects_title: "Projetos em destaque",
      skills_title: "Tecnologias e habilidades",
      cert_title: "Certificados",
      contact_title: "Contato",
      btn_certificate: "Ver certificado",
      skill_all: "Perfil completo",
      footer_text: "Portfólio de Santiago Murillo",
      tag_innovation: "Inovação",
      tag_validation: "Validação",
      tag_prototypes: "Protótipos",
      tag_designthinking: "Design Thinking"
    },
    de: {
      nav_projects: "Projekte",
      nav_skills: "Fähigkeiten",
      nav_certificates: "Zertifikate",
      nav_contact: "Kontakt",
      toolbar_language: "Sprache",
      toolbar_accessibility: "Barrierefreiheit",
      toolbar_contrast: "Hoher Kontrast",
      toolbar_readable: "Lesbare Schrift",
      projects_title: "Ausgewählte Projekte",
      skills_title: "Fähigkeiten & Technologien",
      cert_title: "Zertifikate",
      contact_title: "Kontakt",
      btn_certificate: "Zertifikat ansehen",
      skill_all: "Vollständiges Profil",
      footer_text: "Portfolio von Santiago Murillo",
      tag_innovation: "Innovation",
      tag_validation: "Validierung",
      tag_prototypes: "Prototypen",
      tag_designthinking: "Design Thinking"
    },
    zh: {
      nav_projects: "项目",
      nav_skills: "技能",
      nav_certificates: "证书",
      nav_contact: "联系",
      toolbar_language: "语言",
      toolbar_accessibility: "无障碍",
      toolbar_contrast: "高对比度",
      toolbar_readable: "易读字体",
      projects_title: "精选项目",
      skills_title: "技能与技术",
      cert_title: "证书",
      contact_title: "联系",
      btn_certificate: "查看证书",
      skill_all: "完整档案",
      footer_text: "Santiago Murillo 作品集",
      tag_innovation: "创新",
      tag_validation: "验证",
      tag_prototypes: "原型",
      tag_designthinking: "设计思维"
    }
  };

  let currentLang = localStorage.getItem("lang") || "es";
  let currentDict = translations[currentLang] || translations.es;

  function translatePage(){
    // data-i18n
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      if (currentDict[key]) el.textContent = currentDict[key];
    });

    // placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      if (currentDict[key]) el.setAttribute("placeholder", currentDict[key]);
    });

    // activar botón
    document.querySelectorAll(".lang-btn").forEach(btn => btn.classList.remove("is-active"));
    document.querySelector(`.lang-btn[data-lang="${currentLang}"]`)?.classList.add("is-active");

    document.documentElement.lang = currentLang;
  }

  function setLanguage(lang){
    currentLang = lang;
    currentDict = translations[lang] || translations.es;
    localStorage.setItem("lang", lang);
    translatePage();
    closeAllDropdowns();
    updateDonutLabels();
  }


  /* ==========================
     5) DONUT
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

  function buildDonut(){
    if (!canvas || !wrapper || !tooltip || typeof Chart === "undefined") return;

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

    wrapper.addEventListener("mousemove", (e) => {
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

  function updateDonutLabels(){
    if (!chart) return;
    chart.data.labels = currentSkills.map(s => currentDict[s.labelKey] || s.key);
    chart.update();
  }

  function updateDonutData(){
    if (!chart) return;
    chart.data.labels = currentSkills.map(s => currentDict[s.labelKey] || s.key);
    chart.data.datasets[0].data = currentSkills.map(s => s.value);
    chart.data.datasets[0].backgroundColor = currentSkills.map(s => s.color);
    chart.update();
  }

  function filterDonut(key){
    currentSkills = (key === "all") ? [...allSkills] : allSkills.filter(s => s.key === key);
    updateDonutData();
  }

  function setActive(btn){
    document.querySelectorAll(".tech-btn").forEach(b => b.classList.remove("is-active"));
    btn?.classList.add("is-active");
  }

  document.querySelectorAll(".tech-btn[data-key]").forEach(btn => {
    btn.addEventListener("click", () => {
      setActive(btn);
      filterDonut(btn.dataset.key);
    });
  });

  document.getElementById("showAll")?.addEventListener("click", () => {
    const btn = document.getElementById("showAll");
    setActive(btn);
    filterDonut("all");
  });


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
     7) INIT
  ========================== */
  buildDonut();
  translatePage();

  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });

  document.getElementById("resetLang")?.addEventListener("click", () => setLanguage("es"));

});
