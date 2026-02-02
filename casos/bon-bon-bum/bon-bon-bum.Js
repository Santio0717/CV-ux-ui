document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("case-content");
  const tabs = Array.from(document.querySelectorAll(".ux-tab[data-page]"));

  if (!content || !tabs.length) return;

  async function loadPage(page) {
    try {
      // ✅ Si estás en file://, fetch suele fallar
      if (location.protocol === "file:") {
        content.innerHTML = `
          <p style="text-align:center; opacity:.85;">
            Estás abriendo esto en <strong>file://</strong>.<br>
            Para que funcionen las tabs, abre con <strong>Live Server</strong> o súbelo a Netlify.
          </p>
        `;
        return;
      }

      const res = await fetch(page, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const html = await res.text();
      content.innerHTML = html;

    } catch (err) {
      console.error(err);
      content.innerHTML = `
        <p style="text-align:center; opacity:.85;">
          No se pudo cargar <strong>${page}</strong>.<br>
          Verifica que el archivo exista en la misma carpeta del index.
        </p>
      `;
    }
  }

  function activate(btn) {
    tabs.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    loadPage(btn.dataset.page);
  }

  tabs.forEach(btn => btn.addEventListener("click", () => activate(btn)));

  // Inicial
  const initial = tabs.find(b => b.classList.contains("active")) || tabs[0];
  activate(initial);
});
