document.addEventListener("DOMContentLoaded", () => {

  /* ==========================
     0) HABILITAR FALLBACK ANIMACIONES
  ========================== */
  document.body.classList.add("js");

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
     4) TRADUCCIONES (OBJETO PRINCIPAL)
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

      contact_form_title: "Escríbeme",
      contact_send: "Enviar",
      contact_name: "Nombre",
      contact_email: "Email",
      contact_msg: "Mensaje",

      footer_text: "Portafolio de Santiago Murillo",
      contact_email_label: "Email:",

      // TAGS certificados
      tag_english: "Inglés",
      tag_webdesign: "Diseño web",
      tag_prototyping: "Prototipado",
      tag_requirements: "Requisitos",
      tag_innovation: "Innovación",
      tag_validation: "Validación",
      tag_prototypes: "Prototipos",
      tag_graphicdesign: "Diseño gráfico",
      tag_illustration: "Ilustración",
      tag_editing: "Edición",
      tag_retouch: "Retoque",

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

      contact_form_title: "Write to me",
      contact_send: "Send",
      contact_name: "Name",
      contact_email: "Email",
      contact_msg: "Message",

      footer_text: "Santiago Murillo Portfolio",
      contact_email_label: "Email:",

      tag_english: "English",
      tag_webdesign: "Web design",
      tag_prototyping: "Prototyping",
      tag_requirements: "Requirements",
      tag_innovation: "Innovation",
      tag_validation: "Validation",
      tag_prototypes: "Prototypes",
      tag_graphicdesign: "Graphic design",
      tag_illustration: "Illustration",
      tag_editing: "Editing",
      tag_retouch: "Retouch",

      tag_designthinking: "Design Thinking"
    },

    fr: {
      nav_projects: "Projets",
      nav_skills: "Compétences",
      nav_certificates: "Certificats",
      nav_contact: "Contact",

      toolbar_language: "Langue",
      toolbar_reset_language: "Réinitialiser la langue",
      toolbar_accessibility: "Accessibilité",
      toolbar_reset_accessibility: "Réinitialiser",
      toolbar_contrast: "Haut contraste",
      toolbar_readable: "Police lisible",

      projects_title: "Projets en vedette",
      skills_title: "Compétences & technologies",
      cert_title: "Certificats",
      contact_title: "Contact",

      btn_access: "Accéder",
      btn_case: "Étude de cas",
      btn_certificate: "Voir le certificat",

      skill_uxui: "UX/UI",
      skill_docs: "Documentation",
      skill_front: "Frontend",
      skill_motion: "Motion",
      skill_prod: "Production",
      skill_all: "Profil complet",

      contact_form_title: "Écris-moi",
      contact_send: "Envoyer",
      contact_name: "Nom",
      contact_email: "Email",
      contact_msg: "Message",

      footer_text: "Portfolio de Santiago Murillo",
      contact_email_label: "Email:",

      tag_english: "Anglais",
      tag_webdesign: "Web design",
      tag_prototyping: "Prototypage",
      tag_requirements: "Exigences",
      tag_innovation: "Innovation",
      tag_validation: "Validation",
      tag_prototypes: "Prototypes",
      tag_graphicdesign: "Design graphique",
      tag_illustration: "Illustration",
      tag_editing: "Édition",
      tag_retouch: "Retouche",

      tag_designthinking: "Design Thinking"
    },

    pt: {
      nav_projects: "Projetos",
      nav_skills: "Tecnologias",
      nav_certificates: "Certificados",
      nav_contact: "Contato",

      toolbar_language: "Idioma",
      toolbar_reset_language: "Redefinir idioma",
      toolbar_accessibility: "Acessibilidade",
      toolbar_reset_accessibility: "Redefinir",
      toolbar_contrast: "Alto contraste",
      toolbar_readable: "Fonte legível",

      projects_title: "Projetos em destaque",
      skills_title: "Tecnologias e habilidades",
      cert_title: "Certificados",
      contact_title: "Contato",

      btn_access: "Acessar",
      btn_case: "Estudo de caso",
      btn_certificate: "Ver certificado",

      skill_uxui: "UX/UI",
      skill_docs: "Documentação",
      skill_front: "Frontend",
      skill_motion: "Motion",
      skill_prod: "Produção",
      skill_all: "Perfil completo",

      footer_text: "Portfólio de Santiago Murillo",
      contact_email_label: "Email:",

      tag_designthinking: "Design Thinking"
    },

    de: {
      nav_projects: "Projekte",
      nav_skills: "Fähigkeiten",
      nav_certificates: "Zertifikate",
      nav_contact: "Kontakt",

      toolbar_language: "Sprache",
      toolbar_reset_language: "Sprache zurücksetzen",
      toolbar_accessibility: "Barrierefreiheit",
      toolbar_reset_accessibility: "Zurücksetzen",
      toolbar_contrast: "Hoher Kontrast",
      toolbar_readable: "Lesbare Schrift",

      projects_title: "Ausgewählte Projekte",
      skills_title: "Fähigkeiten & Technologien",
      cert_title: "Zertifikate",
      contact_title: "Kontakt",

      btn_access: "Öffnen",
      btn_case: "Fallstudie",
      btn_certificate: "Zertifikat ansehen",

      skill_uxui: "UX/UI",
      skill_docs: "Dokumentation",
      skill_front: "Frontend",
      skill_motion: "Motion",
      skill_prod: "Produktion",
      skill_all: "Vollständiges Profil",

      footer_text: "Portfolio von Santiago Murillo",
      contact_email_label: "E-Mail:",

      tag_designthinking: "Design Thinking"
    },

    zh: {
      nav_projects: "项目",
      nav_skills: "技能",
      nav_certificates: "证书",
      nav_contact: "联系",

      toolbar_language: "语言",
      toolbar_reset_language: "重置语言",
      toolbar_accessibility: "无障碍",
      toolbar_reset_accessibility: "重置无障碍",
      toolbar_contrast: "高对比度",
      toolbar_readable: "易读字体",

      projects_title: "精选项目",
      skills_title: "技能与技术",
      cert_title: "证书",
      contact_title: "联系",

      btn_access: "打开",
      btn_case: "案例研究",
      btn_certificate: "查看证书",

      skill_uxui: "UX/UI",
      skill_docs: "文档",
      skill_front: "前端",
      skill_motion: "动效",
      skill_prod: "制作",
      skill_all: "完整档案",

      footer_text: "Santiago Murillo 作品集",
      contact_email_label: "邮箱：",

      tag_designthinking: "设计思维"
    }
  };


  /* ==========================
     5) IDIOMA ACTUAL
  ========================== */
  let currentLang = localStorage.getItem("lang") || "es";
  let currentDict = translations[currentLang] || translations.es;


  /* ==========================
     6) DONUT CHART + TOOLTIP + FILTER
  ========================== */
  const canvas = document.getElementById("skillsDonut");
  const wrapper = canvas?.closest(".donut-wrapper");
  const tooltip = document.getElementById("donutTooltip");

  const allSkills = [
    { key: "uxui",   labelKey: "skill_uxui",   value: 35, color: "#f39c12" },
    { key: "docs",   labelKey: "skill_docs",   value: 20, color: "#2ecc71" },
    { key: "front",  labelKey: "skill_front",  value: 15, color: "#3498db" },
    { key: "motion", labelKey: "skill_motion", value: 30, color: "#9b59b6" },
    { key: "prod",   labelKey: "skill_prod",   value: 10, color: "#e74c3c" }
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
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        }
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

  function updateDonut(){
    if (!chart) return;

    chart.data.labels = currentSkills.map(s => currentDict[s.labelKey] || s.key);
    chart.data.datasets[0].data = currentSkills.map(s => s.value);
    chart.data.datasets[0].backgroundColor = currentSkills.map(s => s.color);
    chart.update();
  }

  function filterDonut(key){
    if (key === "all") {
      currentSkills = [...allSkills];
    } else {
      // IMPORTANTE: mantiene donut visible, no rellena completo
      currentSkills = allSkills.filter(s => s.key === key);
    }
    updateDonut();
  }

  function setActive(btn){
    document.querySelectorAll(".tech-btn").forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");
  }

  // botones filtro
  document.querySelectorAll(".tech-btn[data-key]").forEach(btn => {
    btn.addEventListener("click", () => {
      setActive(btn);
      filterDonut(btn.dataset.key);
    });
  });

  document.getElementById("showAll")?.addEventListener("click", () => {
    const btn = document.getElementById("showAll");
    if(btn) setActive(btn);
    filterDonut("all");
  });


  /* ==========================
     7) APLICAR TRADUCCIÓN
  ========================== */
  function applyTranslations(lang){
    currentLang = lang;
    currentDict = translations[lang] || translations.es;

    // textos normales
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      if (currentDict[key]) el.textContent = currentDict[key];
    });

    // placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      if (currentDict[key]) el.setAttribute("placeholder", currentDict[key]);
    });

    // botón activo idioma
    document.querySelectorAll(".lang-btn").forEach(btn => btn.classList.remove("is-active"));
    document.querySelector(`.lang-btn[data-lang="${lang}"]`)?.classList.add("is-active");

    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;

    // actualizar donut labels + tooltip idioma
    updateDonut();

    closeAllDropdowns();
  }


  /* ==========================
     8) Animación Cards
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
     9) INIT
  ========================== */
  buildDonut();
  applyTranslations(currentLang);

  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => applyTranslations(btn.dataset.lang));
  });

  document.getElementById("resetLang")?.addEventListener("click", () => {
    applyTranslations("es");
  });

});
