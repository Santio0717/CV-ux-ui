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

  async function loadPage(page) {
    try {
      // ⚠️ fetch falla en file://
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
      showContent();
      content.innerHTML = html;

    } catch (err) {
      console.error(err);
      showContent();
      content.innerHTML = `
        <p style="text-align:center; opacity:.85;">
          No se pudo cargar <strong>${page}</strong>.
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

  // ✅ si el usuario hace click, cancelamos la sugerencia
  tabs.forEach(btn => {
    btn.addEventListener("click", () => {
      userInteracted = true;
      cancelSuggestion();
      activate(btn);
    });
  });

  // ✅ Inicio: vacío + mensaje
  showPlaceholder();

  // ✅ Auto-selección tras 15 segundos si no hubo interacción
  suggestionTimer = setTimeout(() => {
    if (userInteracted) return;

    const uxResearchBtn = tabs.find(b => (b.textContent || "").trim().toLowerCase() === "ux research") || tabs[0];
    activate(uxResearchBtn);

  }, 15000);
});

