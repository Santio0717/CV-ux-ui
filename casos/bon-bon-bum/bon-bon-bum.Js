document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("case-content");
  const placeholder = document.getElementById("case-placeholder");
  const tabs = Array.from(document.querySelectorAll(".ux-tab[data-page]"));
  const year = document.getElementById("year");
  const progressBar = document.getElementById("tab-progress-bar");
  const progressWrap = document.getElementById("tab-progress");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  if (!content || !tabs.length) return;

  let userInteracted = false;
  let suggestionTimer = null;
  let autoplayInterval = null;
  let progressInterval = null;
  let currentRequest = 0;
  let autoIndex = 0;

  const INITIAL_DELAY = 10000;
  const ROTATION_DELAY = 7000;

  function showProgress() {
    progressWrap?.classList.remove("hidden");
  }

  function hideProgress() {
    progressWrap?.classList.add("hidden");
  }

  function resetProgress() {
    if (progressBar) progressBar.style.width = "0%";
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

    temp
      .querySelectorAll("script, style, link, nav, header, footer")
      .forEach((el) => el.remove());

    temp
      .querySelectorAll(".ux-tabs, .case-links, .preview-card, .case-title, .case-header")
      .forEach((el) => el.remove());

    temp.querySelectorAll("h1").forEach((el) => el.remove());

    temp.querySelectorAll("h2").forEach((el) => {
      const text = (el.textContent || "").trim().toLowerCase();
      if (text === "bon bon bum") el.remove();
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
          <div class="case-placeholder" style="margin-top:0;">
            <div class="placeholder-badge">Atención</div>
            <h3>No se pueden cargar las tabs así</h3>
            <p>
              Estás en <strong>file://</strong>. Abre el proyecto con <strong>Live Server</strong>,
              Netlify o un servidor local para que funcionen correctamente.
            </p>
          </div>
        `;
        return;
      }

      setLoadingState();

      const res = await fetch(page, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const html = await res.text();
      const clean = sanitizeLoadedHTML(html);

      if (requestId !== currentRequest) return;

      showContent();
      content.innerHTML =
        clean ||
        `
          <div class="case-placeholder" style="margin-top:0;">
            <div class="placeholder-badge">Vacío</div>
            <h3>Este apartado aún no tiene contenido</h3>
            <p>Agrega información a este archivo para completar la fase del proyecto.</p>
          </div>
        `;
    } catch (err) {
      console.error(err);

      if (requestId !== currentRequest) return;

      showContent();
      content.innerHTML = `
        <div class="case-placeholder" style="margin-top:0;">
          <div class="placeholder-badge">Error</div>
          <h3>No se pudo cargar la sección</h3>
          <p>
            No se pudo cargar <strong>${page}</strong>. Revisa el nombre del archivo,
            la carpeta o si existe correctamente.
          </p>
        </div>
      `;
    }
  }

  function activate(btn) {
    tabs.forEach((tab) => tab.classList.remove("active"));
    btn.classList.add("active");
    loadPage(btn.dataset.page);
    autoIndex = tabs.indexOf(btn);
  }

  function stopAutoplay() {
    clearTimeout(suggestionTimer);
    clearInterval(autoplayInterval);
    clearInterval(progressInterval);

    suggestionTimer = null;
    autoplayInterval = null;
    progressInterval = null;

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
        tabs.find(
          (tab) => (tab.textContent || "").trim().toLowerCase() === "ux research"
        ) || tabs[0];

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
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      userInteracted = true;
      stopAutoplay();
      activate(btn);
    });

    btn.addEventListener("keydown", (event) => {
      const key = event.key;

      if (key === "ArrowRight" || key === "ArrowDown") {
        event.preventDefault();
        tabs[(index + 1) % tabs.length].focus();
      }

      if (key === "ArrowLeft" || key === "ArrowUp") {
        event.preventDefault();
        tabs[(index - 1 + tabs.length) % tabs.length].focus();
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
