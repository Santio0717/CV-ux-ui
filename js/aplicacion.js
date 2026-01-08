document.addEventListener("DOMContentLoaded", () => {

  // ======================================
  // Año footer
  // ======================================
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // ======================================
  // DROPDOWNS
  // ======================================
  const dropdowns = document.querySelectorAll(".dropdown");

  function closeAllDropdowns(){
    dropdowns.forEach(d => d.classList.remove("open"));
    document.querySelectorAll(".drop-btn").forEach(btn => btn.setAttribute("aria-expanded","false"));
  }

  dropdowns.forEach(drop => {
    const btn = drop.querySelector(".drop-btn");
    if(!btn) return;

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = drop.classList.contains("open");
      closeAllDropdowns();
      if(!isOpen){
        drop.classList.add("open");
        btn.setAttribute("aria-expanded","true");
      }
    });
  });

  document.addEventListener("click", closeAllDropdowns);
  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape") closeAllDropdowns();
  });

  // ======================================
  // ACCESIBILIDAD
  // ======================================
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

  // ======================================
  // TRADUCCIONES
  // ======================================
  const translations = {
    es: {
      toolbar_language:"Idioma",
      toolbar_reset_language:"Restablecer idioma",
      toolbar_accessibility:"Accesibilidad",
      toolbar_reset_accessibility:"Restablecer accesibilidad",
      toolbar_contrast:"Alto contraste",
      toolbar_readable:"Fuente legible",

      nav_projects:"Proyectos",
      nav_skills:"Tecnologías",
      nav_certificates:"Certificados",
      nav_contact:"Contacto",

      hero_role:"UX/UI Designer",
      hero_title:"Diseño experiencias digitales claras, accesibles y enfocadas en resultados",
      hero_sub:"Transformo ideas en soluciones funcionales mediante investigación, prototipado y diseño visual, creando productos que conectan con las personas y aportan valor al negocio.",
      hero_cta:"Descargar CV",

      projects_title:"Proyectos destacados",
      skills_title:"Tecnologías y habilidades",
      btn_access:"Acceder",
      btn_case:"Caso de estudio",
      footer_text:"Portafolio de Santiago Murillo",

      project_bon_desc:"Diseño de wireframes de alta fidelidad para una plataforma de e-commerce, enfocado en jerarquía visual y conversión.",
      project_green_desc:"Prototipo móvil iOS diseñado a partir de principios de usabilidad, navegación intuitiva y experiencia mobile-first.",
      project_nutri_desc:"Diseño de experiencia para un entorno de realidad virtual enfocado en educación nutricional e interacción inmersiva.",
      project_iso_desc:"Prototipo desktop enfocado en accesibilidad, lectura clara y navegación inclusiva para usuarios con diferentes capacidades."
    },

    en: {
      toolbar_language:"Language",
      toolbar_reset_language:"Reset language",
      toolbar_accessibility:"Accessibility",
      toolbar_reset_accessibility:"Reset accessibility",
      toolbar_contrast:"High contrast",
      toolbar_readable:"Readable font",

      nav_projects:"Projects",
      nav_skills:"Skills",
      nav_certificates:"Certificates",
      nav_contact:"Contact",

      hero_role:"UX/UI Designer",
      hero_title:"I design clear, accessible, and results-driven digital experiences",
      hero_sub:"I turn ideas into functional solutions through research, prototyping, and visual design—creating products that connect with people and add value to the business.",
      hero_cta:"Download CV",

      projects_title:"Featured projects",
      skills_title:"Skills & technologies",
      btn_access:"Open",
      btn_case:"Case study",
      footer_text:"Santiago Murillo Portfolio",

      project_bon_desc:"High-fidelity wireframes for an e-commerce platform, focused on visual hierarchy and conversion.",
      project_green_desc:"iOS mobile prototype based on usability principles, intuitive navigation, and a mobile-first approach.",
      project_nutri_desc:"Experience design for a virtual reality environment focused on nutrition education and immersive interaction.",
      project_iso_desc:"Desktop prototype focused on accessibility, clear reading, and inclusive navigation for diverse users."
    },

    fr: {
      toolbar_language:"Langue",
      toolbar_reset_language:"Réinitialiser la langue",
      toolbar_accessibility:"Accessibilité",
      toolbar_reset_accessibility:"Réinitialiser",
      toolbar_contrast:"Haut contraste",
      toolbar_readable:"Police lisible",

      nav_projects:"Projets",
      nav_skills:"Compétences",
      nav_certificates:"Certificats",
      nav_contact:"Contact",

      hero_role:"Designer UX/UI",
      hero_title:"Je conçois des expériences numériques claires, accessibles et orientées résultats",
      hero_sub:"Je transforme des idées en solutions fonctionnelles grâce à la recherche, au prototypage et au design visuel.",
      hero_cta:"Télécharger CV",

      projects_title:"Projets en vedette",
      skills_title:"Compétences & technologies",
      btn_access:"Accéder",
      btn_case:"Étude de cas",
      footer_text:"Portfolio de Santiago Murillo",

      project_bon_desc:"Wireframes haute fidélité pour une plateforme e-commerce, centrés sur la hiérarchie visuelle et la conversion.",
      project_green_desc:"Prototype mobile iOS basé sur des principes d’utilisabilité et une navigation intuitive.",
      project_nutri_desc:"Conception d’expérience pour un environnement VR axé sur l’éducation nutritionnelle.",
      project_iso_desc:"Prototype desktop axé sur l’accessibilité, la lisibilité et une navigation inclusive."
    },

    pt: {
      toolbar_language:"Idioma",
      toolbar_reset_language:"Redefinir idioma",
      toolbar_accessibility:"Acessibilidade",
      toolbar_reset_accessibility:"Redefinir",
      toolbar_contrast:"Alto contraste",
      toolbar_readable:"Fonte legível",

      nav_projects:"Projetos",
      nav_skills:"Tecnologias",
      nav_certificates:"Certificados",
      nav_contact:"Contato",

      hero_role:"Designer UX/UI",
      hero_title:"Eu crio experiências digitais claras, acessíveis e focadas em resultados",
      hero_sub:"Transformo ideias em soluções funcionais com pesquisa, prototipação e design visual.",
      hero_cta:"Baixar CV",

      projects_title:"Projetos em destaque",
      skills_title:"Tecnologias e habilidades",
      btn_access:"Acessar",
      btn_case:"Estudo de caso",
      footer_text:"Portfólio de Santiago Murillo",

      project_bon_desc:"Wireframes de alta fidelidade para uma plataforma de e-commerce, com foco em hierarquia visual e conversão.",
      project_green_desc:"Protótipo móvel iOS baseado em princípios de usabilidade e navegação intuitiva.",
      project_nutri_desc:"Design de experiência para um ambiente de realidade virtual focado em educação nutricional.",
      project_iso_desc:"Protótipo desktop focado em acessibilidade e navegação inclusiva."
    },

    de: {
      toolbar_language:"Sprache",
      toolbar_reset_language:"Sprache zurücksetzen",
      toolbar_accessibility:"Barrierefreiheit",
      toolbar_reset_accessibility:"Zurücksetzen",
      toolbar_contrast:"Hoher Kontrast",
      toolbar_readable:"Lesbare Schrift",

      nav_projects:"Projekte",
      nav_skills:"Fähigkeiten",
      nav_certificates:"Zertifikate",
      nav_contact:"Kontakt",

      hero_role:"UX/UI Designer",
      hero_title:"Ich gestalte klare, barrierefreie und ergebnisorientierte digitale Erlebnisse",
      hero_sub:"Ich verwandle Ideen durch Research, Prototyping und visuelles Design in funktionale Lösungen.",
      hero_cta:"Lebenslauf herunterladen",

      projects_title:"Ausgewählte Projekte",
      skills_title:"Fähigkeiten & Technologien",
      btn_access:"Öffnen",
      btn_case:"Fallstudie",
      footer_text:"Portfolio von Santiago Murillo",

      project_bon_desc:"High-Fidelity-Wireframes für eine E-Commerce-Plattform mit Fokus auf visueller Hierarchie und Conversion.",
      project_green_desc:"iOS-Prototyp basierend auf Usability-Prinzipien und intuitiver Navigation.",
      project_nutri_desc:"Experience Design für eine VR-Umgebung mit Fokus auf Ernährungsbildung.",
      project_iso_desc:"Desktop-Prototyp mit Fokus auf Barrierefreiheit und inklusive Navigation."
    },

    zh: {
      toolbar_language:"语言",
      toolbar_reset_language:"重置语言",
      toolbar_accessibility:"无障碍",
      toolbar_reset_accessibility:"重置",
      toolbar_contrast:"高对比度",
      toolbar_readable:"易读字体",

      nav_projects:"项目",
      nav_skills:"技能",
      nav_certificates:"证书",
      nav_contact:"联系",

      hero_role:"UX/UI 设计师",
      hero_title:"我设计清晰、无障碍且以结果为导向的数字体验",
      hero_sub:"我通过研究、原型设计与视觉设计将想法转化为可落地的解决方案。",
      hero_cta:"下载简历",

      projects_title:"精选项目",
      skills_title:"技能与技术",
      btn_access:"打开",
      btn_case:"案例研究",
      footer_text:"Santiago Murillo 作品集",

      project_bon_desc:"为电商平台设计高保真线框图，专注于视觉层级与转化。",
      project_green_desc:"基于可用性原则和直观导航的 iOS 移动原型。",
      project_nutri_desc:"为虚拟现实环境设计体验，聚焦营养教育。",
      project_iso_desc:"桌面端原型，聚焦无障碍和包容性导航。"
    }
  };

  const langButtons = document.querySelectorAll(".lang-btn");
  const resetLang = document.getElementById("resetLang");

  function setLanguage(lang){
    const dict = translations[lang] || translations.es;

    document.querySelectorAll("[data-i18n]").forEach(el=>{
      const key = el.dataset.i18n;
      if(dict[key]) el.textContent = dict[key];
    });

    langButtons.forEach(btn => btn.classList.remove("is-active"));
    document.querySelector(`.lang-btn[data-lang="${lang}"]`)?.classList.add("is-active");

    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
    closeAllDropdowns();
  }

  langButtons.forEach(btn=>{
    btn.addEventListener("click", ()=> setLanguage(btn.dataset.lang));
  });

  resetLang?.addEventListener("click", ()=> setLanguage("es"));

  setLanguage(localStorage.getItem("lang") || "es");

});
