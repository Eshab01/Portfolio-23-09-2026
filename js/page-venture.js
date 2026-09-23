/* ============================================================
   PAGE: VENTURE — flow diagram reveal
   ============================================================ */
(function () {
  'use strict';

  function setupFlow() {
    const flow = document.getElementById('flowDiagram');
    if (!flow) return;
    const nodes = flow.querySelectorAll('.flow__node');
    const arrows = flow.querySelectorAll('.flow__arrow');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        nodes.forEach((n, i) => setTimeout(() => n.classList.add('is-visible'), i * 260));
        arrows.forEach((a, i) => setTimeout(() => a.classList.add('is-drawn'), 200 + i * 260));
        io.unobserve(entry.target);
      });
    }, { threshold: 0.4 });
    io.observe(flow);
  }

  function setupEmbers() {
    if (typeof EmberField === 'undefined') return;
    const c = document.getElementById('ember-canvas');
    if (c) new EmberField(c, { count: 50, minSpeed: 8, maxSpeed: 22 });
  }

  function boot() { setupFlow(); setupEmbers(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
