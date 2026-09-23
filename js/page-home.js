/* ============================================================
   PAGE: HOME — intro loader, hero entrance, featured projects
   ============================================================ */
(function () {
  'use strict';
  const REDUCE_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasAnime = typeof anime !== 'undefined';

  /* ---------------- Intro loader ---------------- */
  function setupIntro() {
    const loader = document.getElementById('introLoader');
    if (!loader) return;

    let already = false;
    try { already = sessionStorage.getItem('introPlayed') === '1'; } catch (e) {}

    if (already || REDUCE_MOTION) {
      loader.style.transition = 'none';
      loader.classList.add('is-hidden');
      loader.style.display = 'none';
      return;
    }

    const fill = document.getElementById('introBarFill');
    function hide() {
      loader.classList.add('is-hidden');
      try { sessionStorage.setItem('introPlayed', '1'); } catch (e) {}
      setTimeout(() => { loader.style.display = 'none'; }, 650);
    }

    if (hasAnime && fill) {
      anime({ targets: fill, width: ['0%', '100%'], duration: 1250, easing: 'easeInOutQuad', complete: () => setTimeout(hide, 200) });
    } else {
      setTimeout(hide, 1300);
    }
    loader.addEventListener('click', hide, { once: true });
  }

  /* ---------------- Hero title split + entrance ---------------- */
  function animateHeroTitle() {
    const el = document.getElementById('heroTitle');
    if (!el) return;
    const text = el.dataset.text || el.textContent;
    if (REDUCE_MOTION || !hasAnime) { el.textContent = text; return; }

    el.innerHTML = text.split('').map((ch) => `<span class="char">${ch === ' ' ? '&nbsp;' : ch}</span>`).join('');
    anime({
      targets: el.querySelectorAll('.char'),
      translateY: [70, 0], opacity: [0, 1], rotateZ: [6, 0],
      easing: 'easeOutExpo', duration: 1100, delay: anime.stagger(26, { start: 900 })
    });
  }

  /* ---------------- Featured projects ---------------- */
  function renderFeatured() {
    const grid = document.getElementById('featuredProjectsGrid');
    if (!grid || typeof projectData === 'undefined') return;
    const picks = ['Codeflix', 'AnonyChat', 'Solana Token Creator'];
    const items = picks.map((t) => projectData.find((p) => p.title === t)).filter(Boolean);

    grid.innerHTML = items.map((p) => `
      <article class="project-card reveal">
        <div class="project-card__top">
          <span class="project-card__num">${p.num}</span>
          ${p.live ? '<span class="project-card__live">LIVE</span>' : ''}
        </div>
        <h3 class="project-card__title">${p.title}</h3>
        <p class="project-card__desc">${p.desc}</p>
        <div class="project-card__stack">${p.stack.map((s) => `<span>${s}</span>`).join('')}</div>
        <a href="projects.html" class="project-card__link">Full report <svg width="14" height="14"><use href="#i-arrow-up-right"/></svg></a>
      </article>
    `).join('');

    if (window.Core) window.Core.observeReveals(grid.querySelectorAll('.reveal'));
  }

  /* ---------------- Embers ---------------- */
  function setupEmbers() {
    if (typeof EmberField === 'undefined') return;
    const heroCanvas = document.getElementById('ember-canvas');
    const ctaCanvas = document.getElementById('ember-canvas-cta');
    if (heroCanvas) new EmberField(heroCanvas, { count: 80 });
    if (ctaCanvas) new EmberField(ctaCanvas, { count: 40, minSpeed: 6, maxSpeed: 18 });
  }

  function boot() {
    setupIntro();
    animateHeroTitle();
    if (window.Core) window.Core.typewriter('typewriter', [
      'Full-Stack Developer',
      'B2B Business Development',
      'AI-Augmented Builder',
      'Product Support @ Teleperformance'
    ]);
    renderFeatured();
    setupEmbers();
    if (window.Core) window.Core.animateCounters('.stat__number[data-count]', '.stats-row');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
