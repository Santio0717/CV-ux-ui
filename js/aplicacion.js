document.addEventListener("DOMContentLoaded", () => {

  // ======================================
  // 1) Año footer
  // ======================================
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();


  // ======================================
  // 2) DROPDOWNS
  // ======================================
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


  // ======================================
  // 3) ACCESIBILIDAD
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
  // 4) TRADUCCIONES
  // ======================================
  const translations = {
    es: {
      toolbar_language: "Idioma",
      toolbar_reset_language: "Restablecer idioma",
      toolbar_accessibility: "Accesibilidad",
      toolbar_reset_accessibility: "Restablecer accesibilidad",
      toolbar_contrast: "Alto contraste",
      toolbar_readable: "Fuente legible",

      nav_projects: "Proyectos",
      nav_skills: "Tecnologías",
      nav_certificates: "Certificados",
      nav_contact: "Contacto",

      hero_role: "UX/UI Designer",
      hero_title: "Diseño experiencias digitales claras, accesibles y enfocadas en resultados",
      hero_sub: "Transformo ideas en soluciones funcionales mediante investigación, prototipado y diseño visual, creando productos que conectan con las personas y aportan valor al negocio.",
      hero_cta: "Descargar CV",

      projects_title: "Proyectos destacados",
      skills_title: "Tecnologías y habilidades",
      cert_title: "Certificados",
      contact_title: "Contacto",
      contact_email_label: "Email:",

      btn_access: "Acceder",
      btn_case: "Caso de estudio",
      btn_certificate: "Ver certificado",

      footer_text: "Portafolio de Santiago Murillo",

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

      project_bon_desc: "Diseño de wireframes de alta fidelidad para una plataforma de e-commerce, enfocado en jerarquía visual y conversión.",
      project_green_desc: "Prototipo móvil iOS diseñado a partir de principios de usabilidad, navegación intuitiva y experiencia mobile-first.",
      project_nutri_desc: "Diseño de experiencia para un entorno de realidad virtual enfocado en educación nutricional e interacción inmersiva.",
      project_iso_desc: "Prototipo desktop enfocado en accesibilidad, lectura clara y navegación inclusiva para usuarios con diferentes capacidades.",

      tag_wireframes: "Wireframes",
      tag_ecommerce: "E-commerce",
      tag_uxui: "UX/UI",
      tag_ios: "iOS",
      tag_prototyping: "Prototipado",
      tag_ux: "UX",
      tag_prototype: "Prototipo",
      tag_desktop: "Desktop",
      tag_accessibility: "Accesibilidad",

      donut_uxui: "UX/UI",
      donut_docs: "Documentación",
      donut_front: "Frontend",
      donut_motion: "Motion",
      donut_prod: "Producción"
    },

    en: {
      toolbar_language: "Language",
      toolbar_reset_language: "Reset language",
      toolbar_accessibility: "Accessibility",
      toolbar_reset_accessibility: "Reset accessibility",
      toolbar_contrast: "High contrast",
      toolbar_readable: "Readable font",

      nav_projects: "Projects",
      nav_skills: "Skills",
      nav_certificates: "Certificates",
      nav_contact: "Contact",

      hero_role: "UX/UI Designer",
      hero_title: "I design clear, accessible, and results-driven digital experiences",
      hero_sub: "I turn ideas into functional solutions through research, prototyping, and visual design—creating products that connect with people and add value to the business.",
      hero_cta: "Download CV",

      projects_title: "Featured projects",
      skills_title: "Skills & technologies",
      cert_title: "Certificates",
      contact_title: "Contact",
      contact_email_label: "Email:",

      btn_access: "Open",
      btn_case: "Case study",
      btn_certificate: "View certificate",

      footer_text: "Santiago Murillo Portfolio",

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

      project_bon_desc: "High-fidelity wireframes for an e-commerce platform, focused on visual hierarchy and conversion.",
      project_green_desc: "iOS mobile prototype based on usability principles, intuitive navigation, and a mobile-first approach.",
      project_nutri_desc: "Experience design for a virtual reality environment focused on nutrition education and immersive interaction.",
      project_iso_desc: "Desktop prototype focused on accessibility, clear reading, and inclusive navigation for diverse users.",

      tag_wireframes: "Wireframes",
      tag_ecommerce: "E-commerce",
      tag_uxui: "UX/UI",
      tag_ios: "iOS",
      tag_prototyping: "Prototyping",
      tag_ux: "UX",
      tag_prototype: "Prototype",
      tag_desktop: "Desktop",
      tag_accessibility: "Accessibility",

      donut_uxui: "UX/UI",
      donut_docs: "Documentation",
      donut_front: "Frontend",
      donut_motion: "Motion",
      donut_prod: "Production"
    }
  };

  // ✅ aplica traducciones
  function setLanguage(lang){
    const dict = translations[lang] || translations.es;

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      if(dict[key]) el.textContent = dict[key];
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      if(dict[key]) el.setAttribute("placeholder", dict[key]);
    });

    document.querySelectorAll(".lang-btn").forEach(btn => btn.classList.remove("is-active"));
    document.querySelector(`.lang-btn[data-lang="${lang}"]`)?.classList.add("is-active");

    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;

    updateDonutLanguage(dict);

    closeAllDropdowns();
  }

  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });

  document.getElementById("resetLang")?.addEventListener("click", () => {
    setLanguage("es");
  });

  const savedLang = localStorage.getItem("lang") || "es";
  setLanguage(savedLang);


  // ======================================
  // 5) DONUT CHART + TOOLTIP TRADUCIBLE
  // ======================================
  const canvas = document.getElementById("skillsDonut");
  const tooltip = document.getElementById("donutTooltip");
  const showAllBtn = document.getElementById("showAll");

  let chart;
  let currentDict = translations[savedLang] || translations.es;

  const skills = [
    { key: "uxui", labelKey: "donut_uxui", value: 35, color: "#f39c12" },
    { key: "docs", labelKey: "donut_docs", value: 20, color: "#2ecc71" },
    { key: "front", labelKey: "donut_front", value: 15, color: "#3498db" },
    { key: "motion", labelKey: "donut_motion", value: 30, color: "#9b59b6" },
    { key: "prod", labelKey: "donut_prod", value: 10, color: "#e74c3c" }
  ];

  function labelsFromDict(dict){
    return skills.map(s => dict[s.labelKey] || "Skill");
  }

  function updateDonutLanguage(dict){
    currentDict = dict;
    if(chart){
      chart.data.labels = labelsFromDict(dict);
      chart.update();
    }
  }

  if (canvas && typeof Chart !== "undefined") {
    chart = new Chart(canvas, {
      type: "doughnut",
      data: {
        labels: labelsFromDict(currentDict),
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
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        }
      }
    });

    // Tooltip hover traducido
    canvas.addEventListener("mousemove", (e) => {
      const points = chart.getElementsAtEventForMode(e, "nearest", { intersect: true }, false);
      if (!points.length) {
        tooltip.style.opacity = "0";
        return;
      }

      const index = points[0].index;
      const s = skills[index];
      const label = currentDict[s.labelKey];
      tooltip.textContent = `${label} — ${s.value}%`;
      tooltip.style.background = s.color;
      tooltip.style.opacity = "1";

      const rect = canvas.getBoundingClientRect();
      tooltip.style.left = (e.clientX - rect.left) + "px";
      tooltip.style.top = (e.clientY - rect.top) + "px";
    });

    canvas.addEventListener("mouseleave", () => {
      tooltip.style.opacity = "0";
    });
  }


  // ======================================
  // 6) Animación Cards
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
