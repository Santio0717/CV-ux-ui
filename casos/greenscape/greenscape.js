document.addEventListener("DOMContentLoaded", () => {
  // Año footer
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const content = document.getElementById("case-content");
  const placeholder = document.getElementById("case-placeholder");
  const tabs = Array.from(document.querySelectorAll(".ux-tab[data-page]"));
  const pageTitleEl = document.querySelector(".case-title");
  const CASE_TITLE = (pageTitleEl?.textContent || "").trim().toLowerCase();

  if (!content || !tabs.length) {
    console.warn("No se encontró #case-content o .ux-tab[data-page].");
    return;
  }

  let userInteracted = false;
  let suggestionTimer = null;

  function showPlaceholder(){
    if (placeholder) placeholder.hidden = false;
    content.hidden = true;
    content.innerHTML = "";
  }

  function showContent(){
    if (placeholder) placeholder.hidden = true;
    content.hidden = false;
  }

  // Limpia duplicados si los HTML internos traen layout completo
  function sanitizeLoadedHTML(html){
    const temp = document.createElement("div");
    temp.innerHTML = html;

    // elimina cosas que no deben entrar al panel izquierdo
    temp.querySelectorAll("script, style, link, nav, header, footer").forEach(el => el.remove());

    // elimina componentes del layout principal si vinieran incluidos
    temp.querySelectorAll(".ux-tabs, .case-links, .preview-card, .case-title, .case-footer, .case-layout, .case-aside").forEach(el => el.remove());

    // elimina H1 siempre (evita repetir título)
    temp.querySelectorAll("h1").forEach(el => el.remove());

    // elimina H2/H3 que repitan el nombre del caso
    temp.querySelectorAll("h2, h3").forEach(el => {
      const t = (el.textContent || "").trim().toLowerCase();
      if (CASE_TITLE && t === CASE_TITLE) el.remove();
    });

    // si hay main, nos quedamos con eso
    const main = temp.querySelector("main") || temp;
    return main.innerHTML.trim();
  }

  async function loadPage(page) {
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

      const res = await fetch(page, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status} — ${page}`);

      const html = await res.text();
      const clean = sanitizeLoadedHTML(html);

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

  function setActiveTab(btn){
    tabs.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  }

  function activate(btn) {
    setActiveTab(btn);
    loadPage(btn.dataset.page);
  }

  function cancelSuggestion(){
    if (suggestionTimer) {
      clearTimeout(suggestionTimer);
      suggestionTimer = null;
    }
  }

  tabs.forEach(btn => {
    btn.addEventListener("click", () => {
      userInteracted = true;
      cancelSuggestion();
      activate(btn);
    });
  });

  // Inicio: placeholder visible
  showPlaceholder();

  // Auto-selección a los 15s SOLO si no hubo interacción
  suggestionTimer = setTimeout(() => {
    if (userInteracted) return;

    const uxResearchBtn =
      tabs.find(b => (b.textContent || "").trim().toLowerCase() === "ux research") || tabs[0];

    activate(uxResearchBtn);
  }, 15000);
});
