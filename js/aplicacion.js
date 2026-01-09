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

  if(langDropdown){
    langDropdown.querySelector(".drop-btn")?.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleDropdown(langDropdown);
    });
  }

  if(a11yDropdown){
    a11yDropdown.querySelector(".drop-btn")?.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleDropdown(a11yDropdown);
    });
  }

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

      project_bon_desc: "Diseño de wireframes de alta fidelidad para una plataforma de e-commerce, enfocado en jerarquía visual y conversión.",
      project_green_desc: "Prototipo móvil iOS diseñado a partir de principios de usabilidad, navegación intuitiva y experiencia mobile-first.",
      project_nutri_desc: "Diseño de experiencia para un entorno de realidad virtual enfocado en educación nutricional e interacción inmersiva.",
      project_iso_desc: "Prototipo desktop enfocado en accesibilidad, lectura clara y navegación inclusiva para usuarios con diferentes capacidades.",

      contact_form_title: "Escríbeme",
      contact_send: "Enviar",
      contact_name: "Nombre",
      contact_email: "Email",
      contact_msg: "Mensaje",

      footer_text: "Portafolio de Santiago Murillo",

      email_label: "Email:",

      /* ✅ TAGS */
      tag_wireframes: "Wireframes",
      tag_ecommerce: "E-commerce",
      tag_uxui: "UX/UI",
      tag_figma: "Figma",
      tag_ios: "iOS",
      tag_prototyping: "Prototipado",
      tag_vr: "VR",
      tag_ux: "UX",
      tag_prototype: "Prototipo",
      tag_desktop: "Desktop",
      tag_accessibility: "Accesibilidad",
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

      project_bon_desc: "High-fidelity wireframes for an e-commerce platform, focused on visual hierarchy and conversion.",
      project_green_desc: "iOS mobile prototype based on usability principles, intuitive navigation, and a mobile-first approach.",
      project_nutri_desc: "Experience design for a virtual reality environment focused on nutrition education and immersive interaction.",
      project_iso_desc: "Desktop prototype focused on accessibility, clear reading, and inclusive navigation for diverse users.",

      contact_form_title: "Write to me",
      contact_send: "Send",
      contact_name: "Name",
      contact_email: "Email",
      contact_msg: "Message",

      footer_text: "Santiago Murillo Portfolio",

      email_label: "Email:",

      /* ✅ TAGS */
      tag_wireframes: "Wireframes",
      tag_ecommerce: "E-commerce",
      tag_uxui: "UX/UI",
      tag_figma: "Figma",
      tag_ios: "iOS",
      tag_prototyping: "Prototyping",
      tag_vr: "VR",
      tag_ux: "UX",
      tag_prototype: "Prototype",
      tag_desktop: "Desktop",
      tag_accessibility: "Accessibility",
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

      project_bon_desc: "Wireframes haute fidélité pour une plateforme e-commerce, centrés sur la hiérarchie visuelle et la conversion.",
      project_green_desc: "Prototype mobile iOS basé sur des principes d’utilisabilité et une navigation intuitive.",
      project_nutri_desc: "Conception d’expérience pour un environnement VR axé sur l’éducation nutritionnelle.",
      project_iso_desc: "Prototype desktop axé sur l’accessibilité et la navigation inclusive.",

      contact_form_title: "Écris-moi",
      contact_send: "Envoyer",
      contact_name: "Nom",
      contact_email: "Email",
      contact_msg: "Message",

      footer_text: "Portfolio de Santiago Murillo",

      email_label: "Email :",

      /* ✅ TAGS */
      tag_wireframes: "Wireframes",
      tag_ecommerce: "E-commerce",
      tag_uxui: "UX/UI",
      tag_figma: "Figma",
      tag_ios: "iOS",
      tag_prototyping: "Prototypage",
      tag_vr: "VR",
      tag_ux: "UX",
      tag_prototype: "Prototype",
      tag_desktop: "Desktop",
      tag_accessibility: "Accessibilité",
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

      project_bon_desc: "Wireframes de alta fidelidade para uma plataforma de e-commerce, com foco em hierarquia visual e conversão.",
      project_green_desc: "Protótipo móvel iOS baseado em princípios de usabilidade e navegação intuitiva.",
      project_nutri_desc: "Design de experiência para um ambiente VR focado em educação nutricional.",
      project_iso_desc: "Protótipo desktop focado em acessibilidade e navegação inclusiva.",

      contact_form_title: "Escreva para mim",
      contact_send: "Enviar",
      contact_name: "Nome",
      contact_email: "Email",
      contact_msg: "Mensagem",

      footer_text: "Portfólio de Santiago Murillo",

      email_label: "Email:",

      /* ✅ TAGS */
      tag_wireframes: "Wireframes",
      tag_ecommerce: "E-commerce",
      tag_uxui: "UX/UI",
      tag_figma: "Figma",
      tag_ios: "iOS",
      tag_prototyping: "Prototipação",
      tag_vr: "VR",
      tag_ux: "UX",
      tag_prototype: "Protótipo",
      tag_desktop: "Desktop",
      tag_accessibility: "Acessibilidade",
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

      project_bon_desc: "High-Fidelity-Wireframes für eine E-Commerce-Plattform mit Fokus auf Hierarchie und Conversion.",
      project_green_desc: "iOS-Prototyp basierend auf Usability-Prinzipien und intuitiver Navigation.",
      project_nutri_desc: "Experience Design für eine VR-Umgebung mit Fokus auf Ernährungsbildung.",
      project_iso_desc: "Desktop-Prototyp mit Fokus auf Barrierefreiheit und inklusive Navigation.",

      contact_form_title: "Schreib mir",
      contact_send: "Senden",
      contact_name: "Name",
      contact_email: "E-Mail",
      contact_msg: "Nachricht",

      footer_text: "Portfolio von Santiago Murillo",

      email_label: "E-Mail:",

      /* ✅ TAGS */
      tag_wireframes: "Wireframes",
      tag_ecommerce: "E-Commerce",
      tag_uxui: "UX/UI",
      tag_figma: "Figma",
      tag_ios: "iOS",
      tag_prototyping: "Prototyping",
      tag_vr: "VR",
      tag_ux: "UX",
      tag_prototype: "Prototyp",
      tag_desktop: "Desktop",
      tag_accessibility: "Barrierefreiheit",
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

      project_bon_desc: "为电商平台设计高保真线框图，专注于视觉层级与转化。",
      project_green_desc: "基于可用性原则和直观导航的 iOS 移动原型。",
      project_nutri_desc: "为虚拟现实环境设计体验，聚焦营养教育。",
      project_iso_desc: "桌面端原型，聚焦无障碍与包容性导航。",

      contact_form_title: "给我留言",
      contact_send: "发送",
      contact_name: "姓名",
      contact_email: "邮箱",
      contact_msg: "消息",

      footer_text: "Santiago Murillo 作品集",

      email_label: "邮箱：",

      /* ✅ TAGS */
      tag_wireframes: "线框图",
      tag_ecommerce: "电商",
      tag_uxui: "UX/UI",
      tag_figma: "Figma",
      tag_ios: "iOS",
      tag_prototyping: "原型设计",
      tag_vr: "VR",
      tag_ux: "UX",
      tag_prototype: "原型",
      tag_desktop: "桌面端",
      tag_accessibility: "无障碍",
    }
  };


  function setLanguage(lang){
    const dict = translations[lang] || translations.es;

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      if (dict[key]) el.textContent = dict[key];
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      if (dict[key]) el.setAttribute("placeholder", dict[key]);
    });

    document.querySelectorAll(".lang-btn").forEach(btn => btn.classList.remove("is-active"));
    document.querySelector(`.lang-btn[data-lang="${lang}"]`)?.classList.add("is-active");

    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;

    closeAllDropdowns();

    // ✅ actualizar tooltip del donut según idioma activo
    updateDonutLang(dict);
  }

  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });

  document.getElementById("resetLang")?.addEventListener("click", () => {
    setLanguage("es");
  });

  const savedLang = localStorage.getItem("lang") || "es";
  setLanguage(savedLang);



  /* ==========================
     5) DONUT CHART + TOOLTIP TRADUCIDO
  ========================== */
  const canvas = document.getElementById("skillsDonut");
  const wrapper = canvas?.closest(".donut-wrapper");
  const tooltip = document.getElementById("donutTooltip");

  let dictGlobal = translations[savedLang] || translations.es;

  function updateDonutLang(dict){
    dictGlobal = dict;
  }

  if (canvas && wrapper && tooltip && typeof Chart !== "undefined") {

    const skills = [
      { key: "uxui", labelKey: "skill_uxui", value: 35, color: "#f39c12" },
      { key: "docs", labelKey: "skill_docs", value: 20, color: "#2ecc71" },
      { key: "front", labelKey: "skill_front", value: 15, color: "#3498db" },
      { key: "motion", labelKey: "skill_motion", value: 30, color: "#9b59b6" },
      { key: "prod", labelKey: "skill_prod", value: 10, color: "#e74c3c" }
    ];

    const chart = new Chart(canvas, {
      type: "doughnut",
      data: {
        labels: skills.map(s => dictGlobal[s.labelKey] || s.key),
        datasets: [{
          data: skills.map(s => s.value),
          backgroundColor: skills.map(s => s.color),
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
      const skill = skills[i];

      tooltip.textContent = `${dictGlobal[skill.labelKey] || skill.key} — ${skill.value}%`;
      tooltip.style.background = skill.color;
      tooltip.style.opacity = "1";
    });

    canvas.addEventListener("mouseleave", () => tooltip.style.opacity = "0");

    // ✅ botones tech
    function setActive(btn){
      document.querySelectorAll(".tech-btn").forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
    }

    document.querySelectorAll(".tech-btn[data-key]").forEach(btn => {
      btn.addEventListener("click", () => {
        setActive(btn);
      });
    });

    document.getElementById("showAll")?.addEventListener("click", () => {
      setActive(document.getElementById("showAll"));
    });
  }


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

});
