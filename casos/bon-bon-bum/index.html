document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("case-content");
  const placeholder = document.getElementById("case-placeholder");
  const tabs = Array.from(document.querySelectorAll(".ux-tab[data-page]"));

  if (!content || !tabs.length) return;

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

  // ✅ Limpia duplicados si los archivos cargados vienen "sucios"
  function sanitizeLoadedHTML(html){
    const temp = document.createElement("div");
    temp.innerHTML = html;

    // elimina cosas que NUNCA deben entrar al panel izquierdo
    temp.querySelectorAll("script, style, link, nav, header, footer").forEach(el => el.remove());
    temp.querySelectorAll(".ux-tabs, .case-links, .preview-card, .case-title").forEach(el => el.remove());

    // quita H1/H2 repetidos tipo "Bon Bon Bum"
    temp.querySelectorAll("h1").forEach(el => el.remove());
    temp.querySelectorAll("h2").forEach(el => {
      if ((el.textContent || "").trim().toLowerCase() === "bon bon bum") el.remove();
    });

    // Si el archivo trae body/main, nos quedamos con el contenido útil
    const main = temp.querySelector("main") || temp;
    return main.innerHTML.trim();
  }

  async function loadPage(page) {
    try {
      if (location.protocol === "file:") {
        showContent();
        content.innerHTML = `
          <p style="text-align:center; opacity:.85;">
            Estás en <strong>file://</strong>. Abre con Live Server o Netlify para que funcionen las tabs.
          </p>`;
        return;
      }

      const res = await fetch(page, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

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
        <p style="text-align:center; opacity:.85;">
          No se pudo cargar <strong>${page}</strong>. Revisa el nombre del archivo y la carpeta.
        </p>`;
    }
  }

  function activate(btn) {
    tabs.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
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

  // ✅ Auto-selección a los 15s SOLO si no hubo interacción
  suggestionTimer = setTimeout(() => {
    if (userInteracted) return;

    const uxResearchBtn =
      tabs.find(b => (b.textContent || "").trim().toLowerCase() === "ux research") || tabs[0];

    activate(uxResearchBtn);
  }, 15000);
});
