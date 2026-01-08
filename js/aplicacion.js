document.addEventListener("DOMContentLoaded", () => {

  // ==============================
  // Año footer
  // ==============================
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // ==============================
  // ACCESIBILIDAD: tamaño de letra
  // ==============================
  const fontMinus = document.getElementById("fontMinus");
  const fontPlus = document.getElementById("fontPlus");
  const fontReset = document.getElementById("fontReset");

  let fontSize = parseInt(localStorage.getItem("fontSize")) || 16;

  function applyFontSize(){
    document.documentElement.style.fontSize = fontSize + "px";
    localStorage.setItem("fontSize", fontSize);
  }

  if (fontPlus && fontMinus && fontReset) {
    fontPlus.addEventListener("click", () => {
      fontSize = Math.min(fontSize + 2, 22);
      applyFontSize();
    });

    fontMinus.addEventListener("click", () => {
      fontSize = Math.max(fontSize - 2, 14);
      applyFontSize();
    });

    fontReset.addEventListener("click", () => {
      fontSize = 16;
      applyFontSize();
    });

    applyFontSize();
  }

  // ==============================
  // TRADUCCIONES COMPLETAS
  // ==============================
  const translations = {

    es: {
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
      tag_retouch: "Retoque"
    },

    en: {
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
      tag_retouch: "Retouching"
    },

    fr: {
      nav_projects: "Projets",
      nav_skills: "Compétences",
      nav_certificates: "Certificats",
      nav_contact: "Contact",

      hero_role: "Designer UX/UI",
      hero_title: "Je conçois des expériences numériques claires, accessibles et orientées résultats",
      hero_sub: "Je transforme des idées en solutions fonctionnelles grâce à la recherche, au prototypage et au design visuel, en créant des produits qui connectent avec les personnes et apportent de la valeur.",
      hero_cta: "Télécharger CV",

      projects_title: "Projets en vedette",
      skills_title: "Compétences & technologies",
      cert_title: "Certificats",
      contact_title: "Contact",

      btn_access: "Accéder",
      btn_case: "Étude de cas",
      btn_certificate: "Voir le certificat",

      footer_text: "Portfolio de Santiago Murillo",

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

      project_bon_desc: "Wireframes haute fidélité pour une plateforme e-commerce, centrés sur la hiérarchie visuelle et la conversion.",
      project_green_desc: "Prototype mobile iOS basé sur des principes d’utilisabilité, une navigation intuitive et une approche mobile-first.",
      project_nutri_desc: "Conception d’expérience pour un environnement VR axé sur l’éducation nutritionnelle et l’interaction immersive.",
      project_iso_desc: "Prototype desktop axé sur l’accessibilité, la lisibilité et une navigation inclusive pour différents utilisateurs.",

      tag_english: "Anglais",
      tag_webdesign: "Design web",
      tag_prototyping: "Prototypage",
      tag_requirements: "Exigences",
      tag_innovation: "Innovation",
      tag_validation: "Validation",
      tag_prototypes: "Prototypes",
      tag_graphicdesign: "Design graphique",
      tag_illustration: "Illustration",
      tag_editing: "Édition",
      tag_retouch: "Retouche"
    },

    pt: {
      nav_projects: "Projetos",
      nav_skills: "Tecnologias",
      nav_certificates: "Certificados",
      nav_contact: "Contato",

      hero_role: "Designer UX/UI",
      hero_title: "Eu crio experiências digitais claras, acessíveis e focadas em resultados",
      hero_sub: "Transformo ideias em soluções funcionais por meio de pesquisa, prototipação e design visual, criando produtos que se conectam com as pessoas e geram valor para o negócio.",
      hero_cta: "Baixar CV",

      projects_title: "Projetos em destaque",
      skills_title: "Tecnologias e habilidades",
      cert_title: "Certificados",
      contact_title: "Contato",

      btn_access: "Acessar",
      btn_case: "Estudo de caso",
      btn_certificate: "Ver certificado",

      footer_text: "Portfólio de Santiago Murillo",

      skill_uxui: "UX/UI",
      skill_docs: "Documentação",
      skill_front: "Frontend",
      skill_motion: "Motion",
      skill_prod: "Produção",
      skill_all: "Perfil completo",

      contact_form_title: "Escreva para mim",
      contact_send: "Enviar",
      contact_name: "Nome",
      contact_email: "Email",
      contact_msg: "Mensagem",

      project_bon_desc: "Wireframes de alta fidelidade para uma plataforma de e-commerce, com foco em hierarquia visual e conversão.",
      project_green_desc: "Protótipo móvel iOS baseado em princípios de usabilidade, navegação intuitiva e abordagem mobile-first.",
      project_nutri_desc: "Design de experiência para um ambiente de realidade virtual focado em educação nutricional e interação imersiva.",
      project_iso_desc: "Protótipo desktop focado em acessibilidade, leitura clara e navegação inclusiva para usuários diversos.",

      tag_english: "Inglês",
      tag_webdesign: "Design web",
      tag_prototyping: "Prototipação",
      tag_requirements: "Requisitos",
      tag_innovation: "Inovação",
      tag_validation: "Validação",
      tag_prototypes: "Protótipos",
      tag_graphicdesign: "Design gráfico",
      tag_illustration: "Ilustração",
      tag_editing: "Edição",
      tag_retouch: "Retoque"
    },

    de: {
      nav_projects: "Projekte",
      nav_skills: "Fähigkeiten",
      nav_certificates: "Zertifikate",
      nav_contact: "Kontakt",

      hero_role: "UX/UI Designer",
      hero_title: "Ich gestalte klare, barrierefreie und ergebnisorientierte digitale Erlebnisse",
      hero_sub: "Ich verwandle Ideen durch Research, Prototyping und visuelles Design in funktionale Lösungen—und entwickle Produkte, die Menschen verbinden und geschäftlichen Mehrwert schaffen.",
      hero_cta: "Lebenslauf herunterladen",

      projects_title: "Ausgewählte Projekte",
      skills_title: "Fähigkeiten & Technologien",
      cert_title: "Zertifikate",
      contact_title: "Kontakt",

      btn_access: "Öffnen",
      btn_case: "Fallstudie",
      btn_certificate: "Zertifikat ansehen",

      footer_text: "Portfolio von Santiago Murillo",

      skill_uxui: "UX/UI",
      skill_docs: "Dokumentation",
      skill_front: "Frontend",
      skill_motion: "Motion",
      skill_prod: "Produktion",
      skill_all: "Vollständiges Profil",

      contact_form_title: "Schreib mir",
      contact_send: "Senden",
      contact_name: "Name",
      contact_email: "E-Mail",
      contact_msg: "Nachricht",

      project_bon_desc: "High-Fidelity-Wireframes für eine E-Commerce-Plattform mit Fokus auf visueller Hierarchie und Conversion.",
      project_green_desc: "iOS-Mobilprototyp basierend auf Usability-Prinzipien, intuitiver Navigation und Mobile-First-Ansatz.",
      project_nutri_desc: "Experience Design für eine VR-Umgebung mit Fokus auf Ernährungserziehung und immersiver Interaktion.",
      project_iso_desc: "Desktop-Prototyp mit Fokus auf Barrierefreiheit, klare Lesbarkeit und inklusive Navigation.",

      tag_english: "Englisch",
      tag_webdesign: "Webdesign",
      tag_prototyping: "Prototyping",
      tag_requirements: "Anforderungen",
      tag_innovation: "Innovation",
      tag_validation: "Validierung",
      tag_prototypes: "Prototypen",
      tag_graphicdesign: "Grafikdesign",
      tag_illustration: "Illustration",
      tag_editing: "Bearbeitung",
      tag_retouch: "Retusche"
    },

    zh: {
      nav_projects: "项目",
      nav_skills: "技能",
      nav_certificates: "证书",
      nav_contact: "联系",

      hero_role: "UX/UI 设计师",
      hero_title: "我设计清晰、无障碍且以结果为导向的数字体验",
      hero_sub: "我通过研究、原型设计与视觉设计将想法转化为可落地的解决方案，打造能够与用户产生连接并为业务创造价值的产品。",
      hero_cta: "下载简历",

      projects_title: "精选项目",
      skills_title: "技能与技术",
      cert_title: "证书",
      contact_title: "联系",

      btn_access: "打开",
      btn_case: "案例研究",
      btn_certificate: "查看证书",

      footer_text: "Santiago Murillo 作品集",

      skill_uxui: "UX/UI",
      skill_docs: "文档",
      skill_front: "前端",
      skill_motion: "动效",
      skill_prod: "制作",
      skill_all: "完整档案",

      contact_form_title: "给我留言",
      contact_send: "发送",
      contact_name: "姓名",
      contact_email: "邮箱",
      contact_msg: "消息",

      project_bon_desc: "为电商平台设计高保真线框图，专注于视觉层级与转化。",
      project_green_desc: "基于可用性原则、直观导航与移动优先理念的 iOS 移动原型。",
      project_nutri_desc: "为虚拟现实环境设计体验，聚焦营养教育与沉浸式交互。",
      project_iso_desc: "桌面端原型，聚焦无障碍、清晰阅读与包容性导航。",

      tag_english: "英语",
      tag_webdesign: "网页设计",
      tag_prototyping: "原型设计",
      tag_requirements: "需求",
      tag_innovation: "创新",
      tag_validation: "验证",
      tag_prototypes: "原型",
      tag_graphicdesign: "平面设计",
      tag_illustration: "插画",
      tag_editing: "编辑",
      tag_retouch: "修图"
    }
  };

  const langButtons = document.querySelectorAll(".lang-btn");

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

    // Cambiar atributo lang del HTML
    document.documentElement.lang = lang;
  }

  langButtons.forEach(btn=>{
    btn.addEventListener("click", ()=> setLanguage(btn.dataset.lang));
  });

  const savedLang = localStorage.getItem("lang") || "es";
  setLanguage(savedLang);

  // ==============================
  // DONUT CHART (Tecnologías)
  // ==============================
  const canvas = document.getElementById("skillsDonut");
  const wrapper = canvas?.closest(".donut-wrapper");
  const tooltip = document.getElementById("donutTooltip");
  const showAllBtn = document.getElementById("showAll");

  if (canvas && wrapper && tooltip && typeof Chart !== "undefined") {

    const skills = [
      { key: "uxui", label: "UX/UI", value: 35, color: "#f39c12" },
      { key: "docs", label: "Documentación", value: 20, color: "#2ecc71" },
      { key: "front", label: "Frontend", value: 15, color: "#3498db" },
      { key: "motion", label: "Motion", value: 30, color: "#9b59b6" },
      { key: "prod", label: "Producción", value: 10, color: "#e74c3c" }
    ];

    const remainderColor = "#e6e6e6";
    let mode = "all";
    let active = skills[0];
    let raf = null;

    const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

    function setTooltip({ text, x, y, bg }) {
      tooltip.textContent = text;
      tooltip.style.left = `${x}px`;
      tooltip.style.top = `${y}px`;
      tooltip.style.background = bg || "rgba(0,0,0,.9)";
      tooltip.style.opacity = "1";
    }

    function hideTooltip() {
      tooltip.style.opacity = "0";
    }

    function getArcPoint(chart, index) {
      const meta = chart.getDatasetMeta(0);
      const arc = meta?.data?.[index];
      if (!arc) return null;
      return arc.tooltipPosition();
    }

    function positionAboveArc(chart, index) {
      const p = getArcPoint(chart, index);
      if (!p) return null;

      const rect = canvas.getBoundingClientRect();
      const wRect = wrapper.getBoundingClientRect();

      return {
        x: p.x + (rect.left - wRect.left),
        y: p.y + (rect.top - wRect.top)
      };
    }

    function datasetAll() {
      return {
        labels: skills.map(s => s.label),
        datasets: [{
          data: skills.map(s => s.value),
          backgroundColor: skills.map(s => s.color),
          borderWidth: 0,
          hoverOffset: 6
        }]
      };
    }

    function datasetSingle(skill) {
      return {
        labels: [skill.label, "Resto"],
        datasets: [{
          data: [skill.value, 100 - skill.value],
          backgroundColor: [skill.color, remainderColor],
          borderWidth: 0,
          hoverOffset: 6
        }]
      };
    }

    const chart = new Chart(canvas, {
      type: "doughnut",
      data: datasetAll(),
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "68%",
        animation: { duration: 650, easing: "easeOutQuart" },
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        }
      }
    });

    function animateToSingle(skill) {
      mode = "single";
      active = skill;

      const target = skill.value;
      const start = chart.data.datasets[0].data?.[0] ?? 0;

      const t0 = performance.now();
      const duration = 520;

      const step = (t) => {
        const k = clamp((t - t0) / duration, 0, 1);
        const eased = 1 - Math.pow(1 - k, 3);
        const val = start + (target - start) * eased;

        chart.data = datasetSingle(skill);
        chart.data.datasets[0].data = [val, 100 - val];
        chart.update("none");

        if (k < 1) raf = requestAnimationFrame(step);
      };

      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(step);
    }

    function showAll() {
      mode = "all";
      chart.data = datasetAll();
      chart.update();
      hideTooltip();
    }

    function setActiveButton(btn) {
      document.querySelectorAll(".tech-btn").forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
    }

    document.querySelectorAll(".tech-btn[data-key]").forEach(btn => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.key;
        const s = skills.find(x => x.key === key);
        if (!s) return;

        setActiveButton(btn);
        animateToSingle(s);
        hideTooltip();
      });
    });

    if (showAllBtn) {
      showAllBtn.addEventListener("click", () => {
        setActiveButton(showAllBtn);
        showAll();
      });
    }

    function handleHover(evt) {
      const points = chart.getElementsAtEventForMode(
        evt,
        "nearest",
        { intersect: true },
        true
      );

      if (!points.length) {
        hideTooltip();
        return;
      }

      const { index } = points[0];

      if (mode === "single" && index === 1) {
        hideTooltip();
        return;
      }

      let text = "";
      let bg = "rgba(0,0,0,.9)";

      if (mode === "all") {
        const s = skills[index];
        if (!s) return hideTooltip();
        text = `${s.label} — ${s.value}%`;
        bg = s.color;
      } else {
        text = `${active.label} — ${active.value}%`;
        bg = active.color;
      }

      const pos = positionAboveArc(chart, index);
      if (!pos) return hideTooltip();

      setTooltip({ text, x: pos.x, y: pos.y, bg });
    }

    canvas.addEventListener("mousemove", handleHover);
    canvas.addEventListener("mouseleave", () => hideTooltip());

    showAll();
    if (showAllBtn) showAllBtn.classList.add("is-active");
  }

  // ==============================
  // Animación al aparecer (Cards)
  // ==============================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".card").forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.06}s`;
    observer.observe(card);
  });

});
