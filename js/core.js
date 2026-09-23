/* ============================================================
   CORE — shared across every page.
   Custom cursor, page-transition wipe, reveal-on-scroll,
   counters, typewriter. Exposed on window.Core for page-
   specific scripts to reuse.
   ============================================================ */
(function () {
  'use strict';

  const REDUCE_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const COARSE_POINTER = window.matchMedia('(pointer: coarse)').matches;
  const hasAnime = typeof anime !== 'undefined';

  /* ---------------- Custom cursor ---------------- */
  function setupCursor() {
    if (COARSE_POINTER) return;
    document.body.classList.add('has-custom-cursor');
    const dot = document.createElement('div'); dot.className = 'cursor-dot';
    const ring = document.createElement('div'); ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mx = window.innerWidth / 2, my = window.innerHeight / 2, rx = mx, ry = my;
    let seen = false;

    window.addEventListener('pointermove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
      if (!seen) { seen = true; dot.style.opacity = '1'; ring.style.opacity = '1'; }
    }, { passive: true });

    dot.style.opacity = '0'; ring.style.opacity = '0';

    function loop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    }
    loop();

    const hoverSelector = 'a, button, .filter-btn, .project-card, .skilltree__node, .teaser-card, input, textarea, .achievement-card';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest && e.target.closest(hoverSelector)) dot.classList.add('is-hover');
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest && e.target.closest(hoverSelector)) dot.classList.remove('is-hover');
    });
  }

  /* ---------------- Page-transition wipe ---------------- */
  function setupPageTransitions() {
    const overlay = document.getElementById('pageTransition');
    if (!overlay) return;

    let origin = null;
    try { origin = JSON.parse(sessionStorage.getItem('pt-origin') || 'null'); } catch (e) { origin = null; }
    overlay.style.setProperty('--ox', (origin ? origin.x : 50) + '%');
    overlay.style.setProperty('--oy', (origin ? origin.y : 50) + '%');

    function reveal() {
      requestAnimationFrame(() => requestAnimationFrame(() => overlay.classList.add('is-open')));
    }
    window.addEventListener('pageshow', reveal);
    // Safety net: guarantee the overlay reveals shortly after this script runs no matter
    // what, so a missed/late 'pageshow' can never leave the page stuck under a blocking cover.
    setTimeout(reveal, 350);

    if (REDUCE_MOTION) { overlay.style.transition = 'none'; overlay.classList.add('is-open'); return; }

    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href) return;
      if (link.target === '_blank' || link.hasAttribute('download')) return;
      if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || /^https?:\/\//.test(href)) return;

      e.preventDefault();
      const xp = (e.clientX / window.innerWidth) * 100;
      const yp = (e.clientY / window.innerHeight) * 100;
      overlay.style.setProperty('--ox', xp + '%');
      overlay.style.setProperty('--oy', yp + '%');
      try { sessionStorage.setItem('pt-origin', JSON.stringify({ x: xp, y: yp })); } catch (err) {}
      overlay.classList.remove('is-open');
      setTimeout(() => { window.location.href = href; }, 620);
    });
  }

  /* ---------------- Reveal-on-scroll (shared observer) ---------------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  function observeReveals(nodeList) {
    (nodeList || document.querySelectorAll('.reveal')).forEach((el) => revealObserver.observe(el));
  }

  /* ---------------- Counters ---------------- */
  function animateCounters(selector, rootSelector) {
    const numberEls = document.querySelectorAll(selector || '.stat__number[data-count]');
    if (!numberEls.length) return;
    numberEls.forEach((el) => {
      if (el.querySelector('.num')) return;
      const span = document.createElement('span');
      span.className = 'num';
      span.textContent = REDUCE_MOTION ? el.dataset.count : '0';
      el.insertBefore(span, el.firstChild);
    });
    if (REDUCE_MOTION || !hasAnime) return;

    const root = rootSelector ? document.querySelector(rootSelector) : numberEls[0].closest('.stats-row') || numberEls[0].parentElement;
    if (!root) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        numberEls.forEach((el) => {
          const span = el.querySelector('.num');
          const target = parseInt(el.dataset.count, 10) || 0;
          const obj = { v: 0 };
          anime({ targets: obj, v: target, round: 1, duration: 1500, easing: 'easeOutExpo', update: () => { span.textContent = obj.v; } });
        });
        io.unobserve(entry.target);
      });
    }, { threshold: 0.4 });
    io.observe(root);
  }

  /* ---------------- Typewriter ---------------- */
  function typewriter(elId, phrases, opts) {
    const el = document.getElementById(elId);
    if (!el) return;
    opts = opts || {};
    if (REDUCE_MOTION) { el.textContent = phrases[0]; return; }
    let phraseIdx = 0, charIdx = 0, deleting = false;
    function tick() {
      const current = phrases[phraseIdx];
      if (!deleting) {
        charIdx++;
        el.textContent = current.slice(0, charIdx);
        if (charIdx === current.length) { deleting = true; setTimeout(tick, opts.hold || 1900); return; }
      } else {
        charIdx--;
        el.textContent = current.slice(0, charIdx);
        if (charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; }
      }
      setTimeout(tick, deleting ? 32 : 62);
    }
    tick();
  }

  /* ---------------- Generic page-enter fade ---------------- */
  function pageEnter() {
    document.querySelectorAll('.page-enter').forEach((el, i) => {
      setTimeout(() => el.classList.add('is-ready'), 60 * i);
    });
  }

  /* ---------------- Mobile nav (works once partials.js injects nav) ---------------- */
  function setupNav() {
    const nav = document.getElementById('nav');
    const burger = document.getElementById('navBurger');
    const links = document.getElementById('navLinks');
    if (!nav) return;

    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    if (burger && links) {
      burger.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('is-open');
        burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
      links.querySelectorAll('a').forEach((a) => {
        a.addEventListener('click', () => {
          nav.classList.remove('is-open');
          burger.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  /* ---------------- Radial node graph (constellation / skill tree) ---------------- */
  function buildRadialGraph(svg, opts) {
    const cx = opts.cx, cy = opts.cy, r = opts.radius;
    const n = opts.nodes.length;
    const positions = opts.nodes.map((node, i) => {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      return Object.assign({}, node, { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) });
    });
    let html = '';
    positions.forEach((p) => {
      html += `<path class="skilltree__link" data-node="${p.id}" d="M ${cx} ${cy} L ${p.x} ${p.y}"/>`;
    });
    positions.forEach((p) => {
      const lines = String(p.label).split('\n');
      const text = lines.map((line, i2) => `<tspan x="0" dy="${i2 === 0 ? 0 : 13}">${line}</tspan>`).join('');
      html += `<g class="skilltree__node" data-node="${p.id}" transform="translate(${p.x},${p.y})" tabindex="0" role="button" aria-label="${p.label.replace(/\n/g, ' ')}">
        <circle r="${p.r || 38}"/>
        <text text-anchor="middle" dy="${lines.length > 1 ? -3 : 5}">${text}</text>
      </g>`;
    });
    html += `<g class="skilltree__node skilltree__core" transform="translate(${cx},${cy})">
      <circle r="${opts.coreR || 46}"/>
      <text text-anchor="middle" dy="5">${opts.core.label}</text>
    </g>`;
    svg.innerHTML = html;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const links = svg.querySelectorAll('.skilltree__link');
        const nodes = svg.querySelectorAll('.skilltree__node:not(.skilltree__core)');
        links.forEach((l, i) => setTimeout(() => l.classList.add('is-drawn'), i * 90));
        nodes.forEach((nd, i) => setTimeout(() => nd.style.opacity = '1', 200 + i * 90));
        io.unobserve(entry.target);
      });
    }, { threshold: 0.3 });
    svg.querySelectorAll('.skilltree__node:not(.skilltree__core)').forEach((nd) => { nd.style.opacity = REDUCE_MOTION ? '1' : '0'; nd.style.transition = 'opacity .5s ease'; });
    if (REDUCE_MOTION) { svg.querySelectorAll('.skilltree__link').forEach((l) => l.classList.add('is-drawn')); }
    else io.observe(svg);

    return positions;
  }

  window.Core = { observeReveals, animateCounters, typewriter, pageEnter, buildRadialGraph, REDUCE_MOTION, hasAnime };

  function boot() {
    setupCursor();
    setupPageTransitions();
    setupNav();
    pageEnter();
    observeReveals(document.querySelectorAll('.reveal'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
