/* ============================================================
   PAGE: CONTACT — transmission visual + embers
   ============================================================ */
(function () {
  'use strict';

  function setupTransmission() {
    const box = document.getElementById('transmission');
    if (!box) return;
    const rings = box.querySelectorAll('.transmission__ring');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) rings.forEach((r) => r.classList.add('is-active'));
        else rings.forEach((r) => r.classList.remove('is-active'));
      });
    }, { threshold: 0.3 });
    io.observe(box);
  }

  function setupLinkedin() {
    const el = document.getElementById('linkedinLink');
    if (el) el.addEventListener('click', (e) => e.preventDefault());
  }

  function setupEmbers() {
    if (typeof EmberField === 'undefined') return;
    const c1 = document.getElementById('ember-canvas');
    const c2 = document.getElementById('ember-canvas-contact');
    if (c1) new EmberField(c1, { count: 40, minSpeed: 8, maxSpeed: 22 });
    if (c2) new EmberField(c2, { count: 40, minSpeed: 6, maxSpeed: 18 });
  }

  function boot() { setupTransmission(); setupLinkedin(); setupEmbers(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
