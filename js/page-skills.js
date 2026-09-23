/* ============================================================
   PAGE: SKILLS — skill tree + detail panel
   ============================================================ */
(function () {
  'use strict';

  const NODES = [
    { id: 'languages', label: 'Languages' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend &\nDatabase' },
    { id: 'tools', label: 'Tools' },
    { id: 'ai', label: 'AI &\nAutomation' },
    { id: 'web3', label: 'Web3' }
  ];

  const DETAIL = {
    languages: { title: 'Languages', tags: ['JavaScript', 'TypeScript', 'Python', 'C++', 'SQL', 'HTML5', 'CSS3', 'Kotlin (learning)'] },
    frontend: { title: 'Frontend', tags: ['React', 'Vite', 'Tailwind CSS', 'shadcn/ui', 'Responsive UI'] },
    backend: { title: 'Backend & Database', tags: ['Node.js', 'Express', 'Firebase', 'Firestore', 'MySQL', 'REST APIs', 'Normalization', 'ACID', 'B/B+ Trees'] },
    tools: { title: 'Tools', tags: ['Git / GitHub', 'VS Code', 'Visual Studio', 'npm / npx', 'Vercel', 'Canva', 'Adobe Animate', 'Photoshop'] },
    ai: { title: 'AI & Automation', tags: ['AI-Assisted Dev', 'Debugging', 'Local LLMs', 'Llama.cpp', 'Mistral / GGUF', 'Workflow Automation'] },
    web3: { title: 'Web3 / Blockchain', tags: ['Solana', 'web3.js', 'SPL Token', 'Phantom', 'Solflare'] }
  };

  function setupSkillTree() {
    const svg = document.getElementById('skillTreeSvg');
    const detailTitle = document.querySelector('#skillDetail .skilltree__detail-title');
    const detailEyebrow = document.querySelector('#skillDetail .skilltree__detail-eyebrow');
    const detailTags = document.getElementById('skillDetailTags');
    if (!svg || !window.Core) return;

    window.Core.buildRadialGraph(svg, {
      cx: 240, cy: 240, radius: 175, coreR: 52,
      core: { label: 'SKILLS' },
      nodes: NODES
    });

    function select(id) {
      const info = DETAIL[id];
      if (!info) return;
      svg.querySelectorAll('.skilltree__node').forEach((n) => n.classList.remove('is-active'));
      const node = svg.querySelector(`.skilltree__node[data-node="${id}"]`);
      if (node) node.classList.add('is-active');
      detailEyebrow.textContent = 'CATEGORY';
      detailTitle.textContent = info.title;
      detailTags.innerHTML = info.tags.map((t) => `<span class="tag">${t}</span>`).join('');
      const card = document.getElementById('cat-' + id);
      if (card) {
        card.style.transition = 'box-shadow .4s ease, border-color .4s ease';
        card.style.borderColor = 'var(--signal-gold)';
        setTimeout(() => { card.style.borderColor = ''; }, 1400);
      }
    }

    svg.addEventListener('click', (e) => {
      const node = e.target.closest('.skilltree__node');
      if (!node || node.classList.contains('skilltree__core')) return;
      select(node.dataset.node);
    });
    svg.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const node = e.target.closest('.skilltree__node');
        if (node && !node.classList.contains('skilltree__core')) select(node.dataset.node);
      }
    });
  }

  function setupEmbers() {
    if (typeof EmberField === 'undefined') return;
    const c = document.getElementById('ember-canvas');
    if (c) new EmberField(c, { count: 50, minSpeed: 8, maxSpeed: 22 });
  }

  function boot() { setupSkillTree(); setupEmbers(); }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
