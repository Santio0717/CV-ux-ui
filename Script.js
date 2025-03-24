// Obtener elementos del DOM
const video = document.getElementById('videoBanner');
const playPauseButton = document.getElementById('playPauseButton');
const progressBar = document.getElementById('progressBar');
const volumeControl = document.getElementById('volumeControl');

// Función para alternar entre reproducir y pausar
function togglePlayPause() {
  if (video.paused) {
    video.play();
    playPauseButton.textContent = 'Pausar';
  } else {
    video.pause();
    playPauseButton.textContent = 'Reproducir';
  }
}

// Función para actualizar la barra de progreso
function updateProgress() {
  const progress = (video.currentTime / video.duration) * 100;
  progressBar.value = progress;
}

// Función para cambiar el tiempo del video al mover la barra de progreso
function setProgress() {
  const newTime = (progressBar.value / 100) * video.duration;
  video.currentTime = newTime;
}

// Función para controlar el volumen
function updateVolume() {
  video.volume = volumeControl.value / 100;
}

// Event listeners para controles
playPauseButton.addEventListener('click', togglePlayPause);
progressBar.addEventListener('input', setProgress);
volumeControl.addEventListener('input', updateVolume);

// Actualizar la barra de progreso mientras el video se reproduce
video.addEventListener('timeupdate', updateProgress);

// Inicializar el volumen
volumeControl.value = video.volume * 100;

// Inicializar el estado del botón de reproducción
if (video.paused) {
  playPauseButton.textContent = 'Reproducir';
} else {
  playPauseButton.textContent = 'Pausar';
}
