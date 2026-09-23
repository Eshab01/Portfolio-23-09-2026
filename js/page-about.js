/* ============================================================
   PAGE: ABOUT — constellation graph + ember backdrop
   ============================================================ */
(function () {
  'use strict';

  const NODES = [
    { id: 'bca', label: 'BCA ·\nChandigarh Univ.' },
    { id: 'ieee', label: 'IEEE\nMember' },
    { id: 'hack', label: 'Hackathon\nRegular' },
    { id: 'vap', label: 'Vidyarthi\nArt Press' },
    { id: 'tp', label: 'Teleperformance' },
    { id: 'proj', label: '17\nProjects' },
    { id: 'cricket', label: 'Cricket\nCaptain' }
  ];

  const NODE_INFO = {
    bca: 'Bachelor of Computer Applications at Chandigarh University (UIC) — College ID 23BCA10443. Where the hackathon habit started.',
    ieee: 'Active IEEE member through college, with regular participation in technical events alongside the hackathon circuit.',
    hack: 'A recurring presence on hackathon weekends — the fastest way I know to ship something in 36 hours flat.',
    vap: 'Co-manage Vidyarthi Art Press — printing, branding and advertising, with a growing B2B push into Punjab\u2019s industrial belt.',
    tp: 'Current post: product/customer support at Teleperformance, joined May 2026 right after wrapping the WNS internship.',
    proj: 'Seventeen personal projects and counting — full-stack apps, quick utilities, and after-hours creative experiments.',
    cricket: 'Captain of my village cricket team — tournament wins and a gold medal across multiple seasons.'
  };

  function setupConstellation() {
    const svg = document.getElementById('constellationSvg');
    if (!svg || !window.Core) return;
    window.Core.buildRadialGraph(svg, {
      cx: 230, cy: 230, radius: 168, coreR: 50,
      core: { label: 'ESHAB' },
      nodes: NODES
    });

    const detail = document.querySelector('.about__grid');
    let panel = document.getElementById('constellationDetail');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'constellationDetail';
      panel.className = 'field-notes';
      panel.style.marginTop = '1rem';
      panel.style.maxWidth = '460px';
      panel.innerHTML = `<div class="field-note"><dt>Tap a node</dt><dd>to read more</dd></div>`;
      svg.parentElement.appendChild(panel);
    }

    svg.addEventListener('click', (e) => {
      const node = e.target.closest('.skilltree__node');
      if (!node || node.classList.contains('skilltree__core')) return;
      const id = node.dataset.node;
      svg.querySelectorAll('.skilltree__node').forEach((n) => n.classList.remove('is-active'));
      node.classList.add('is-active');
      panel.innerHTML = `<div class="field-note" style="border-bottom:none; display:block;"><dd style="text-align:left;">${NODE_INFO[id] || ''}</dd></div>`;
    });
    svg.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const node = e.target.closest('.skilltree__node');
        if (node) node.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      }
    });
  }

  function setupEmbers() {
    if (typeof EmberField === 'undefined') return;
    const c = document.getElementById('ember-canvas');
    if (c) new EmberField(c, { count: 50, minSpeed: 8, maxSpeed: 22 });
  }

  function boot() {
    setupConstellation();
    setupEmbers();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
