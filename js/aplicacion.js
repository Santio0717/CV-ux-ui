/* =====================================================
   APLICACIÓN PRINCIPAL
===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicialización del año
    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // 2. Elementos del gráfico
    const cards = document.querySelectorAll(".chart-card");
    const tooltip = document.getElementById("chart-tooltip");

    /**
     * Función que maneja la lógica de contenido y posicionamiento
     * del tooltip HTML personalizado de Chart.js.
     * @param {object} context - El contexto del tooltip proporcionado por Chart.js.
     */
    const externalTooltipHandler = ({ chart, tooltip: tooltipModel }) => {
        // 2a. Si el modelo de tooltip no es visible (mouse out), ocultar el elemento HTML.
        if (tooltipModel.opacity === 0) {
            tooltip.style.opacity = 0;
            return;
        }

        // 2b. Si hay un punto activo (mouse over)
        if (tooltipModel.dataPoints.length > 0) {
            const datapoint = tooltipModel.dataPoints[0];
            
            // Queremos que el tooltip solo se muestre sobre el segmento de "Valor" (índice 0).
            // Ocultar si está sobre el segmento "Resto" (índice 1).
            if (datapoint.dataIndex !== 0) {
                tooltip.style.opacity = 0;
                return;
            }

            // Obtener datos de la tarjeta desde el DOM
            const card = datapoint.chart.canvas.closest('.chart-card');
            const value = Number(card.dataset.value);
            const label = card.dataset.label;
            const color = card.dataset.color;

            // 3. Contenido del Tooltip
            tooltip.innerHTML = `
                <div style="font-weight:700; margin-bottom:4px; font-size:1rem; color:${color};">
                    ${label}
                </div>
                <div style="font-size:.95rem; color:white;">${value}%</div>
            `;
            
            // 4. Posicionamiento del Tooltip (crucial para que siga el punto)
            // Obtenemos la posición del canvas en la ventana (viewport)
            const position = chart.canvas.getBoundingClientRect();

            // Hacemos visible el tooltip y le damos estilo
            tooltip.style.opacity = 1;
            tooltip.style.border = `2px solid ${color}`;
            
            // Calculamos la posición absoluta: Posición del Canvas + Scroll + Coordenadas de Chart.js
            tooltip.style.left = position.left + window.scrollX + tooltipModel.caretX + 'px';
            tooltip.style.top = position.top + window.scrollY + tooltipModel.caretY + 'px';
        
        } else {
            // Si no hay dataPoints activos, ocultar
            tooltip.style.opacity = 0;
        }
    };


    /* =====================================================
       INICIALIZACIÓN DE CADA DONUT
    ===================================================== */
    cards.forEach(card => {
        const canvas = card.querySelector(".donut-chart");
        const value = Number(card.dataset.value);
        const color = card.dataset.color;
        const label = card.dataset.label;

        new Chart(canvas, {
            type: "doughnut",

            data: {
                labels: [label, "Resto"],
                datasets: [{
                    data: [value, 100 - value],
                    backgroundColor: [color, "#e4e4e4"],
                    hoverBackgroundColor: [color, "#e4e4e4"], // No resaltar el resto
                    borderWidth: 0
                }]
            },

            options: {
                cutout: "70%", // tamaño del agujero central
                responsive: true,
                maintainAspectRatio: true,

                plugins: {
                    legend: { display: false },

                    tooltip: {
                        enabled: false, // Desactiva el tooltip por defecto
                        external: externalTooltipHandler // Usa nuestra función personalizada
                    }
                },

                animation: {
                    animateRotate: true,
                    duration: 1200
                },
            }
        });
    });
});
