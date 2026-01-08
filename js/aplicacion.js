document.addEventListener("DOMContentLoaded", () => {

  /* ======================================
    FOOTER YEAR
  ====================================== */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ======================================
    DROPDOWNS
  ====================================== */
  const langDropdown = document.getElementById("langDropdown");
  const a11yDropdown = document.getElementById("a11yDropdown");

  function closeAllDropdowns(){
    document.querySelectorAll(".dropdown.open").forEach(d => d.classList.remove("open"));
    document.querySelectorAll(".drop-btn").forEach(btn => btn.setAttribute("aria-expanded", "false"));
  }

  function toggleDropdown(drop){
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

  document.addEventListener("click", () => closeAllDropdowns());
  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape") closeAllDropdowns();
  });

  /* ======================================
    ACCESIBILIDAD
  ====================================== */
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
    document.body.classList.toggle("high-contrast", contrast);
    document.body.classList.toggle("readable-font", readable);
    localStorage.setItem("fontSize", fontSize);
    localStorage.setItem("contrast", contrast);
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

  /* ======================================
    TRADUCCIONES COMPLETAS
  ====================================== */
  const translations = {
    es:{
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
      projects_title:"Proyectos destacados",
      skills_title:"Tecnologías y habilidades",
      cert_title:"Certificados",
      contact_title:"Contacto",
      contact_email_label:"Email:",
      skill_uxui:"UX/UI",
      skill_docs:"Documentación",
      skill_front:"Frontend",
      skill_motion:"Motion",
      skill_prod:"Producción",
      skill_all:"Perfil completo",
      tag_wireframes:"Wireframes",
      tag_ecommerce:"E-commerce",
      tag_uxui:"UX/UI"
    },

    en:{
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
      projects_title:"Featured projects",
      skills_title:"Skills & technologies",
      cert_title:"Certificates",
      contact_title:"Contact",
      contact_email_label:"Email:",
      skill_uxui:"UX/UI",
      skill_docs:"Documentation",
      skill_front:"Frontend",
      skill_motion:"Motion",
      skill_prod:"Production",
      skill_all:"Full profile",
      tag_wireframes:"Wireframes",
      tag_ecommerce:"E-commerce",
      tag_uxui:"UX/UI"
    },

    fr:{
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
      projects_title:"Projets en vedette",
      skills_title:"Compétences et technologies",
      cert_title:"Certificats",
      contact_title:"Contact",
      contact_email_label:"Email :",
      skill_uxui:"UX/UI",
      skill_docs:"Documentation",
      skill_front:"Frontend",
      skill_motion:"Motion",
      skill_prod:"Production",
      skill_all:"Profil complet",
      tag_wireframes:"Wireframes",
      tag_ecommerce:"E-commerce",
      tag_uxui:"UX/UI"
    },

    pt:{
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
      projects_title:"Projetos em destaque",
      skills_title:"Tecnologias e habilidades",
      cert_title:"Certificados",
      contact_title:"Contato",
      contact_email_label:"Email:",
      skill_uxui:"UX/UI",
      skill_docs:"Documentação",
      skill_front:"Frontend",
      skill_motion:"Motion",
      skill_prod:"Produção",
      skill_all:"Perfil completo",
      tag_wireframes:"Wireframes",
      tag_ecommerce:"E-commerce",
      tag_uxui:"UX/UI"
    },

    de:{
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
      projects_title:"Ausgewählte Projekte",
      skills_title:"Fähigkeiten und Technologien",
      cert_title:"Zertifikate",
      contact_title:"Kontakt",
      contact_email_label:"E-Mail:",
      skill_uxui:"UX/UI",
      skill_docs:"Dokumentation",
      skill_front:"Frontend",
      skill_motion:"Motion",
      skill_prod:"Produktion",
      skill_all:"Vollständiges Profil",
      tag_wireframes:"Wireframes",
      tag_ecommerce:"E-commerce",
      tag_uxui:"UX/UI"
    },

    zh:{
      toolbar_language:"语言",
      toolbar_reset_language:"重置语言",
      toolbar_accessibility:"无障碍",
      toolbar_reset_accessibility:"重置无障碍",
      toolbar_contrast:"高对比度",
      toolbar_readable:"易读字体",
      nav_projects:"项目",
      nav_skills:"技能",
      nav_certificates:"证书",
      nav_contact:"联系",
      projects_title:"精选项目",
      skills_title:"技能与技术",
      cert_title:"证书",
      contact_title:"联系",
      contact_email_label:"邮箱：",
      skill_uxui:"UX/UI",
      skill_docs:"文档",
      skill_front:"前端",
      skill_motion:"动效",
      skill_prod:"制作",
      skill_all:"完整档案",
      tag_wireframes:"线框图",
      tag_ecommerce:"电商",
      tag_uxui:"UX/UI"
    }
  };

  let currentLang = localStorage.getItem("lang") || "es";

  function setLanguage(lang){
    currentLang = lang;
    const dict = translations[lang] || translations.es;

    document.querySelectorAll("[data-i18n]").forEach(el=>{
      const key = el.dataset.i18n;
      if(dict[key]) el.textContent = dict[key];
    });

    document.querySelectorAll(".lang-btn").forEach(btn => btn.classList.remove("is-active"));
    document.querySelector(`.lang-btn[data-lang="${lang}"]`)?.classList.add("is-active");

    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;

    closeAllDropdowns();
  }

  document.querySelectorAll(".lang-btn").forEach(btn=>{
    btn.addEventListener("click", ()=> setLanguage(btn.dataset.lang));
  });

  document.getElementById("resetLang")?.addEventListener("click", ()=>{
    localStorage.setItem("lang","es");
    setLanguage("es");
  });

  setLanguage(currentLang);

  /* ======================================
    DONUT TOOLTIP RESTAURADO
  ====================================== */
  const canvas = document.getElementById("skillsDonut");
  const tooltip = document.getElementById("donutTooltip");

  if(canvas && tooltip && typeof Chart !== "undefined"){
    const skills = [
      { key:"uxui", value:35, color:"#f39c12" },
      { key:"docs", value:20, color:"#2ecc71" },
      { key:"front", value:15, color:"#3498db" },
      { key:"motion", value:30, color:"#9b59b6" },
      { key:"prod", value:10, color:"#e74c3c" }
    ];

    const chart = new Chart(canvas,{
      type:"doughnut",
      data:{
        labels: skills.map(s=>s.key),
        datasets:[{
          data: skills.map(s=>s.value),
          backgroundColor: skills.map(s=>s.color),
          borderWidth:0
        }]
      },
      options:{
        cutout:"68%",
        plugins:{ legend:{display:false}, tooltip:{enabled:false} }
      }
    });

    function showTooltip(text, x, y, color){
      tooltip.textContent = text;
      tooltip.style.left = x + "px";
      tooltip.style.top = y + "px";
      tooltip.style.background = color;
      tooltip.style.opacity = "1";
    }
    function hideTooltip(){ tooltip.style.opacity = "0"; }

    canvas.addEventListener("mousemove", (e)=>{
      const points = chart.getElementsAtEventForMode(e,"nearest",{intersect:true},true);
      if(!points.length){ hideTooltip(); return; }

      const index = points[0].index;
      const skill = skills[index];
      const rect = canvas.getBoundingClientRect();

      const labelKey = "skill_" + skill.key;
      const label = (translations[currentLang]?.[labelKey]) || skill.key.toUpperCase();

      showTooltip(`${label} — ${skill.value}%`, e.clientX - rect.left, e.clientY - rect.top, skill.color);
    });

    canvas.addEventListener("mouseleave", hideTooltip);
  }

});
