/* ============================================================
   PAGE: ACHIEVEMENTS — trophy case spark burst
   ============================================================ */
(function () {
  'use strict';
  const REDUCE_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasAnime = typeof anime !== 'undefined';

  function burst(card) {
    if (!hasAnime || REDUCE_MOTION) return;
    const color = card.dataset.burst === 'teal' ? '47,215,196' : '255,200,87';
    const rect = card.getBoundingClientRect();
    const icon = card.querySelector('.achievement-card__icon');
    const iconRect = icon ? icon.getBoundingClientRect() : rect;
    const originX = iconRect.left - rect.left + iconRect.width / 2;
    const originY = iconRect.top - rect.top + iconRect.height / 2;

    const sparks = [];
    for (let i = 0; i < 10; i++) {
      const s = document.createElement('div');
      s.className = 'trophy-spark';
      s.style.left = originX + 'px';
      s.style.top = originY + 'px';
      s.style.background = `rgb(${color})`;
      s.style.boxShadow = `0 0 8px 2px rgba(${color},.7)`;
      card.appendChild(s);
      sparks.push(s);
    }
    anime({
      targets: sparks,
      translateX: () => anime.random(-46, 46),
      translateY: () => anime.random(-46, 46),
      opacity: [1, 0],
      scale: [1, 0.3],
      duration: () => anime.random(500, 850),
      easing: 'easeOutCubic',
      delay: anime.stagger(18),
      complete: () => sparks.forEach((s) => s.remove())
    });
  }

  function setupTrophyCase() {
    const cards = document.querySelectorAll('#trophyGrid .achievement-card');
    if (!cards.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        setTimeout(() => burst(entry.target), 350);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    cards.forEach((c) => io.observe(c));
  }

  function setupEmbers() {
    if (typeof EmberField === 'undefined') return;
    const c = document.getElementById('ember-canvas');
    if (c) new EmberField(c, { count: 50, minSpeed: 8, maxSpeed: 22 });
  }

  function boot() { setupTrophyCase(); setupEmbers(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
