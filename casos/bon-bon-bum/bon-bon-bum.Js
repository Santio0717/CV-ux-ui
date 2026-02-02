document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("case-content");
  const tabs = Array.from(document.querySelectorAll(".ux-tab[data-page]"));
  if (!content || !tabs.length) return;

  function sanitizeLoadedHTML(html){
    const temp = document.createElement("div");
    temp.innerHTML = html;

    // ❌ elimina duplicados comunes
    temp.querySelectorAll(".ux-tabs, .case-links, .case-title, h1").forEach(el => el.remove());

    // si viene un contenedor tipo "case-content", deja solo lo de adentro
    const innerCase = temp.querySelector(".case-content, .case-card");
    if(innerCase) {
      // intenta agarrar solo la sección informativa si existe
      const section = innerCase.querySelector(".ux-section, .case-body") || innerCase;
      return section.innerHTML;
    }

    return temp.innerHTML;
  }

  async function loadPage(page) {
    try {
      if (location.protocol === "file:") {
        content.innerHTML = `
          <p style="text-align:center; opacity:.85;">
            Estás en <strong>file://</strong>. Abre con Live Server o Netlify.
          </p>`;
        return;
      }

      const res = await fetch(page, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const html = await res.text();
      content.innerHTML = sanitizeLoadedHTML(html);

    } catch (e) {
      console.error(e);
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

  tabs.forEach(btn => btn.addEventListener("click", () => activate(btn)));

  activate(tabs.find(b => b.classList.contains("active")) || tabs[0]);
});
