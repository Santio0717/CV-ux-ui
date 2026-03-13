document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const skills = {
    uxui: {
      label: "UX/UI",
      value: 35,
      color: "#2563eb",
      title: "UX/UI",
      description:
        "Diseño experiencias claras, intuitivas y accesibles, trabajando flujos, jerarquía visual, wireframes y prototipos centrados en el usuario.",
      tags: ["Figma", "Wireframes", "Prototipado", "Arquitectura IA", "UI", "Usabilidad"]
    },
    docs: {
      label: "Documentación",
      value: 20,
      color: "#22c55e",
      title: "Documentación",
      description:
        "Organizo procesos, decisiones y hallazgos para dar claridad al proyecto y facilitar la comunicación entre diseño, producto y desarrollo.",
      tags: ["Benchmark", "Insights", "Briefs", "Requisitos", "Casos de estudio", "Research notes"]
    },
    front: {
      label: "Frontend",
      value: 15,
      color: "#0ea5e9",
      title: "Frontend",
      description:
        "Cuento con bases para construir interfaces web funcionales y comprender mejor la relación entre diseño, interacción y desarrollo.",
      tags: ["HTML", "CSS", "JavaScript", "Responsive", "Interacción", "UI implementation"]
    },
    motion: {
      label: "Motion",
      value: 20,
      color: "#a855f7",
      title: "Motion",
      description:
        "Utilizo movimiento para reforzar narrativa visual, feedback y continuidad, cuidando que cada animación tenga intención y no distraiga.",
      tags: ["After Effects", "Microinteracciones", "Narrativa visual", "Timing", "Feedback"]
    },
    prod: {
      label: "Producción",
      value: 10,
      color: "#f97316",
      title: "Producción",
      description:
        "Complemento el diseño con herramientas visuales y de contenido para presentar proyectos de forma coherente, atractiva y mejor comunicada.",
      tags: ["Photoshop", "Illustrator", "Premiere", "Contenido visual", "Edición"]
    }
  };

  const fullProfile = {
    title: "Perfil completo",
    description:
      "Un vistazo rápido a las áreas que conectan estrategia, diseño, interacción y ejecución dentro de mi trabajo.",
    tags: ["UX/UI", "Documentación", "Frontend", "Motion", "Producción"]
  };

  const techTitle = document.getElementById("techTitle");
  const techDescription = document.getElementById("techDescription");
  const techTags = document.getElementById("techTags");
  const techPanel = document.querySelector(".tech-panel");

  function renderTechPanel(data) {
    if (techTitle) techTitle.textContent = data.title;
    if (techDescription) techDescription.textContent = data.description;

    if (techTags) {
      techTags.innerHTML = "";
      data.tags.forEach((tag, index) => {
        const span = document.createElement("span");
        span.className = "tag tag-enter";
        span.textContent = tag;
        span.style.setProperty("--tag-delay", `${index * 45}ms`);
        techTags.appendChild(span);
      });
    }
  }

  function animateTechPanelUpdate(data) {
    if (!techPanel || prefersReducedMotion) {
      renderTechPanel(data);
      return;
    }

    techPanel.classList.remove("panel-anim-in");
    techPanel.classList.add("panel-anim-out");

    window.setTimeout(() => {
      renderTechPanel(data);
      techPanel.classList.remove("panel-anim-out");
      techPanel.classList.add("panel-anim-in");
    }, 160);
  }

  renderTechPanel(fullProfile);

  const canvas = document.getElementById("skillsDonut");
  const wrapper = canvas?.closest(".donut-wrapper");
  const tooltip = document.getElementById("donutTooltip");

  if (canvas && window.Chart) {
    const keys = Object.keys(skills);
    const labels = keys.map((key) => skills[key].label);
    const values = keys.map((key) => skills[key].value);
    const baseColors = keys.map((key) => skills[key].color);

    let selectedIndex = null;

    function hexToRgba(hex, alpha = 1) {
      const clean = hex.replace("#", "");
      const full = clean.length === 3
        ? clean.split("").map((char) => char + char).join("")
        : clean;

      const num = parseInt(full, 16);
      const r = (num >> 16) & 255;
      const g = (num >> 8) & 255;
      const b = num & 255;

      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    const chart = new Chart(canvas, {
      type: "doughnut",
      data: {
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: (context) => {
              const index = context.dataIndex;
              const base = baseColors[index];
              if (selectedIndex === null) return base;
              return index === selectedIndex ? base : hexToRgba(base, 0.18);
            },
            borderWidth: 0,
            spacing: 4,
            offset: (context) => {
              const index = context.dataIndex;
              if (selectedIndex === null) return 0;
              return index === selectedIndex ? 10 : 0;
            },
            hoverOffset: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "76%",
        rotation: -90,
        circumference: 360,
        animation: {
          duration: prefersReducedMotion ? 0 : 520,
          easing: "easeOutCubic",
          animateRotate: true,
          animateScale: false
        },
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        }
      }
    });

    function hideTooltip() {
      if (!tooltip) return;
      tooltip.style.opacity = "0";
      tooltip.style.transform = "translate(-50%, -120%) scale(.96)";
    }

    function showTooltipAtArc(index) {
      if (!tooltip || !wrapper) return;

      const arc = chart.getDatasetMeta(0).data[index];
      if (!arc) return;

      const skill = skills[keys[index]];
      const point = arc.tooltipPosition();

      const canvasRect = canvas.getBoundingClientRect();
      const wrapperRect = wrapper.getBoundingClientRect();

      const left = point.x + (canvasRect.left - wrapperRect.left);
      const top = point.y + (canvasRect.top - wrapperRect.top);

      tooltip.textContent = `${skill.label} — ${skill.value}%`;
      tooltip.style.background = skill.color;
      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
      tooltip.style.opacity = "1";
      tooltip.style.transform = "translate(-50%, -120%) scale(1)";
    }

    function setActiveButton(key = null) {
      document.querySelectorAll(".tech-btn").forEach((button) => {
        button.classList.remove("is-active");
      });

      if (key) {
        document.querySelector(`.tech-btn[data-key="${key}"]`)?.classList.add("is-active");
      } else {
        document.getElementById("showAll")?.classList.add("is-active");
      }
    }

    function selectIndex(index) {
      selectedIndex = index;
      chart.setActiveElements([{ datasetIndex: 0, index }]);
      chart.update();
      hideTooltip();

      const key = keys[index];
      animateTechPanelUpdate(skills[key]);
      setActiveButton(key);
    }

    function clearSelection() {
      selectedIndex = null;
      chart.setActiveElements([]);
      chart.update();
      hideTooltip();
      animateTechPanelUpdate(fullProfile);
      setActiveButton(null);
    }

    canvas.addEventListener("mousemove", (event) => {
      const points = chart.getElementsAtEventForMode(
        event,
        "nearest",
        { intersect: true },
        true
      );

      if (!points.length) {
        hideTooltip();
        return;
      }

      const hoverIndex = points[0].index;

      if (selectedIndex !== null && hoverIndex !== selectedIndex) {
        hideTooltip();
        return;
      }

      showTooltipAtArc(hoverIndex);
    });

    canvas.addEventListener("mouseleave", hideTooltip);

    canvas.addEventListener("click", (event) => {
      const points = chart.getElementsAtEventForMode(
        event,
        "nearest",
        { intersect: true },
        true
      );

      if (!points.length) return;
      selectIndex(points[0].index);
    });

    document.querySelectorAll(".tech-btn[data-key]").forEach((button) => {
      button.addEventListener("click", () => {
        const index = keys.indexOf(button.dataset.key);
        if (index !== -1) selectIndex(index);
      });
    });

    document.getElementById("showAll")?.addEventListener("click", clearSelection);

    clearSelection();
  }

  const revealItems = [
    ...document.querySelectorAll(".card, .section-title, .section-intro, .hero-focus, .process-node")
  ];

  revealItems.forEach((item, index) => {
    item.style.setProperty("--reveal-delay", `${Math.min(index * 35, 260)}ms`);
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const processObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry, entryIndex) => {
        if (!entry.isIntersecting) return;

        const target = entry.target;
        window.setTimeout(() => {
          target.classList.add("is-visible");
        }, entryIndex * 90);

        observer.unobserve(target);
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  document.querySelectorAll(".process-node").forEach((node) => processObserver.observe(node));

  const sections = [...document.querySelectorAll("main section[id], section[id]")];
  const navLinks = [...document.querySelectorAll(".main-nav a")];

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle("is-current", link.getAttribute("href") === `#${id}`);
        });
      });
    },
    {
      rootMargin: "-35% 0px -50% 0px",
      threshold: 0.01
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  const heroCard = document.getElementById("heroCard");
  const heroVisual = document.querySelector(".hero-visual");
  const heroCopy = document.querySelector(".hero-copy");

  if (heroCard && !prefersReducedMotion) {
    requestAnimationFrame(() => {
      heroCard.classList.add("hero-ready");
      heroVisual?.classList.add("hero-part-visible");
      heroCopy?.classList.add("hero-part-visible");
    });
  } else {
    heroCard?.classList.add("hero-ready");
    heroVisual?.classList.add("hero-part-visible");
    heroCopy?.classList.add("hero-part-visible");
  }

  if (canHover) {
    const hoverCards = document.querySelectorAll(".card, .hero-card");

    hoverCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.classList.add("is-hovered");
      });

      card.addEventListener("mouseleave", () => {
        card.classList.remove("is-hovered");
        card.style.removeProperty("--mx");
        card.style.removeProperty("--my");
      });

      card.addEventListener("mousemove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        card.style.setProperty("--mx", `${x}%`);
        card.style.setProperty("--my", `${y}%`);
      });
    });
  }
});
