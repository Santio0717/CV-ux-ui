document.addEventListener("DOMContentLoaded", () => {

  // ======================================
  // Año footer
  // ======================================
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // ======================================
  // DROPDOWNS (Idioma / Accesibilidad)
  // ======================================
  const langDropdown = document.getElementById("langDropdown");
  const a11yDropdown  = document.getElementById("a11yDropdown");

  function closeAllDropdowns(){
    document.querySelectorAll(".dropdown.open").forEach(d => d.classList.remove("open"));
    document.querySelectorAll(".drop-btn").forEach(btn => btn.setAttribute("aria-expanded", "false"));
  }

  function toggleDropdown(drop){
    if (!drop) return;
    const btn = drop.querySelector(".drop-btn");
    const isOpen = drop.classList.contains("open");

    closeAllDropdowns();

    if (!isOpen){
      drop.classList.add("open");
      if (btn) btn.setAttribute("aria-expanded", "true");
    }
  }

  langDropdown?.querySelector(".drop-btn")?.addEventListener("click", () => toggleDropdown(langDropdown));
  a11yDropdown?.querySelector(".drop-btn")?.addEventListener("click", () => toggleDropdown(a11yDropdown));

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown")) closeAllDropdowns();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllDropdowns();
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
      toolbar_accessibility:"Accesibilidad",
      toolbar_reset_language:"Restablecer idioma",
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
      cert_title:"Certificados",
      contact_title:"Contacto",

      btn_access:"Acceder",
      btn_case:"Caso de estudio",
      btn_certificate:"Ver certificado",

      footer_text:"Portafolio de Santiago Murillo",

      skill_uxui:"UX/UI",
      skill_docs:"Documentación",
      skill_front:"Frontend",
      skill_motion:"Motion",
      skill_prod:"Producción",
      skill_all:"Perfil completo",

      contact_form_title:"Escríbeme",
      contact_send:"Enviar",
      contact_name:"Nombre",
      contact_email:"Email",
      contact_msg:"Mensaje",

      project_bon_desc:"Diseño de wireframes de alta fidelidad para una plataforma de e-commerce, enfocado en jerarquía visual y conversión.",
      project_green_desc:"Prototipo móvil iOS diseñado a partir de principios de usabilidad, navegación intuitiva y experiencia mobile-first.",
      project_nutri_desc:"Diseño de experiencia para un entorno de realidad virtual enfocado en educación nutricional e interacción inmersiva.",
      project_iso_desc:"Prototipo desktop enfocado en accesibilidad, lectura clara y navegación inclusiva para usuarios con diferentes capacidades.",

      tag_english:"Inglés",
      tag_webdesign:"Diseño web",
      tag_prototyping:"Prototipado",
      tag_requirements:"Requisitos",
      tag_innovation:"Innovación",
      tag_validation:"Validación",
      tag_prototypes:"Prototipos",
      tag_graphicdesign:"Diseño gráfico",
      tag_illustration:"Ilustración",
      tag_editing:"Edición",
      tag_retouch:"Retoque"
    },

    en: {
      toolbar_language:"Language",
      toolbar_accessibility:"Accessibility",
      toolbar_reset_language:"Reset language",
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
      cert_title:"Certificates",
      contact_title:"Contact",

      btn_access:"Open",
      btn_case:"Case study",
      btn_certificate:"View certificate",

      footer_text:"Santiago Murillo Portfolio",

      skill_uxui:"UX/UI",
      skill_docs:"Documentation",
      skill_front:"Frontend",
      skill_motion:"Motion",
      skill_prod:"Production",
      skill_all:"Full profile",

      contact_form_title:"Write to me",
      contact_send:"Send",
      contact_name:"Name",
      contact_email:"Email",
      contact_msg:"Message",

      project_bon_desc:"High-fidelity wireframes for an e-commerce platform, focused on visual hierarchy and conversion.",
      project_green_desc:"iOS mobile prototype based on usability principles, intuitive navigation, and a mobile-first approach.",
      project_nutri_desc:"Experience design for a virtual reality environment focused on nutrition education and immersive interaction.",
      project_iso_desc:"Desktop prototype focused on accessibility, clear reading, and inclusive navigation for diverse users.",

      tag_english:"English",
      tag_webdesign:"Web design",
      tag_prototyping:"Prototyping",
      tag_requirements:"Requirements",
      tag_innovation:"Innovation",
      tag_validation:"Validation",
      tag_prototypes:"Prototypes",
      tag_graphicdesign:"Graphic design",
      tag_illustration:"Illustration",
      tag_editing:"Editing",
      tag_retouch:"Retouching"
    },

    fr: {
      toolbar_language:"Langue",
      toolbar_accessibility:"Accessibilité",
      toolbar_reset_language:"Réinitialiser la langue",
      toolbar_reset_accessibility:"Réinitialiser l'accessibilité",
      toolbar_contrast:"Haut contraste",
      toolbar_readable:"Police lisible",

      nav_projects:"Projets",
      nav_skills:"Compétences",
      nav_certificates:"Certificats",
      nav_contact:"Contact",

      hero_role:"Designer UX/UI",
      hero_title:"Je conçois des expériences numériques claires, accessibles et orientées résultats",
      hero_sub:"Je transforme des idées en solutions fonctionnelles grâce à la recherche, au prototypage et au design visuel, en créant des produits qui connectent avec les personnes et apportent de la valeur.",
      hero_cta:"Télécharger CV",

      projects_title:"Projets en vedette",
      skills_title:"Compétences & technologies",
      cert_title:"Certificats",
      contact_title:"Contact",

      btn_access:"Accéder",
      btn_case:"Étude de cas",
      btn_certificate:"Voir le certificat",

      footer_text:"Portfolio de Santiago Murillo",

      skill_uxui:"UX/UI",
      skill_docs:"Documentation",
      skill_front:"Frontend",
      skill_motion:"Motion",
      skill_prod:"Production",
      skill_all:"Profil complet",

      contact_form_title:"Écris-moi",
      contact_send:"Envoyer",
      contact_name:"Nom",
      contact_email:"Email",
      contact_msg:"Message",

      project_bon_desc:"Wireframes haute fidélité pour une plateforme e-commerce, centrés sur la hiérarchie visuelle et la conversion.",
      project_green_desc:"Prototype mobile iOS basé sur des principes d’utilisabilité, une navigation intuitive et une approche mobile-first.",
      project_nutri_desc:"Conception d’expérience pour un environnement VR axé sur l’éducation nutritionnelle et l’interaction immersive.",
      project_iso_desc:"Prototype desktop axé sur l’accessibilité, la lisibilité et une navigation inclusive pour différents utilisateurs.",

      tag_english:"Anglais",
      tag_webdesign:"Design web",
      tag_prototyping:"Prototypage",
      tag_requirements:"Exigences",
      tag_innovation:"Innovation",
      tag_validation:"Validation",
      tag_prototypes:"Prototypes",
      tag_graphicdesign:"Design graphique",
      tag_illustration:"Illustration",
      tag_editing:"Édition",
      tag_retouch:"Retouche"
    },

    pt: {
      toolbar_language:"Idioma",
      toolbar_accessibility:"Acessibilidade",
      toolbar_reset_language:"Redefinir idioma",
      toolbar_reset_accessibility:"Redefinir acessibilidade",
      toolbar_contrast:"Alto contraste",
      toolbar_readable:"Fonte legível",

      nav_projects:"Projetos",
      nav_skills:"Tecnologias",
      nav_certificates:"Certificados",
      nav_contact:"Contato",

      hero_role:"Designer UX/UI",
      hero_title:"Eu crio experiências digitais claras, acessíveis e focadas em resultados",
      hero_sub:"Transformo ideias em soluções funcionais por meio de pesquisa, prototipação e design visual, criando produtos que se conectam com as pessoas e geram valor para o negócio.",
      hero_cta:"Baixar CV",

      projects_title:"Projetos em destaque",
      skills_title:"Tecnologias e habilidades",
      cert_title:"Certificados",
      contact_title:"Contato",

      btn_access:"Acessar",
      btn_case:"Estudo de caso",
      btn_certificate:"Ver certificado",

      footer_text:"Portfólio de Santiago Murillo",

      skill_uxui:"UX/UI",
      skill_docs:"Documentação",
      skill_front:"Frontend",
      skill_motion:"Motion",
      skill_prod:"Produção",
      skill_all:"Perfil completo",

      contact_form_title:"Escreva para mim",
      contact_send:"Enviar",
      contact_name:"Nome",
      contact_email:"Email",
      contact_msg:"Mensagem",

      project_bon_desc:"Wireframes de alta fidelidade para uma plataforma de e-commerce, com foco em hierarquia visual e conversão.",
      project_green_desc:"Protótipo móvel iOS baseado em princípios de usabilidade, navegação intuitiva e abordagem mobile-first.",
      project_nutri_desc:"Design de experiência para um ambiente de realidade virtual focado em educação nutricional e interação imersiva.",
      project_iso_desc:"Protótipo desktop focado em acessibilidade, leitura clara e navegação inclusiva para usuários diversos.",

      tag_english:"Inglês",
      tag_webdesign:"Design web",
      tag_prototyping:"Prototipação",
      tag_requirements:"Requisitos",
      tag_innovation:"Inovação",
      tag_validation:"Validação",
      tag_prototypes:"Protótipos",
      tag_graphicdesign:"Design gráfico",
      tag_illustration:"Ilustração",
      tag_editing:"Edição",
      tag_retouch:"Retoque"
    },

    de: {
      toolbar_language:"Sprache",
      toolbar_accessibility:"Barrierefreiheit",
      toolbar_reset_language:"Sprache zurücksetzen",
      toolbar_reset_accessibility:"Zurücksetzen",
      toolbar_contrast:"Hoher Kontrast",
      toolbar_readable:"Lesbare Schrift",

      nav_projects:"Projekte",
      nav_skills:"Fähigkeiten",
      nav_certificates:"Zertifikate",
      nav_contact:"Kontakt",

      hero_role:"UX/UI Designer",
      hero_title:"Ich gestalte klare, barrierefreie und ergebnisorientierte digitale Erlebnisse",
      hero_sub:"Ich verwandle Ideen durch Research, Prototyping und visuelles Design in funktionale Lösungen—und entwickle Produkte, die Menschen verbinden und geschäftlichen Mehrwert schaffen.",
      hero_cta:"Lebenslauf herunterladen",

      projects_title:"Ausgewählte Projekte",
      skills_title:"Fähigkeiten & Technologien",
      cert_title:"Zertifikate",
      contact_title:"Kontakt",

      btn_access:"Öffnen",
      btn_case:"Fallstudie",
      btn_certificate:"Zertifikat ansehen",

      footer_text:"Portfolio von Santiago Murillo",

      skill_uxui:"UX/UI",
      skill_docs:"Dokumentation",
      skill_front:"Frontend",
      skill_motion:"Motion",
      skill_prod:"Produktion",
      skill_all:"Vollständiges Profil",

      contact_form_title:"Schreib mir",
      contact_send:"Senden",
      contact_name:"Name",
      contact_email:"E-Mail",
      contact_msg:"Nachricht",

      project_bon_desc:"High-Fidelity-Wireframes für eine E-Commerce-Plattform mit Fokus auf visueller Hierarchie und Conversion.",
      project_green_desc:"iOS-Mobilprototyp basierend auf Usability-Prinzipien, intuitiver Navigation und Mobile-First-Ansatz.",
      project_nutri_desc:"Experience Design für eine VR-Umgebung mit Fokus auf Ernährungserziehung und immersiver Interaktion.",
      project_iso_desc:"Desktop-Prototyp mit Fokus auf Barrierefreiheit, klare Lesbarkeit und inklusive Navigation.",

      tag_english:"Englisch",
      tag_webdesign:"Webdesign",
      tag_prototyping:"Prototyping",
      tag_requirements:"Anforderungen",
      tag_innovation:"Innovation",
      tag_validation:"Validierung",
      tag_prototypes:"Prototypen",
      tag_graphicdesign:"Grafikdesign",
      tag_illustration:"Illustration",
      tag_editing:"Bearbeitung",
      tag_retouch:"Retusche"
    },

    zh: {
      toolbar_language:"语言",
      toolbar_accessibility:"无障碍",
      toolbar_reset_language:"重置语言",
      toolbar_reset_accessibility:"重置无障碍",
      toolbar_contrast:"高对比度",
      toolbar_readable:"易读字体",

      nav_projects:"项目",
      nav_skills:"技能",
      nav_certificates:"证书",
      nav_contact:"联系",

      hero_role:"UX/UI 设计师",
      hero_title:"我设计清晰、无障碍且以结果为导向的数字体验",
      hero_sub:"我通过研究、原型设计与视觉设计将想法转化为可落地的解决方案，打造能够与用户产生连接并为业务创造价值的产品。",
      hero_cta:"下载简历",

      projects_title:"精选项目",
      skills_title:"技能与技术",
      cert_title:"证书",
      contact_title:"联系",

      btn_access:"打开",
      btn_case:"案例研究",
      btn_certificate:"查看证书",

      footer_text:"Santiago Murillo 作品集",

      skill_uxui:"UX/UI",
      skill_docs:"文档",
      skill_front:"前端",
      skill_motion:"动效",
      skill_prod:"制作",
      skill_all:"完整档案",

      contact_form_title:"给我留言",
      contact_send:"发送",
      contact_name:"姓名",
      contact_email:"邮箱",
      contact_msg:"消息",

      project_bon_desc:"为电商平台设计高保真线框图，专注于视觉层级与转化。",
      project_green_desc:"基于可用性原则、直观导航与移动优先理念的 iOS 移动原型。",
      project_nutri_desc:"为虚拟现实环境设计体验，聚焦营养教育与沉浸式交互。",
      project_iso_desc:"桌面端原型，聚焦无障碍、清晰阅读与包容性导航。",

      tag_english:"英语",
      tag_webdesign:"网页设计",
      tag_prototyping:"原型设计",
      tag_requirements:"需求",
      tag_innovation:"创新",
      tag_validation:"验证",
      tag_prototypes:"原型",
      tag_graphicdesign:"平面设计",
      tag_illustration:"插画",
      tag_editing:"编辑",
      tag_retouch:"修图"
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

    document.querySelectorAll("[data-i18n-placeholder]").forEach(el=>{
      const key = el.dataset.i18nPlaceholder;
      if(dict[key]) el.setAttribute("placeholder", dict[key]);
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

  const savedLang = localStorage.getItem("lang") || "es";
  setLanguage(savedLang);

  // ======================================
  // ANIMACIÓN CARDS
  // ======================================
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
