// Relógio e seman
const dateEl = document.getElementById('date');
const timeEl = document.getElementById('time');

function pad(n) { return n.toString().padStart(2, '0'); }

function updateClock() {
  const now = new Date();
  dateEl.textContent = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}`;
  timeEl.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
}

updateClock();
setInterval(updateClock, 1000);

// Slideshow principal
const slides = document.querySelectorAll('.slideshow figure');
let current = 0;
let slideInterval;

function showSlide(index) {
  slides.forEach((figure, i) => {
    figure.classList.toggle('active', i === index);
  });

  const currentFigure = slides[index];
  const video = currentFigure.querySelector('video');

  // Se for vídeo → esperar terminar para avançar
  if (video) {
    clearInterval(slideInterval);   // pausa o intervalo automático
    video.currentTime = 0;          // reinicia o vídeo
    video.play();                   // toca o vídeo

    video.onended = () => {
      nextSlide();
      startSlideshow();
    };
  }
}

function nextSlide() {
  current = (current + 1) % slides.length;
  showSlide(current);
}

function startSlideshow() {
  slideInterval = setInterval(() => {
    const currentFigure = slides[current];
    if (!currentFigure.querySelector('video')) {
      nextSlide();
    }
  }, 5000); // tempo das imagens
}

// Inicia
showSlide(current);
startSlideshow();

// Mini slideshow agenda
const miniSlides = document.querySelectorAll('.mini-slideshow figure');
let miniCurrent = 0;

function showMiniSlide(index) {
  miniSlides.forEach((figure, i) => {
    figure.classList.toggle('active', i === index);
  });
}

function nextMiniSlide() {
  miniCurrent = (miniCurrent + 1) % miniSlides.length;
  showMiniSlide(miniCurrent);
}

if (miniSlides.length > 0) {
  showMiniSlide(miniCurrent);
  setInterval(nextMiniSlide, 7000);
}

// ===== Ocultar cursor após 2s de inatividade =====
let mouseTimer;
let cursorHidden = false;

function hideCursor() {
  document.body.style.cursor = 'none';
  cursorHidden = true;
}

function showCursor() {
  document.body.style.cursor = 'default';
  cursorHidden = false;
}

function resetMouseTimer() {
  clearTimeout(mouseTimer);
  if (cursorHidden) showCursor();
  mouseTimer = setTimeout(hideCursor, 2000); // 2 segundos
}

// Escuta movimento do mouse
document.addEventListener('mousemove', resetMouseTimer);
document.addEventListener('mousedown', resetMouseTimer);
document.addEventListener('keydown', resetMouseTimer);

// Inicia o temporizador
resetMouseTimer();

//setInterval(() => {
// location.reload();
//}, 3600000);
