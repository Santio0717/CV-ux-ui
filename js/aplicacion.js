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

  if(fontPlus){
    fontPlus.addEventListener("click", () => {
      fontSize = Math.min(fontSize + 2, 22);
      applyA11y();
    });
  }

  if(fontMinus){
    fontMinus.addEventListener("click", () => {
      fontSize = Math.max(fontSize - 2, 14);
      applyA11y();
    });
  }

  if(toggleContrast){
    toggleContrast.addEventListener("change", () => {
      contrast = toggleContrast.checked;
      applyA11y();
    });
  }

  if(toggleReadable){
    toggleReadable.addEventListener("change", () => {
      readable = toggleReadable.checked;
      applyA11y();
    });
  }

  if(resetA11y){
    resetA11y.addEventListener("click", () => {
      fontSize = 16;
      contrast = false;
      readable = false;
      applyA11y();
      closeAllDropdowns();
    });
  }

  applyA11y();

  // ======================================
  // 4) TRADUCCIONES (IMPORTANTE)
  // ======================================
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

      contact_form_title:"Escríbeme",
      contact_send:"Enviar",
      contact_name:"Nombre",
      contact_email:"Email",
      contact_msg:"Mensaje",
      contact_email_label:"Email:"
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

      hero_role:"UX/UI Designer",
      hero_title:"I design clear, accessible, and results-driven digital experiences",
      hero_sub:"I turn ideas into functional solutions through research, prototyping, and visual design—creating products that connect with people and add value to the business.",
      hero_cta:"Download CV",

      projects_title:"Featured projects",
      skills_title:"Skills and technologies",
      cert_title:"Certificates",
      contact_title:"Contact",

      btn_access:"Open",
      btn_case:"Case study",
      btn_certificate:"View certificate",

      footer_text:"Santiago Murillo Portfolio",

      contact_form_title:"Write to me",
      contact_send:"Send",
      contact_name:"Name",
      contact_email:"Email",
      contact_msg:"Message",
      contact_email_label:"Email:"
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

      hero_role:"Designer UX/UI",
      hero_title:"Je conçois des expériences numériques claires, accessibles et orientées résultats",
      hero_sub:"Je transforme des idées en solutions fonctionnelles grâce à la recherche, au prototypage et au design visuel.",
      hero_cta:"Télécharger CV",

      projects_title:"Projets en vedette",
      skills_title:"Compétences et technologies",
      cert_title:"Certificats",
      contact_title:"Contact",

      btn_access:"Accéder",
      btn_case:"Étude de cas",
      btn_certificate:"Voir le certificat",

      footer_text:"Portfolio de Santiago Murillo",

      contact_form_title:"Écris-moi",
      contact_send:"Envoyer",
      contact_name:"Nom",
      contact_email:"Email",
      contact_msg:"Message",
      contact_email_label:"Email:"
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

      hero_role:"Designer UX/UI",
      hero_title:"Eu crio experiências digitais claras, acessíveis e focadas em resultados",
      hero_sub:"Transformo ideias em soluções funcionais com pesquisa, prototipação e design visual.",
      hero_cta:"Baixar CV",

      projects_title:"Projetos em destaque",
      skills_title:"Tecnologias e habilidades",
      cert_title:"Certificados",
      contact_title:"Contato",

      btn_access:"Acessar",
      btn_case:"Estudo de caso",
      btn_certificate:"Ver certificado",

      footer_text:"Portfólio de Santiago Murillo",

      contact_form_title:"Escreva para mim",
      contact_send:"Enviar",
      contact_name:"Nome",
      contact_email:"Email",
      contact_msg:"Mensagem",
      contact_email_label:"Email:"
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

      hero_role:"UX/UI Designer",
      hero_title:"Ich gestalte klare, barrierefreie und ergebnisorientierte digitale Erlebnisse",
      hero_sub:"Ich verwandle Ideen durch Research, Prototyping und visuelles Design in funktionale Lösungen.",
      hero_cta:"Lebenslauf herunterladen",

      projects_title:"Ausgewählte Projekte",
      skills_title:"Fähigkeiten und Technologien",
      cert_title:"Zertifikate",
      contact_title:"Kontakt",

      btn_access:"Öffnen",
      btn_case:"Fallstudie",
      btn_certificate:"Zertifikat ansehen",

      footer_text:"Portfolio von Santiago Murillo",

      contact_form_title:"Schreib mir",
      contact_send:"Senden",
      contact_name:"Name",
      contact_email:"E-Mail",
      contact_msg:"Nachricht",
      contact_email_label:"E-Mail:"
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

      hero_role:"UX/UI 设计师",
      hero_title:"我设计清晰、无障碍且以结果为导向的数字体验",
      hero_sub:"我通过研究、原型设计与视觉设计将想法转化为可落地的解决方案。",
      hero_cta:"下载简历",

      projects_title:"精选项目",
      skills_title:"技能与技术",
      cert_title:"证书",
      contact_title:"联系",

      btn_access:"打开",
      btn_case:"案例研究",
      btn_certificate:"查看证书",

      footer_text:"Santiago Murillo 作品集",

      contact_form_title:"给我留言",
      contact_send:"发送",
      contact_name:"姓名",
      contact_email:"邮箱",
      contact_msg:"消息",
      contact_email_label:"邮箱:"
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

    // actualizar tooltip para donut
    currentLang = lang;
  }

  langButtons.forEach(btn=>{
    btn.addEventListener("click", ()=> setLanguage(btn.dataset.lang));
  });

  if(resetLang){
    resetLang.addEventListener("click", ()=> setLanguage("es"));
  }

  let currentLang = localStorage.getItem("lang") || "es";
  setLanguage(currentLang);

  // ======================================
  // 5) DONUT CHART (Tooltip traducido)
  // ======================================
  const canvas = document.getElementById("skillsDonut");
  const tooltip = document.getElementById("donutTooltip");

  if(canvas && tooltip && typeof Chart !== "undefined"){

    const skillKeys = ["skill_uxui","skill_docs","skill_front","skill_motion","skill_prod"];

    const values = [35,20,15,30,10];
    const colors = ["#f39c12","#2ecc71","#3498db","#9b59b6","#e74c3c"];

    const chart = new Chart(canvas,{
      type:"doughnut",
      data:{
        labels:skillKeys.map(k=>translations[currentLang][k] || k),
        datasets:[{
          data:values,
          backgroundColor:colors,
          borderWidth:0,
          hoverOffset:6
        }]
      },
      options:{
        responsive:true,
        maintainAspectRatio:false,
        cutout:"68%",
        plugins:{
          legend:{display:false},
          tooltip:{enabled:false}
        }
      }
    });

    function updateLabels(){
      chart.data.labels = skillKeys.map(k=>translations[currentLang][k] || k);
      chart.update();
    }

    canvas.addEventListener("mousemove",(e)=>{
      const points = chart.getElementsAtEventForMode(e,"nearest",{intersect:true},true);
      if(!points.length){
        tooltip.style.opacity="0";
        return;
      }

      const idx = points[0].index;
      const label = chart.data.labels[idx];
      const value = values[idx];

      tooltip.textContent = `${label} — ${value}%`;
      tooltip.style.opacity="1";

      const rect = canvas.getBoundingClientRect();
      tooltip.style.left = (e.clientX - rect.left) + "px";
      tooltip.style.top = (e.clientY - rect.top) + "px";
      tooltip.style.background = colors[idx];
    });

    canvas.addEventListener("mouseleave",()=>{
      tooltip.style.opacity="0";
    });

    // cuando cambie idioma
    const originalSetLanguage = setLanguage;
    setLanguage = function(lang){
      originalSetLanguage(lang);
      updateLabels();
    }
  }

});
