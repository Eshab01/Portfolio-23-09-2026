/* ============================================================
   EMBER FIELD
   Lightweight 2D canvas particle system — drifting embers/dust
   motes rising through the hero and contact sections.
   No dependencies. Respects prefers-reduced-motion.
   ============================================================ */
(function () {
  'use strict';

  const REDUCE_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function EmberField(canvas, opts) {
    if (!canvas) return null;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.opts = Object.assign({
      count: 70,
      colors: ['255,200,120', '255,150,80', '255,110,70', '120,220,205'],
      minSize: 1.2,
      maxSize: 3.6,
      minSpeed: 10,   // px/sec upward
      maxSpeed: 32,
      drift: 18,      // horizontal sway amplitude px
      areaFrom: 'bottom' // spawn band
    }, opts || {});

    this.particles = [];
    this.w = 0; this.h = 0; this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.running = false;
    this.lastT = 0;

    this._resize = this._resize.bind(this);
    this._tick = this._tick.bind(this);

    this._resize();
    window.addEventListener('resize', this._resize);

    this._seed();

    // Reduced motion: draw a single static, sparse frame and stop.
    if (REDUCE_MOTION) {
      this._draw(0);
    } else {
      this.start();
      this._setupVisibility();
    }
  }

  EmberField.prototype._resize = function () {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.w = Math.max(rect.width, 1);
    this.h = Math.max(rect.height, 1);
    this.canvas.width = this.w * this.dpr;
    this.canvas.height = this.h * this.dpr;
    this.canvas.style.width = this.w + 'px';
    this.canvas.style.height = this.h + 'px';
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  };

  EmberField.prototype._rand = function (a, b) { return a + Math.random() * (b - a); };

  EmberField.prototype._spawn = function (atBottom) {
    const o = this.opts;
    return {
      x: this._rand(0, this.w),
      y: atBottom ? this.h + this._rand(0, 40) : this._rand(0, this.h),
      size: this._rand(o.minSize, o.maxSize),
      speed: this._rand(o.minSpeed, o.maxSpeed),
      swaySeed: this._rand(0, Math.PI * 2),
      swaySpeed: this._rand(0.3, 0.9),
      color: o.colors[Math.floor(Math.random() * o.colors.length)],
      baseAlpha: this._rand(0.25, 0.85),
      twinkleSpeed: this._rand(0.5, 1.6)
    };
  };

  EmberField.prototype._seed = function () {
    this.particles = [];
    const n = window.innerWidth < 700 ? Math.round(this.opts.count * 0.55) : this.opts.count;
    for (let i = 0; i < n; i++) this.particles.push(this._spawn(false));
  };

  EmberField.prototype._draw = function (tSec) {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.w, this.h);
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      const sway = Math.sin(tSec * p.swaySpeed + p.swaySeed) * this.opts.drift;
      const twinkle = 0.65 + 0.35 * Math.sin(tSec * p.twinkleSpeed + p.swaySeed);
      const x = p.x + sway;
      const y = p.y;
      const alpha = p.baseAlpha * twinkle;

      const g = ctx.createRadialGradient(x, y, 0, x, y, p.size * 4);
      g.addColorStop(0, `rgba(${p.color},${alpha})`);
      g.addColorStop(1, `rgba(${p.color},0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, p.size * 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = `rgba(${p.color},${Math.min(alpha + 0.2, 1)})`;
      ctx.arc(x, y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  EmberField.prototype._tick = function (now) {
    if (!this.running) return;
    if (!this.lastT) this.lastT = now;
    const dt = Math.min((now - this.lastT) / 1000, 0.05);
    this.lastT = now;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.y -= p.speed * dt;
      if (p.y < -20) {
        this.particles[i] = this._spawn(true);
      }
    }
    this._draw(now / 1000);
    this._raf = requestAnimationFrame(this._tick);
  };

  EmberField.prototype.start = function () {
    if (this.running) return;
    this.running = true;
    this.lastT = 0;
    this._raf = requestAnimationFrame(this._tick);
  };

  EmberField.prototype.stop = function () {
    this.running = false;
    if (this._raf) cancelAnimationFrame(this._raf);
  };

  EmberField.prototype._setupVisibility = function () {
    // Pause when tab is hidden or canvas is far off-screen — keeps things light.
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.stop(); else this.start();
    });
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { e.isIntersecting ? this.start() : this.stop(); });
      }, { threshold: 0.01 });
      io.observe(this.canvas);
    }
  };

  window.EmberField = EmberField;
})();
