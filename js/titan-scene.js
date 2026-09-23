/* ============================================================
   COLOSSAL SILHOUETTE — hero background figure
   An original, low-poly, silhouette-only colossal humanoid.
   Not a reproduction of any specific character design — built
   from primitive geometry as an atmospheric background element.
   Idle breathing sway + head/gaze tracking on pointer move.
   Falls back gracefully if WebGL is unavailable.
   ============================================================ */
(function () {
  'use strict';

  const canvas = document.getElementById('titan-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const REDUCE_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
  } catch (e) {
    canvas.style.display = 'none';
    return;
  }
  if (!renderer) { canvas.style.display = 'none'; return; }

  const hero = canvas.parentElement;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(dpr);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0b0a10, 8, 20);

  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0.6, 10);
  camera.lookAt(0.6, 1.4, 0);

  // ---- Lighting ----
  const ambient = new THREE.AmbientLight(0x4a2a5c, 0.55);
  scene.add(ambient);

  const rim = new THREE.DirectionalLight(0xff9a52, 1.6);
  rim.position.set(-4, 6, -6);
  scene.add(rim);

  const fillLight = new THREE.DirectionalLight(0x3a2a55, 0.4);
  fillLight.position.set(5, 2, 4);
  scene.add(fillLight);

  // ---- Materials ----
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x120d10, roughness: 0.95, metalness: 0.05 });
  const eyeMat = new THREE.MeshBasicMaterial({ color: 0xffb627 });
  const eyeGlowMat = new THREE.MeshBasicMaterial({ color: 0xffb627, transparent: true, opacity: 0.35 });

  // ---- Build the figure procedurally ----
  const titan = new THREE.Group();

  const torsoGeo = new THREE.CylinderGeometry(1.55, 1.15, 3.1, 8, 1);
  const torso = new THREE.Mesh(torsoGeo, bodyMat);
  torso.position.y = 3.2;
  titan.add(torso);

  const neckGeo = new THREE.CylinderGeometry(0.55, 0.7, 0.55, 8);
  const neck = new THREE.Mesh(neckGeo, bodyMat);
  neck.position.y = 4.95;
  titan.add(neck);

  const headGroup = new THREE.Group();
  headGroup.position.y = 5.75;
  const headGeo = new THREE.SphereGeometry(1.05, 9, 7);
  headGeo.scale(1, 1.12, 0.92);
  const head = new THREE.Mesh(headGeo, bodyMat);
  headGroup.add(head);

  // Eyes: small bright core + soft additive glow behind it
  [-0.42, 0.42].forEach((ex) => {
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.09, 6, 6), eyeMat);
    core.position.set(ex, 0.05, 0.92);
    headGroup.add(core);
    const glow = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 8), eyeGlowMat);
    glow.position.copy(core.position);
    headGroup.add(glow);
  });
  titan.add(headGroup);

  function buildLimb(shoulderX, shoulderY, mirror) {
    const pivot = new THREE.Group();
    pivot.position.set(shoulderX, shoulderY, 0);

    const upperGeo = new THREE.CylinderGeometry(0.42, 0.36, 1.9, 7);
    const upper = new THREE.Mesh(upperGeo, bodyMat);
    upper.position.y = -0.95;
    upper.rotation.z = mirror * 0.12;
    pivot.add(upper);

    const elbowPivot = new THREE.Group();
    elbowPivot.position.y = -1.9;
    upper.add(elbowPivot);

    const foreGeo = new THREE.CylinderGeometry(0.34, 0.26, 1.7, 7);
    const fore = new THREE.Mesh(foreGeo, bodyMat);
    fore.position.y = -0.85;
    fore.rotation.z = mirror * 0.22;
    elbowPivot.add(fore);

    return pivot;
  }

  const leftArm = buildLimb(-1.85, 4.2, -1);
  const rightArm = buildLimb(1.85, 4.2, 1);
  titan.add(leftArm, rightArm);

  function buildLeg(hipX) {
    const pivot = new THREE.Group();
    pivot.position.set(hipX, 1.7, 0);
    const thighGeo = new THREE.CylinderGeometry(0.62, 0.52, 2.3, 7);
    const thigh = new THREE.Mesh(thighGeo, bodyMat);
    thigh.position.y = -1.15;
    pivot.add(thigh);
    const shinGeo = new THREE.CylinderGeometry(0.5, 0.4, 2.2, 7);
    const shin = new THREE.Mesh(shinGeo, bodyMat);
    shin.position.y = -3.3;
    pivot.add(shin);
    return pivot;
  }
  titan.add(buildLeg(-0.85), buildLeg(0.85));

  // Shoulder slabs for a heavier silhouette
  [-1, 1].forEach((side) => {
    const slab = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.6, 1.15), bodyMat);
    slab.position.set(side * 1.9, 4.35, 0);
    slab.rotation.z = side * 0.15;
    titan.add(slab);
  });

  titan.scale.set(1.35, 1.35, 1.35);
  titan.position.set(2.5, -6.6, -1.5);
  titan.rotation.y = -0.35;
  scene.add(titan);

  // ---- Resize handling ----
  function resize() {
    const w = hero.clientWidth, h = hero.clientHeight;
    camera.aspect = w / Math.max(h, 1);
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, true);
  }
  resize();
  window.addEventListener('resize', resize);

  // ---- Pointer tracking (subtle) ----
  let targetX = 0, targetY = 0, curX = 0, curY = 0;
  window.addEventListener('pointermove', (e) => {
    targetX = (e.clientX / window.innerWidth) * 2 - 1;
    targetY = (e.clientY / window.innerHeight) * 2 - 1;
  }, { passive: true });

  // ---- Animation loop ----
  const clock = new THREE.Clock();
  let raf;

  function animate() {
    raf = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    if (!REDUCE_MOTION) {
      curX += (targetX - curX) * 0.03;
      curY += (targetY - curY) * 0.03;

      headGroup.rotation.y = curX * 0.28;
      headGroup.rotation.x = curY * 0.12;

      titan.rotation.y = -0.35 + curX * 0.05;
      torso.rotation.z = Math.sin(t * 0.5) * 0.015;
      titan.position.y = -6.6 + Math.sin(t * 0.6) * 0.08;

      leftArm.rotation.x = Math.sin(t * 0.45) * 0.05;
      rightArm.rotation.x = Math.sin(t * 0.45 + Math.PI) * 0.05;

      const blink = 0.85 + 0.15 * Math.sin(t * 1.3);
      eyeGlowMat.opacity = 0.28 * blink;
    }

    renderer.render(scene, camera);
  }

  // Only render when the hero is actually visible — saves battery/CPU when scrolled away.
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          if (!raf) animate();
        } else {
          if (raf) { cancelAnimationFrame(raf); raf = null; }
        }
      });
    }, { threshold: 0.01 });
    io.observe(canvas);
  } else {
    animate();
  }

  if (REDUCE_MOTION) {
    resize();
    renderer.render(scene, camera);
    if (raf) cancelAnimationFrame(raf);
  }
})();
