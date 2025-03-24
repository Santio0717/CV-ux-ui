// Función para verificar si el video está visible
function checkVideoVisibility() {
  const videoContainer = document.querySelector('.video-banner-container');
  const video = document.getElementById('videoBanner');
  
  const rect = videoContainer.getBoundingClientRect();
  if (rect.top <= window.innerHeight && rect.bottom >= 0) {
    // Si el video es visible, lo muestra y lo reproduce
    videoContainer.style.display = 'block';
    if (video.paused) {
      video.play();  // Reproduce el video si está visible
    }
  } else {
    // Si no está visible, lo pausa
    video.pause();
  }
}

// Función para alternar la reproducción y la pausa
function togglePlayPause() {
  const video = document.getElementById('videoBanner');
  
  if (video.paused) {
    video.play();  // Reproducir el video
  } else {
    video.pause();  // Pausar el video
  }
}

// Detectar cuando se presiona la tecla Espacio
window.addEventListener('keydown', function(event) {
  if (event.code === 'Space') {  // Si la tecla presionada es "Space"
    event.preventDefault();  // Prevenir el comportamiento predeterminado (hacer scroll)
    togglePlayPause();  // Alternar entre pausar y reproducir
  }
});

// Llamar a la función de visibilidad cuando se haga scroll
window.addEventListener('scroll', checkVideoVisibility);
checkVideoVisibility(); // Llamada inicial cuando la página se carga
