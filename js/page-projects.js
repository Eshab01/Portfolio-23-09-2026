/* ============================================================
   PAGE: PROJECTS — breach entrance, grid, filters, modal
   ============================================================ */
(function () {
  'use strict';
  const REDUCE_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasAnime = typeof anime !== 'undefined';

  /* ---------------- Breach — plays on page load, once per session ---------------- */
  function spawnFragments(container) {
    if (!hasAnime) return;
    const rect = container.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height * 0.46;
    const frags = [];
    for (let i = 0; i < 16; i++) {
      const f = document.createElement('div');
      f.className = 'breach__fragment';
      f.style.left = centerX + 'px';
      f.style.top = centerY + 'px';
      container.appendChild(f);
      frags.push(f);
    }
    anime({
      targets: frags,
      translateX: () => anime.random(-240, 240),
      translateY: () => anime.random(-170, 50),
      rotate: () => anime.random(-360, 360),
      opacity: [1, 0], scale: [1, 0.35],
      duration: () => anime.random(700, 1150),
      easing: 'easeOutCubic', delay: anime.stagger(10),
      complete: () => frags.forEach((f) => f.remove())
    });
    anime({
      targets: container,
      translateX: [{ value: -9, duration: 55 }, { value: 7, duration: 55 }, { value: -5, duration: 55 }, { value: 3, duration: 55 }, { value: 0, duration: 55 }],
      easing: 'easeInOutSine'
    });
  }

  function setupBreach() {
    const breach = document.getElementById('breach');
    const boulder = document.getElementById('boulder');
    if (!breach) return;

    let already = false;
    try { already = sessionStorage.getItem('breachPlayed') === '1'; } catch (e) {}

    if (REDUCE_MOTION || already) { breach.classList.add('is-breaking'); return; }

    setTimeout(() => {
      breach.classList.add('is-breaking');
      try { sessionStorage.setItem('breachPlayed', '1'); } catch (e) {}
    }, 500);

    if (boulder) {
      boulder.addEventListener('animationend', (e) => { if (e.animationName === 'boulderFall') spawnFragments(breach); });
    }
  }

  /* ---------------- Grid render, filter, tilt ---------------- */
  function setupTilt(cards) {
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty('--tiltX', (py * -6) + 'deg');
        card.style.setProperty('--tiltY', (px * 6) + 'deg');
      });
      card.addEventListener('mouseleave', () => { card.style.setProperty('--tiltX', '0deg'); card.style.setProperty('--tiltY', '0deg'); });
    });
  }

  function setupFilters() {
    const btns = document.querySelectorAll('.filter-btn');
    if (!btns.length) return;
    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        btns.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const filter = btn.dataset.filter;
        document.querySelectorAll('.project-card').forEach((card) => {
          card.classList.toggle('is-hidden', !(filter === 'all' || card.dataset.cat === filter));
        });
      });
    });
  }

  function openModal(p) {
    document.getElementById('modalNum').textContent = 'FIELD REPORT ' + p.num;
    document.getElementById('modalTitle').textContent = p.title;
    document.getElementById('modalDetail').textContent = p.detail || p.desc;
    document.getElementById('modalStack').innerHTML = p.stack.map((s) => `<span>${s}</span>`).join('');
    const live = document.getElementById('modalLive');
    if (p.live) { live.href = p.live; live.style.display = 'inline-flex'; } else { live.style.display = 'none'; }
    document.getElementById('modalOverlay').classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    document.getElementById('modalOverlay').classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid || typeof projectData === 'undefined') return;

    grid.innerHTML = projectData.map((p) => `
      <article class="project-card reveal" data-cat="${p.cat}" data-title="${p.title}">
        <div class="project-card__top">
          <span class="project-card__num">${p.num}</span>
          ${p.live ? '<span class="project-card__live">LIVE</span>' : ''}
        </div>
        <h3 class="project-card__title">${p.title}</h3>
        <p class="project-card__desc">${p.desc}</p>
        <div class="project-card__stack">${p.stack.map((s) => `<span>${s}</span>`).join('')}</div>
        <span class="project-card__link">Full report <svg width="14" height="14"><use href="#i-arrow-up-right"/></svg></span>
      </article>
    `).join('');

    grid.querySelectorAll('.project-card').forEach((card) => {
      card.addEventListener('click', () => {
        const p = projectData.find((x) => x.title === card.dataset.title);
        if (p) openModal(p);
      });
    });

    if (window.Core) window.Core.observeReveals(grid.querySelectorAll('.reveal'));
    setupTilt(grid.querySelectorAll('.project-card'));
  }

  function setupModal() {
    const overlay = document.getElementById('modalOverlay');
    const closeBtn = document.getElementById('modalClose');
    if (!overlay) return;
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
  }

  function boot() {
    setupBreach();
    renderProjects();
    setupFilters();
    setupModal();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
