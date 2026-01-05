document.addEventListener("DOMContentLoaded", () => {

  // ==============================
  // Año footer
  // ==============================
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

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
