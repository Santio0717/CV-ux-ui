// Función para verificar si el video está visible
function checkVideoVisibility() {
  const videoContainer = document.querySelector('.video-banner-container');
  const video = document.getElementById('videoBanner');
  
  const rect = videoContainer.getBoundingClientRect();
  
  // Verificar si el video está visible en la ventana
  if (rect.top <= window.innerHeight && rect.bottom >= 0) {
    videoContainer.style.display = 'block'; // Asegurar que el video esté visible
    if (video.paused) {
      video.play();  // Reproduce el video cuando es visible
    }
  } else {
    video.pause();  // Pausa el video cuando no es visible
  }
}

// Función para alternar la reproducción y la pausa del video
function togglePlayPause() {
  const video = document.getElementById('videoBanner');
  
  if (video.paused) {
    video.play();  // Reproducir el video
  } else {
    video.pause();  // Pausar el video
  }
}

// Detectar cuando se presiona la tecla Espacio para pausar/reproducir el video
window.addEventListener('keydown', function(event) {
  if (event.code === 'Space') {  // Si la tecla presionada es "Space"
    event.preventDefault();  // Prevenir el comportamiento predeterminado (hacer scroll)
    togglePlayPause();  // Alternar entre pausar y reproducir
  }
});

// Llamar a la función de visibilidad cuando se haga scroll
window.addEventListener('scroll', checkVideoVisibility);
checkVideoVisibility(); // Llamada inicial cuando la página se carga

