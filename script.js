const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => { nav.classList.toggle('scrolled', window.scrollY > 60); });
  function toggleMenu() { document.getElementById('mobileMenu').classList.toggle('open'); }
  const video = document.getElementById('heroVideo');
  function tryPlay() {
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        video.classList.add('loaded');
      }).catch(() => {
        video.classList.add('loaded');
      });
    }
  }
  video.addEventListener('loadeddata', () => { video.classList.add('loaded'); });
  video.addEventListener('canplaythrough', tryPlay);
  video.addEventListener('error', () => { video.classList.add('loaded'); });
  document.addEventListener('DOMContentLoaded', () => {
    video.load();
    setTimeout(tryPlay, 1500);
  });
  setTimeout(() => video.classList.add('loaded'), 4000);
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => { if (entry.isIntersecting) { setTimeout(() => entry.target.classList.add('visible'), i * 70); observer.unobserve(entry.target); } });
  }, { threshold: 0.08 });
  reveals.forEach(el => observer.observe(el));
  function animateCounter(el) {
    const target = parseInt(el.dataset.target); const suffix = el.dataset.suffix || '+';
    const duration = 1800; const start = performance.now();
    function update(now) { const elapsed = now - start; const progress = Math.min(elapsed / duration, 1); const eased = 1 - Math.pow(1 - progress, 3); const value = Math.floor(eased * target); el.textContent = value.toLocaleString() + suffix; if (progress < 1) requestAnimationFrame(update); }
    requestAnimationFrame(update);
  }
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  const statObs = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { animateCounter(entry.target); statObs.unobserve(entry.target); } }); }, { threshold: 0.3 });
  statNumbers.forEach(el => statObs.observe(el));