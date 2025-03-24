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
  const button = document.getElementById('playPauseButton');
  
  if (video.paused) {
    video.play();
    button.textContent = 'Pausar';
  } else {
    video.pause();
    button.textContent = 'Reproducir';
  }
}

// Asignar el evento de clic al botón
document.getElementById('playPauseButton').addEventListener('click', togglePlayPause);

// Llamar a la función de visibilidad cuando se haga scroll
window.addEventListener('scroll', checkVideoVisibility);
checkVideoVisibility(); // Llamada inicial cuando la página se carga
