document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const content = document.getElementById("case-content");
  const placeholder = document.getElementById("case-placeholder");
  const tabs = Array.from(document.querySelectorAll(".ux-tab[data-page]"));
  const pageTitleEl = document.querySelector(".case-title");
  const progressBar = document.getElementById("tab-progress-bar");
  const progressWrap = document.getElementById("tab-progress");
  const CASE_TITLE = (pageTitleEl?.textContent || "").trim().toLowerCase();

  if (!content || !tabs.length) {
    console.warn("No se encontró #case-content o .ux-tab[data-page].");
    return;
  }

  let userInteracted = false;
  let suggestionTimer = null;
  let autoplayInterval = null;
  let progressInterval = null;
  let currentRequest = 0;
  let autoIndex = 0;

  const INITIAL_DELAY = 10000;
  const ROTATION_DELAY = 7000;

  function showProgress() {
    if (progressWrap) progressWrap.hidden = false;
  }

  function hideProgress() {
    if (progressWrap) progressWrap.hidden = true;
  }

  function resetProgress() {
    if (progressBar) {
      progressBar.style.width = "0%";
    }
  }

  function animateProgress(duration) {
    if (!progressBar) return;

    clearInterval(progressInterval);
    progressBar.style.width = "0%";

    const start = Date.now();

    progressInterval = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = Math.min((elapsed / duration) * 100, 100);
      progressBar.style.width = `${percent}%`;

      if (percent >= 100) {
        clearInterval(progressInterval);
      }
    }, 50);
  }

  function showPlaceholder() {
    if (placeholder) placeholder.hidden = false;
    content.hidden = true;
    content.innerHTML = "";
  }

  function showContent() {
    if (placeholder) placeholder.hidden = true;
    content.hidden = false;
  }

  function setLoadingState() {
    showContent();
    content.innerHTML = `
      <div class="case-placeholder" style="margin-top:0;">
        <div class="placeholder-badge">Cargando</div>
        <h3>Abriendo sección</h3>
        <p>Estamos cargando el contenido seleccionado para mostrarte el proceso del proyecto.</p>
      </div>
    `;
  }

  function sanitizeLoadedHTML(html) {
    const temp = document.createElement("div");
    temp.innerHTML = html;

    temp.querySelectorAll("script, style, link, nav, header, footer").forEach(el => el.remove());
    temp.querySelectorAll(".ux-tabs, .case-links, .preview-card, .case-title, .case-footer, .case-layout, .case-aside").forEach(el => el.remove());

    temp.querySelectorAll("h1").forEach(el => el.remove());

    temp.querySelectorAll("h2, h3").forEach(el => {
      const t = (el.textContent || "").trim().toLowerCase();
      if (CASE_TITLE && t === CASE_TITLE) el.remove();
    });

    const main = temp.querySelector("main") || temp;
    return main.innerHTML.trim();
  }

  async function loadPage(page) {
    const requestId = ++currentRequest;

    try {
      if (location.protocol === "file:") {
        showContent();
        content.innerHTML = `
          <p style="text-align:center; opacity:.85; line-height:1.6;">
            Estás abriendo esto en <strong>file://</strong>.<br>
            Para que funcionen las tabs, usa <strong>Live Server</strong> o súbelo a Netlify/GitHub Pages.
          </p>`;
        return;
      }

      setLoadingState();

      const res = await fetch(page, { cache: "no-store" });
      if (!res.ok) throw new Error(\`HTTP \${res.status} — \${page}\`);

      const html = await res.text();
      const clean = sanitizeLoadedHTML(html);

      if (requestId !== currentRequest) return;

      showContent();
      content.innerHTML = clean || `
        <p style="text-align:center; opacity:.85;">
          Este apartado aún no tiene contenido.
        </p>`;
    } catch (err) {
      console.error(err);
      showContent();
      content.innerHTML = `
        <p style="text-align:center; opacity:.85; line-height:1.6;">
          No se pudo cargar <strong>${page}</strong>.<br>
          Revisa que el archivo exista y que el nombre coincida.
        </p>`;
    }
  }

  function setActiveTab(btn) {
    tabs.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  }

  function activate(btn) {
    setActiveTab(btn);
    loadPage(btn.dataset.page);
    autoIndex = tabs.indexOf(btn);
  }

  function stopAutoplay() {
    if (suggestionTimer) {
      clearTimeout(suggestionTimer);
      suggestionTimer = null;
    }

    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }

    if (progressInterval) {
      clearInterval(progressInterval);
      progressInterval = null;
    }

    resetProgress();
    hideProgress();
  }

  function startAutoplay() {
    showProgress();
    resetProgress();
    animateProgress(INITIAL_DELAY);

    suggestionTimer = setTimeout(() => {
      if (userInteracted) return;

      const uxResearchBtn =
        tabs.find(b => (b.textContent || "").trim().toLowerCase() === "ux research") || tabs[0];

      activate(uxResearchBtn);
      animateProgress(ROTATION_DELAY);

      autoplayInterval = setInterval(() => {
        if (userInteracted) {
          stopAutoplay();
          return;
        }

        autoIndex = (autoIndex + 1) % tabs.length;
        activate(tabs[autoIndex]);
        animateProgress(ROTATION_DELAY);
      }, ROTATION_DELAY);
    }, INITIAL_DELAY);
  }

  tabs.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      userInteracted = true;
      stopAutoplay();
      activate(btn);
    });

    btn.addEventListener("keydown", (event) => {
      const key = event.key;

      if (key === "ArrowRight" || key === "ArrowDown") {
        event.preventDefault();
        const next = tabs[(index + 1) % tabs.length];
        next.focus();
      }

      if (key === "ArrowLeft" || key === "ArrowUp") {
        event.preventDefault();
        const prev = tabs[(index - 1 + tabs.length) % tabs.length];
        prev.focus();
      }

      if (key === "Enter" || key === " ") {
        event.preventDefault();
        userInteracted = true;
        stopAutoplay();
        activate(btn);
      }
    });
  });

  showPlaceholder();
  startAutoplay();
});
