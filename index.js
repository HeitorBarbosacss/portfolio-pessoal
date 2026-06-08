window.addEventListener('load', function () {

  // Carrossel
  let idx = 0;
  const track  = document.getElementById('carTrack');
  const slides = track.querySelectorAll('img');
  const dots   = document.getElementById('carDots');

  slides.forEach((_, i) => {
    const d = document.createElement('span');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.onclick = () => goTo(i);
    dots.appendChild(d);
  });

  document.querySelector('.car-btn.prev').addEventListener('click', () => moveCar(-1));
  document.querySelector('.car-btn.next').addEventListener('click', () => moveCar(1));

  function moveCar(dir) { goTo((idx + dir + slides.length) % slides.length); }
  function goTo(i) {
    idx = i;
    track.style.transform = `translateX(-${i * 100}%)`;
    dots.querySelectorAll('.dot').forEach((d, j) => d.classList.toggle('active', j === i));
  }

  setInterval(() => moveCar(1), 3800);

  // Animação ao scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visivel');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('section').forEach(sec => {
    sec.classList.add('oculto');
    observer.observe(sec);
  });

});