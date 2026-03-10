document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const skills = {
    uxui: {
      label: "UX/UI",
      value: 35,
      color: "#f39c12",
      title: "UX/UI",
      description: "Diseño experiencias claras, intuitivas y accesibles, trabajando flujos, jerarquía visual, wireframes y prototipos centrados en el usuario.",
      tags: ["Figma", "Wireframes", "Prototipado", "Arquitectura IA", "UI", "Usabilidad"]
    },
    docs: {
      label: "Documentación",
      value: 20,
      color: "#2ecc71",
      title: "Documentación",
      description: "Organizo procesos, decisiones y hallazgos para dar claridad al proyecto y facilitar la comunicación entre diseño, producto y desarrollo.",
      tags: ["Benchmark", "Insights", "Briefs", "Requisitos", "Casos de estudio", "Research notes"]
    },
    front: {
      label: "Frontend",
      value: 15,
      color: "#3498db",
      title: "Frontend",
      description: "Cuento con bases para construir interfaces web funcionales y comprender mejor la relación entre diseño, interacción y desarrollo.",
      tags: ["HTML", "CSS", "JavaScript", "Responsive", "Interacción", "UI implementation"]
    },
    motion: {
      label: "Motion",
      value: 20,
      color: "#9b59b6",
      title: "Motion",
      description: "Utilizo movimiento para mejorar narrativa visual, feedback e impacto, cuidando que cada animación tenga intención y no distraiga.",
      tags: ["After Effects", "Microinteracciones", "Narrativa visual", "Timing", "Feedback"]
    },
    prod: {
      label: "Producción",
      value: 10,
      color: "#e74c3c",
      title: "Producción",
      description: "Complemento el diseño con herramientas visuales y de contenido para presentar proyectos de forma coherente y atractiva.",
      tags: ["Photoshop", "Illustrator", "Premiere", "Contenido visual", "Edición"]
    }
  };

  const fullProfile = {
    title: "Perfil completo",
    description: "Selecciona un área para explorar herramientas, enfoque y fortalezas relacionadas con mi perfil.",
    tags: ["UX/UI", "Documentación", "Frontend", "Motion", "Producción"]
  };

  const techTitle = document.getElementById("techTitle");
  const techDescription = document.getElementById("techDescription");
  const techTags = document.getElementById("techTags");

  function renderTechPanel(data) {
    if (techTitle) techTitle.textContent = data.title;
    if (techDescription) techDescription.textContent = data.description;
    if (techTags) {
      techTags.innerHTML = "";
      data.tags.forEach(tag => {
        const span = document.createElement("span");
        span.className = "tag";
        span.textContent = tag;
        techTags.appendChild(span);
      });
    }
  }

  renderTechPanel(fullProfile);

  const canvas = document.getElementById("skillsDonut");
  const wrapper = canvas?.closest(".donut-wrapper");
  const tooltip = document.getElementById("donutTooltip");

  if (canvas && window.Chart) {
    const keys = Object.keys(skills);
    const labels = keys.map(k => skills[k].label);
    const values = keys.map(k => skills[k].value);
    const baseColors = keys.map(k => skills[k].color);

    const ROTATION_12 = -90;
    const CIRC_FULL = 360;
    let selectedIndex = null;

    function hexToRgba(hex, a = 1) {
      const h = hex.replace("#", "");
      const full = (h.length === 3) ? h.split("").map(c => c + c).join("") : h;
      const n = parseInt(full, 16);
      const r = (n >> 16) & 255;
      const g = (n >> 8) & 255;
      const b = n & 255;
      return `rgba(${r},${g},${b},${a})`;
    }

    const chart = new Chart(canvas, {
      type: "doughnut",
      data: {
        labels,
        datasets: [{
          data: values,
          backgroundColor: (ctx) => {
            const i = ctx.dataIndex;
            const base = baseColors[i];
            if (selectedIndex === null) return base;
            return (i === selectedIndex) ? base : hexToRgba(base, 0.22);
          },
          borderWidth: 0,
          spacing: 3,
          offset: (ctx) => {
            const i = ctx.dataIndex;
            if (selectedIndex === null) return 0;
            return (i === selectedIndex) ? 14 : 0;
          },
          hoverOffset: 10
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "74%",
        rotation: ROTATION_12,
        circumference: CIRC_FULL,
        animation: { duration: 260, animateRotate: false, animateScale: false },
        plugins: { legend: { display: false }, tooltip: { enabled: false } }
      }
    });

    function hideTooltip() {
      if (!tooltip) return;
      tooltip.style.opacity = "0";
    }

    function showTooltipAtArc(index) {
      if (!tooltip || !wrapper) return;

      const arc = chart.getDatasetMeta(0).data[index];
      if (!arc) return;

      const s = skills[keys[index]];
      const p = arc.tooltipPosition();

      const canvasRect = canvas.getBoundingClientRect();
      const wrapRect = wrapper.getBoundingClientRect();

      const left = p.x + (canvasRect.left - wrapRect.left);
      const top = p.y + (canvasRect.top - wrapRect.top);

      tooltip.textContent = `${s.label} — ${s.value}%`;
      tooltip.style.background = s.color;
      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
      tooltip.style.opacity = "1";
    }

    function selectIndex(i) {
      selectedIndex = i;
      chart.setActiveElements([{ datasetIndex: 0, index: i }]);
      chart.update();
      hideTooltip();

      const key = keys[i];
      renderTechPanel(skills[key]);

      document.querySelectorAll(".tech-btn").forEach(b => b.classList.remove("is-active"));
      document.querySelector(`.tech-btn[data-key="${key}"]`)?.classList.add("is-active");
    }

    function clearSelection() {
      selectedIndex = null;
      chart.setActiveElements([]);
      chart.update();
      hideTooltip();
      renderTechPanel(fullProfile);

      document.querySelectorAll(".tech-btn").forEach(b => b.classList.remove("is-active"));
      document.getElementById("showAll")?.classList.add("is-active");
    }

    canvas.addEventListener("mousemove", (evt) => {
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

      const hoverIndex = points[0].index;

      if (selectedIndex !== null && hoverIndex !== selectedIndex) {
        hideTooltip();
        return;
      }

      showTooltipAtArc(hoverIndex);
    });

    canvas.addEventListener("mouseleave", hideTooltip);

    document.querySelectorAll(".tech-btn[data-key]").forEach(btn => {
      btn.addEventListener("click", () => {
        const i = keys.indexOf(btn.dataset.key);
        if (i !== -1) selectIndex(i);
      });
    });

    document.getElementById("showAll")?.addEventListener("click", clearSelection);

    canvas.addEventListener("click", (evt) => {
      const points = chart.getElementsAtEventForMode(evt, "nearest", { intersect: true }, true);
      if (!points.length) return;
      selectIndex(points[0].index);
    });

    clearSelection();
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".card").forEach(card => revealObserver.observe(card));

  const sections = [...document.querySelectorAll("main section[id], section[id]")];
  const navLinks = [...document.querySelectorAll(".main-nav a")];

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle("is-current", link.getAttribute("href") === `#${id}`);
      });
    });
  }, { rootMargin: "-35% 0px -50% 0px", threshold: 0.01 });

  sections.forEach(section => sectionObserver.observe(section));

  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (canHover) {
    document.querySelectorAll(".card, .hero-card").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;

        const rx = (0.5 - py) * 6;
        const ry = (px - 0.5) * 8;

        if (el.classList.contains("card") && !el.classList.contains("is-visible")) return;
        el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
      });

      el.addEventListener("mouseleave", () => {
        if (el.classList.contains("card") && !el.classList.contains("is-visible")) {
          el.style.transform = "";
          return;
        }
        el.style.transform = "";
      });
    });
  }

  const heroCard = document.getElementById("heroCard");
  const hero = document.getElementById("hero");

  function updateHeroParallax() {
    if (!heroCard || !hero) return;
    const rect = hero.getBoundingClientRect();
    const offset = Math.max(-30, Math.min(30, rect.top * -0.06));
    heroCard.style.backgroundPosition = `center ${offset}px`;
  }

  updateHeroParallax();
  window.addEventListener("scroll", updateHeroParallax, { passive: true });
});
