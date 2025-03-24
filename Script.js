// Verifica si el video está visible y lo reproduce
function checkVideoVisibility() {
  const videoContainer = document.querySelector('.video-banner-container');
  const video = document.getElementById('videoBanner');

  const rect = videoContainer.getBoundingClientRect();
  if (rect.top <= window.innerHeight && rect.bottom >= 0) {
    if (video.paused) video.play();
  } else {
    video.pause();
  }
}

// Eventos de scroll
window.addEventListener('scroll', checkVideoVisibility);
checkVideoVisibility();

// Controles personalizados
const video = document.getElementById('videoBanner');
const playPauseBtn = document.getElementById('playPauseBtn');
const progressBar = document.getElementById('progressBar');
const volumeControl = document.getElementById('volumeControl');
const speedControl = document.getElementById('speedControl');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const fullscreenBtn = document.getElementById('fullscreenBtn');

// Actualiza botón
function updatePlayBtn() {
  playPauseBtn.textContent = video.paused ? '▶️' : '⏸️';
}

// Play/Pause
playPauseBtn.addEventListener('click', () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  updatePlayBtn();
});

// Barra de progreso
video.addEventListener('timeupdate', () => {
  const progress = (video.currentTime / video.duration) * 100;
  progressBar.value = progress;
  currentTimeEl.textContent = formatTime(video.currentTime);
  durationEl.textContent = formatTime(video.duration);
});

// Cambiar progreso
progressBar.addEventListener('input', () => {
  const time = (progressBar.value / 100) * video.duration;
  video.currentTime = time;
});

// Volumen
volumeControl.addEventListener('input', () => {
  video.volume = volumeControl.value;
});

// Velocidad
speedControl.addEventListener('change', () => {
  video.playbackRate = speedControl.value;
});

// Formato de tiempo
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Tecla espacio
document.addEventListener('keydown', (e) => {
  const tag = document.activeElement.tagName.toLowerCase();
  if (tag !== 'input' && tag !== 'select' && e.code === 'Space') {
    e.preventDefault();
    if (video.paused) video.play();
    else video.pause();
    updatePlayBtn();
  }
});

// Pantalla completa
fullscreenBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    video.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});
