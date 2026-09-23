/* ============================================================
   PARTIALS — icon sprite, nav, and footer, injected into every
   page from #icon-sprite-root / #nav-root / #footer-root.
   Single source of truth so nav/footer never drift across the
   8 pages. Runs synchronously (script sits at end of body, so
   the placeholder divs already exist in the DOM).
   ============================================================ */
(function () {
  'use strict';

  const PAGE = document.body.getAttribute('data-page') || 'home';

  /* ---------------- Icon sprite ---------------- */
  const ICONS = `
  <symbol id="i-code" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="8 5 2 12 8 19"/><polyline points="16 5 22 12 16 19"/></symbol>
  <symbol id="i-layout" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="1"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="9" x2="9" y2="21"/></symbol>
  <symbol id="i-server" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></symbol>
  <symbol id="i-tool" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 1 0-5.4 5.4L2 19l3 3 7.3-7.3a4 4 0 0 0 5.4-5.4z"/></symbol>
  <symbol id="i-cpu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="12" height="12" rx="1"/><rect x="10" y="10" width="4" height="4"/><line x1="12" y1="1" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="23"/><line x1="1" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="23" y2="12"/></symbol>
  <symbol id="i-link" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.2 1.2"/><path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.2-1.2"/></symbol>
  <symbol id="i-mail" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="1"/><path d="m2 6 10 7 10-7"/></symbol>
  <symbol id="i-phone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 3h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 12l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 2 5a2 2 0 0 1 2-2Z"/></symbol>
  <symbol id="i-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></symbol>
  <symbol id="i-download" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><polyline points="7 11 12 16 17 11"/><path d="M4 18v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></symbol>
  <symbol id="i-arrow-up-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></symbol>
  <symbol id="i-trophy" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0Z"/><path d="M7 5H4a3 3 0 0 0 3 5"/><path d="M17 5h3a3 3 0 0 1-3 5"/></symbol>
  <symbol id="i-users" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></symbol>
  <symbol id="i-award" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M8.2 13.5 7 22l5-3 5 3-1.2-8.5"/></symbol>
  <symbol id="i-heart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 8.6c0 4.4-8.8 10.4-8.8 10.4S3.2 13 3.2 8.6a4.6 4.6 0 0 1 8.8-1.9 4.6 4.6 0 0 1 8.8 1.9Z"/></symbol>
  <symbol id="i-briefcase" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></symbol>
  <symbol id="i-file" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><polyline points="14 2 14 8 20 8"/></symbol>
  <symbol id="i-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></symbol>
  <symbol id="i-chevron-down" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 8 12 16 20 8"/></symbol>
  <symbol id="i-target" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></symbol>
  <symbol id="i-map" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></symbol>
  <symbol id="i-radio" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49M7.76 16.24a6 6 0 0 1 0-8.49M19.07 4.93a10 10 0 0 1 0 14.14M4.93 19.07a10 10 0 0 1 0-14.14"/></symbol>
  <symbol id="i-star" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/></symbol>
  <symbol id="i-terminal" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></symbol>
  <symbol id="i-briefcase2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><line x1="2" y1="13" x2="22" y2="13"/></symbol>
  `;

  const spriteRoot = document.getElementById('icon-sprite-root');
  if (spriteRoot) spriteRoot.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">${ICONS}</svg>`;

  /* ---------------- Nav ---------------- */
  const NAV_ITEMS = [
    { key: 'about', href: 'about.html', label: 'Record' },
    { key: 'skills', href: 'skills.html', label: 'Arsenal' },
    { key: 'experience', href: 'experience.html', label: 'Campaigns' },
    { key: 'projects', href: 'projects.html', label: 'Projects' },
    { key: 'venture', href: 'venture.html', label: 'Venture' },
    { key: 'achievements', href: 'achievements.html', label: 'Honors' },
    { key: 'contact', href: 'contact.html', label: 'Contact' }
  ];

  const navRoot = document.getElementById('nav-root');
  if (navRoot) {
    const linksHtml = NAV_ITEMS.map((item) =>
      `<li><a href="${item.href}" class="nav__link${PAGE === item.key ? ' is-current' : ''}">${item.label}</a></li>`
    ).join('');

    navRoot.innerHTML = `
    <nav class="nav" id="nav">
      <div class="container">
        <a href="index.html" class="crest" aria-label="Eshab Sachan — home">
          <svg class="crest__mark" viewBox="0 0 40 40" fill="none">
            <path d="M20 4 L34 12 L31 30 L20 37 L9 30 L6 12 Z" stroke="url(#crestGrad)" stroke-width="1.6"/>
            <path d="M20 4 L20 37" stroke="url(#crestGrad)" stroke-width="0.8" opacity="0.5"/>
            <path d="M13 14 L18 20 L13 27" stroke="var(--signal-gold)" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M27 14 L22 20 L27 27" stroke="var(--signal-gold)" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            <defs><linearGradient id="crestGrad" x1="0" y1="0" x2="40" y2="40"><stop offset="0" stop-color="#ff7a3c"/><stop offset="1" stop-color="#b3243d"/></linearGradient></defs>
          </svg>
          <span class="crest__name">ESHAB <span>SACHAN</span></span>
        </a>
        <ul class="nav__links" id="navLinks">
          ${linksHtml}
          <li><a href="assets/resume/Eshab_Sachan_Resume.pdf" download class="btn btn--primary btn--sm">Résumé</a></li>
        </ul>
        <button class="nav__burger" id="navBurger" aria-label="Toggle menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>`;
  }

  /* ---------------- Footer ---------------- */
  const footerRoot = document.getElementById('footer-root');
  if (footerRoot) {
    footerRoot.innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="site-footer__grid">
          <div>
            <a href="index.html" class="crest">
              <svg class="crest__mark" viewBox="0 0 40 40" fill="none" width="34" height="34">
                <path d="M20 4 L34 12 L31 30 L20 37 L9 30 L6 12 Z" stroke="var(--signal-gold)" stroke-width="1.6"/>
              </svg>
              <span class="crest__name">ESHAB <span>SACHAN</span></span>
            </a>
            <p class="site-footer__brand-desc">Full-stack developer and B2B operator based in Mohali, Punjab. Building software and closing industrial accounts — usually on the same day.</p>
          </div>
          <div>
            <div class="site-footer__col-title">SITE MAP</div>
            <div class="site-footer__links">
              <a href="about.html">The Record</a>
              <a href="skills.html">The Arsenal</a>
              <a href="experience.html">Campaign Log</a>
              <a href="projects.html">Field Reports</a>
              <a href="venture.html">The Venture</a>
              <a href="achievements.html">Commendations</a>
            </div>
          </div>
          <div>
            <div class="site-footer__col-title">ELSEWHERE</div>
            <div class="site-footer__links">
              <a href="https://github.com/Eshab01" target="_blank" rel="noopener">GitHub</a>
              <a href="https://netflix-portfolio-iota.vercel.app/" target="_blank" rel="noopener">Codeflix (prior work)</a>
              <a href="#" id="footerLinkedin">LinkedIn</a>
            </div>
          </div>
          <div>
            <div class="site-footer__col-title">GET IN TOUCH</div>
            <div class="site-footer__links">
              <a href="contact.html">Open a channel</a>
              <a href="assets/resume/Eshab_Sachan_Resume.pdf" download>Download résumé</a>
              <a href="mailto:your.email@example.com">Email</a>
            </div>
          </div>
        </div>
        <div class="site-footer__bottom">
          <span class="site-footer__meta">© 2026 Eshab Sachan. Built by hand, animated with anime.js &amp; three.js.</span>
          <a href="#top" class="back-to-top">Back to top <svg width="12" height="12" style="transform:rotate(180deg)"><use href="#i-chevron-down"/></svg></a>
        </div>
      </div>
    </footer>`;
    const fl = document.getElementById('footerLinkedin');
    if (fl) fl.addEventListener('click', (e) => e.preventDefault());
  }
})();
