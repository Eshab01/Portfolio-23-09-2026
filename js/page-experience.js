/* ============================================================
   PAGE: EXPERIENCE — route map + timeline spine
   ============================================================ */
(function () {
  'use strict';
  const REDUCE_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasAnime = typeof anime !== 'undefined';

  function setupRouteMap() {
    const svg = document.getElementById('routeSvg');
    const pathEl = document.getElementById('routePath');
    const mover = document.getElementById('routeMover');
    if (!svg || !pathEl) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        pathEl.classList.add('is-drawn');

        if (!REDUCE_MOTION && hasAnime && mover) {
          const path = anime.path(pathEl);
          mover.classList.add('is-moving');
          anime({
            targets: mover,
            translateX: path('x'),
            translateY: path('y'),
            easing: 'easeInOutSine',
            duration: 2400,
            delay: 300
          });
        }
        io.unobserve(entry.target);
      });
    }, { threshold: 0.4 });
    io.observe(svg);
  }

  function setupTimelineSpine() {
    const timeline = document.querySelector('.timeline');
    const fill = document.getElementById('spineFill');
    if (!timeline || !fill) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { fill.style.height = '100%'; io.unobserve(entry.target); }
      });
    }, { threshold: 0.2 });
    io.observe(timeline);
  }

  function setupEmbers() {
    if (typeof EmberField === 'undefined') return;
    const c = document.getElementById('ember-canvas');
    if (c) new EmberField(c, { count: 50, minSpeed: 8, maxSpeed: 22 });
  }

  function boot() { setupRouteMap(); setupTimelineSpine(); setupEmbers(); }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
