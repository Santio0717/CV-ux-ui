/* =====================================================
   AÑO AUTOMÁTICO
===================================================== */
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* =====================================================
   DONUT PRINCIPAL (ANYCHART)
===================================================== */
anychart.onDocumentReady(function () {

  // Datos ordenados alfabéticamente
  const data = [
    { x: "Documentación", value: 20, fill: "#2ecc71" },
    { x: "Frontend", value: 15, fill: "#3498db" },
    { x: "Motion", value: 30, fill: "#9b59b6" },
    { x: "Producción", value: 10, fill: "#e74c3c" },
    { x: "UX/UI", value: 35, fill: "#f39c12" }
  ];

  // Crear gráfico
  const chart = anychart.pie(data);

  // Modo donut
  chart.innerRadius("65%");

  // Desactivar labels
  chart.labels().enabled(false);

  // Tooltip nativo
  chart.tooltip().format("{%x}: {%value}%");

  // Insertar en el div
  chart.container("donutChart");

  // Dibujar
  chart.draw();
});
