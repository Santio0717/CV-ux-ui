// Verificar si el video está visible en pantalla
function checkVideoVisibility() {
  const videoContainer = document.querySelector('.video-banner-container');
  const video = document.getElementById('videoBanner');

  const rect = videoContainer.getBoundingClientRect();
  if (rect.top <= window.innerHeight && rect.bottom >= 0) {
    // Si el video es visible, mostrar y reproducir
    videoContainer.style.display = 'block';
    if (video.paused) {
      video.play();
    }
  } else {
    // Si no es visible, pausar
    video.pause();
  }
}

// Activar la detección de scroll para visibilidad
window.addEventListener('scroll', checkVideoVisibility);
checkVideoVisibility(); // Verificación inicial al cargar

// Controles personalizados
const video = document.getElementById('videoBanner');
const playPauseBtn = document.getElementById('playPauseBtn');
const progressBar = document.getElementById('progressBar');

// Reproducir/Pausar al hacer clic en botón
playPauseBtn.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    playPauseBtn.textContent = '⏸️';
  } else {
    video.pause();
    playPauseBtn.textContent = '▶️';
  }
});

// Actualizar barra de progreso mientras avanza el video
video.addEventListener('timeupdate', () => {
  const progress = (video.currentTime / video.duration) * 100;
  progressBar.value = progress;
});

// Permitir adelantar o retroceder desde barra de progreso
progressBar.addEventListener('input', () => {
  const seekTime = (progressBar.value / 100) * video.duration;
  video.currentTime = seekTime;
});

// Pausar/Reproducir con tecla ESPACIO
document.addEventListener('keydown', function(event) {
  // Evita conflicto si estás escribiendo en un input o textarea
  const activeTag = document.activeElement.tagName.toLowerCase();
  if (activeTag === "input" || activeTag === "textarea") return;

  if (event.code === "Space") {
    event.preventDefault(); // Evita que la página baje
    if (video.paused) {
      video.play();
      playPauseBtn.textContent = '⏸️';
    } else {
      video.pause();
      playPauseBtn.textContent = '▶️';
    }
  }
});
