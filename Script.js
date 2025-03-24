document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("videoBanner");

  // Intersection Observer para pausar/reproducir el video según visibilidad
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        video.play();
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(video);
});

