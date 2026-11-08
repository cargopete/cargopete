/* @ds-bundle: {"format":4,"namespace":"Foundry","components":[{"name":"Button"},{"name":"Badge"},{"name":"SectionHead"},{"name":"StatGrid"},{"name":"Readout"},{"name":"InstallLine"},{"name":"Sidebar"},{"name":"NeedleGauge"},{"name":"NixieCounter"},{"name":"ValveRadio"},{"name":"CRTTerminal"}]} */
// Foundry: the house instruments. Each one shows a real figure and moves only when that figure moves.
// The 3D ones need window.THREE (three@0.149.0, build/three.min.js) loaded first.
(function () {
  'use strict';

  var reduced = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function tok(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue('--' + name).trim();
    return v || fallback;
  }
  function needThree() {
    if (!window.THREE) throw new Error('Foundry: load three@0.149.0 build/three.min.js before using a 3D instrument');
    return window.THREE;
  }
  var SVGNS = 'http://www.w3.org/2000/svg';
  function svg(tag, attrs, parent) {
    var e = document.createElementNS(SVGNS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function fmt(v, digits) {
    if (v == null || !isFinite(v)) return '·';
    return Number(v).toLocaleString('en-GB', { maximumFractionDigits: digits == null ? 0 : digits });
  }

  // ---------- NeedleGauge: a moving-coil meter, drawn in SVG ----------
  // A damped needle eases to each new value; nothing moves between readings.
  function NeedleGauge(el, opts) {
    opts = opts || {};
    var min = opts.min || 0, max = opts.max == null ? 100 : opts.max;
    var label = opts.label || '', unit = opts.unit || '', digits = opts.digits == null ? 0 : opts.digits;
    var warnAt = opts.warnAt;
    el.innerHTML = '';
    el.classList.add('fd-gauge');
    var s = svg('svg', { viewBox: '0 0 200 132', role: 'img', 'aria-label': label + ' gauge' }, el);
    var defs = svg('defs', {}, s);
    var gid = 'fdg' + Math.random().toString(36).slice(2, 8);
    var lg = svg('linearGradient', { id: gid, x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
    svg('stop', { offset: '0', 'stop-color': '#d9bf7a' }, lg);
    svg('stop', { offset: '0.45', 'stop-color': '#a8863a' }, lg);
    svg('stop', { offset: '1', 'stop-color': '#5a4520' }, lg);
    // brass bezel, then the face, pressed in
    svg('rect', { x: 2, y: 2, width: 196, height: 128, rx: 12, fill: 'url(#' + gid + ')' }, s);
    svg('rect', { x: 8, y: 8, width: 184, height: 116, rx: 8, class: 'fd-gauge-face' }, s);
    var cx = 100, cy = 108, r = 78, a0 = -150, a1 = -30;
    var ang = function (v) { var k = Math.max(0, Math.min(1, (v - min) / (max - min))); return (a0 + (a1 - a0) * k) * Math.PI / 180; };
    var ticks = opts.ticks || 4;
    for (var i = 0; i <= ticks * 5; i++) {
      var major = i % 5 === 0;
      var a = (a0 + (a1 - a0) * i / (ticks * 5)) * Math.PI / 180;
      var r1 = r - (major ? 12 : 6);
      svg('line', { x1: cx + Math.cos(a) * r1, y1: cy + Math.sin(a) * r1, x2: cx + Math.cos(a) * r, y2: cy + Math.sin(a) * r, class: major ? 'fd-gauge-tick major' : 'fd-gauge-tick' }, s);
      if (major) {
        var t = svg('text', { x: cx + Math.cos(a) * (r - 22), y: cy + Math.sin(a) * (r - 22) + 3, 'text-anchor': 'middle', class: 'fd-gauge-num' }, s);
        t.textContent = fmt(min + (max - min) * i / (ticks * 5), 0);
      }
    }
    if (warnAt != null) {
      var aw = ang(warnAt), ae = ang(max);
      svg('path', { d: 'M' + (cx + Math.cos(aw) * (r + 1)) + ' ' + (cy + Math.sin(aw) * (r + 1)) + ' A ' + (r + 1) + ' ' + (r + 1) + ' 0 0 1 ' + (cx + Math.cos(ae) * (r + 1)) + ' ' + (cy + Math.sin(ae) * (r + 1)), class: 'fd-gauge-warn' }, s);
    }
    var lab = svg('text', { x: 18, y: 26, class: 'fd-gauge-label' }, s);
    lab.textContent = label.toUpperCase();
    var val = svg('text', { x: 182, y: 26, 'text-anchor': 'end', class: 'fd-gauge-value' }, s);
    var needle = svg('line', { x1: cx, y1: cy, x2: cx, y2: cy - r + 4, class: 'fd-gauge-needle' }, s);
    svg('circle', { cx: cx, cy: cy, r: 6, fill: 'url(#' + gid + ')' }, s);
    var shown = min, target = opts.value == null ? min : opts.value, raf = 0, vel = 0;
    function draw() {
      var a = ang(shown);
      needle.setAttribute('x2', cx + Math.cos(a) * (r - 4));
      needle.setAttribute('y2', cy + Math.sin(a) * (r - 4));
      val.textContent = fmt(target, digits) + (unit ? ' ' + unit : '');
    }
    function step() {
      // a damped spring: the needle overshoots a touch and settles, as a moving coil does
      var f = (target - shown) * 0.08;
      vel = (vel + f) * 0.72;
      shown += vel;
      draw();
      if (Math.abs(target - shown) > (max - min) * 0.0005 || Math.abs(vel) > (max - min) * 0.0005) raf = requestAnimationFrame(step);
      else { shown = target; draw(); raf = 0; }
    }
    function set(v) {
      target = v;
      if (reduced) { shown = v; draw(); return; }
      if (!raf) raf = requestAnimationFrame(step);
    }
    draw();
    set(target);
    return { set: set, dispose: function () { cancelAnimationFrame(raf); el.innerHTML = ''; } };
  }

  // ---------- shared 3D stage ----------
  function stage(el, o) {
    var THREE = needThree();
    el.classList.add('fd-stage');
    var canvas = document.createElement('canvas');
    canvas.className = 'fd-stage-canvas';
    el.appendChild(canvas);
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.95;
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(o.fov || 32, 1, 0.1, 100);
    var base = new THREE.Vector3().fromArray(o.camera || [0, 0, 8]);
    var target = new THREE.Vector3().fromArray(o.target || [0, 0, 0]);
    camera.position.copy(base);
    camera.lookAt(target);
    // lamp light on a bench: one warm key, a low fill, a faint rim
    scene.add(new THREE.HemisphereLight(0xfff1e6, 0x1a1410, 0.22));
    var key = new THREE.DirectionalLight(0xffd9bd, 1.05); key.position.set(4, 6, 7); scene.add(key);
    var rim = new THREE.DirectionalLight(0xffe6d2, 0.65); rim.position.set(-6, 3, -4); scene.add(rim);
    var lamp = new THREE.PointLight(new THREE.Color(tok('accent', '#d0704f')), 0.3, 14); lamp.position.set(0, 1, 4); scene.add(lamp);
    var px = 0, py = 0, w = 1, h = 1, raf = 0, running = false, ticks = [];
    function resize() {
      var r = el.getBoundingClientRect();
      w = Math.max(1, r.width); h = Math.max(1, r.height);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      // frame the machine to the container: whichever of its width or height binds first
      if (o.fit) {
        var vf = camera.fov * Math.PI / 180, hf = 2 * Math.atan(Math.tan(vf / 2) * camera.aspect);
        var d = Math.max((o.fit[0] / 2) / Math.tan(hf / 2), (o.fit[1] / 2) / Math.tan(vf / 2)) * (o.margin || 1.12);
        base.z = target.z + d;
      }
    }
    function frame(now) {
      var t = now / 1000;
      for (var i = 0; i < ticks.length; i++) ticks[i](t);
      camera.position.set(base.x + px * 0.6, base.y - py * 0.35, base.z);
      camera.lookAt(target);
      renderer.render(scene, camera);
      if (running && !reduced) raf = requestAnimationFrame(frame);
    }
    function once() { requestAnimationFrame(frame); }
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      px = ((e.clientX - r.left) / r.width) * 2 - 1;
      py = ((e.clientY - r.top) / r.height) * 2 - 1;
      if (reduced) once();
    });
    el.addEventListener('pointerleave', function () { px = 0; py = 0; if (reduced) once(); });
    var ro = typeof ResizeObserver === 'function' ? new ResizeObserver(function () { resize(); once(); }) : null;
    if (ro) ro.observe(el);
    var io = typeof IntersectionObserver === 'function' ? new IntersectionObserver(function (es) {
      var vis = es[0].isIntersecting;
      if (vis && !running) { running = true; raf = requestAnimationFrame(frame); }
      if (!vis) { running = false; cancelAnimationFrame(raf); }
    }) : null;
    if (io) io.observe(el); else { running = true; raf = requestAnimationFrame(frame); }
    resize();
    return {
      THREE: THREE, scene: scene, camera: camera, renderer: renderer, once: once,
      tick: function (fn) { ticks.push(fn); },
      dispose: function () { running = false; cancelAnimationFrame(raf); if (ro) ro.disconnect(); if (io) io.disconnect(); renderer.dispose(); el.removeChild(canvas); }
    };
  }

  function materials(THREE) {
    var c = function (n, f) { return new THREE.Color(tok(n, f)); };
    return {
      iron: new THREE.MeshStandardMaterial({ color: c('metal-iron', '#2a2622'), metalness: 0.55, roughness: 0.6 }),
      bakelite: new THREE.MeshStandardMaterial({ color: c('material-bakelite', '#2b1c14').multiplyScalar(0.55), metalness: 0.1, roughness: 0.42 }),
      brass: new THREE.MeshStandardMaterial({ color: c('metal-brass', '#a8863a'), metalness: 0.95, roughness: 0.32 }),
      copper: new THREE.MeshStandardMaterial({ color: c('metal-copper', '#b8734a'), metalness: 0.9, roughness: 0.38 }),
      verdigris: new THREE.MeshStandardMaterial({ color: c('metal-verdigris', '#5f8f7a'), metalness: 0.3, roughness: 0.8 }),
      glass: new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0, roughness: 0.05, transparent: true, opacity: 0.16, depthWrite: false }),
      glow: c('glow-valve', '#ff8a4c')
    };
  }

  // A soft additive halo: the lit part of a valve or a nixie digit, without a post-process.
  function haloTexture(THREE) {
    var cv = document.createElement('canvas'); cv.width = cv.height = 128;
    var g = cv.getContext('2d');
    var grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grd.addColorStop(0, 'rgba(255,255,255,1)');
    grd.addColorStop(0.25, 'rgba(255,255,255,0.45)');
    grd.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grd; g.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(cv);
  }
  function halo(THREE, tex, color, size, opacity) {
    var s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, color: color, blending: THREE.AdditiveBlending, transparent: true, opacity: opacity, depthWrite: false }));
    s.scale.set(size, size, 1);
    return s;
  }

  // ---------- NixieCounter: a row of nixie tubes ----------
  // Every cathode 0-9 sits stacked in each tube, unlit; the current digit glows.
  function NixieCounter(el, opts) {
    opts = opts || {};
    var n = opts.digits || 8;
    var S = stage(el, { camera: [0, 0.35, n * 1.15 + 2.2], target: [0, 0.1, 0], fov: 30, fit: [n * 1.0 + 0.8, 2.9] });
    var THREE = S.THREE, M = materials(THREE), hTex = haloTexture(THREE);
    var glowHex = '#' + M.glow.getHexString();
    var gap = 1.0, tubes = [];
    var font = '500 168px "JetBrains Mono", ui-monospace, monospace';
    for (var i = 0; i < n; i++) {
      var x = (i - (n - 1) / 2) * gap;
      var g = new THREE.Group(); g.position.x = x;
      var base = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.46, 0.28, 40), M.brass); base.position.y = -0.92; g.add(base);
      var ring = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.025, 10, 40), M.copper); ring.rotation.x = Math.PI / 2; ring.position.y = -0.78; g.add(ring);
      var glass = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 1.55, 40, 1, true), M.glass); glass.position.y = 0; g.add(glass);
      var cap = new THREE.Mesh(new THREE.SphereGeometry(0.4, 40, 16, 0, Math.PI * 2, 0, Math.PI / 2), M.glass); cap.position.y = 0.775; g.add(cap);
      var mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 1.2, 10, 6, true, Math.PI * 0.5, Math.PI), new THREE.MeshBasicMaterial({ color: 0x6e6a61, wireframe: true, transparent: true, opacity: 0.09 }));
      g.add(mesh);
      var cv = document.createElement('canvas'); cv.width = 128; cv.height = 192;
      var tex = new THREE.CanvasTexture(cv); tex.encoding = THREE.sRGBEncoding;
      var plane = new THREE.Mesh(new THREE.PlaneGeometry(0.66, 0.99), new THREE.MeshBasicMaterial({ map: tex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
      plane.position.y = 0.02; g.add(plane);
      var h = halo(THREE, hTex, M.glow, 1.3, 0.0); h.position.set(0, 0.02, 0.05); g.add(h);
      S.scene.add(g);
      tubes.push({ cv: cv, tex: tex, halo: h, digit: null });
    }
    function paint(t, d) {
      var g = t.cv.getContext('2d');
      g.clearRect(0, 0, 128, 192);
      g.font = font; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillStyle = 'rgba(150,135,115,0.07)';
      for (var k = 0; k < 10; k++) g.fillText(String(k), 64, 100);
      if (d != null) {
        g.shadowColor = glowHex; g.shadowBlur = 24; g.fillStyle = glowHex; g.fillText(d, 64, 100);
        g.shadowBlur = 6; g.fillStyle = '#ffe2c8'; g.fillText(d, 64, 100);
      }
      t.tex.needsUpdate = true;
      t.halo.material.opacity = d == null ? 0 : 0.3;
      t.digit = d;
    }
    function set(v) {
      var s = v == null || !isFinite(v) ? '' : String(Math.max(0, Math.floor(v)));
      s = s.slice(-n);
      var pad = n - s.length;
      for (var i = 0; i < n; i++) {
        var d = i < pad ? null : s[i - pad];
        if (tubes[i].digit !== d) paint(tubes[i], d);
      }
      S.once();
    }
    // a lit cathode trembles faintly; under reduced motion it holds still
    S.tick(function (t) { for (var i = 0; i < tubes.length; i++) if (tubes[i].digit != null) tubes[i].halo.material.opacity = 0.28 + Math.sin(t * 7 + i * 1.7) * 0.02; });
    (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(function () { for (var i = 0; i < n; i++) tubes[i].digit = undefined; set(opts.value); });
    set(opts.value);
    return { set: set, dispose: S.dispose };
  }

  // ---------- ValveRadio: a cathedral set whose dial is a live figure ----------
  function ValveRadio(el, opts) {
    opts = opts || {};
    var min = opts.min || 0, max = opts.max == null ? 100 : opts.max;
    var S = stage(el, { camera: [0, 0.5, 11], target: [0, 0.35, 0], fov: 30, fit: [3.9, 5.0] });
    var THREE = S.THREE, M = materials(THREE), hTex = haloTexture(THREE);
    var glowHex = '#' + M.glow.getHexString();
    var root = new THREE.Group(); S.scene.add(root);
    root.rotation.y = -0.32;
    // the cabinet: a rectangle with a round arch, extruded and bevelled
    var W = 1.55, H = 1.25, R = W;
    var shape = new THREE.Shape();
    shape.moveTo(-W, -H - 0.6); shape.lineTo(W, -H - 0.6); shape.lineTo(W, H - 0.6);
    shape.absarc(0, H - 0.6, R, 0, Math.PI, false); shape.lineTo(-W, -H - 0.6);
    var cab = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: 1.3, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.08, bevelSegments: 4, curveSegments: 48 }), M.bakelite);
    cab.position.z = -0.65; root.add(cab);
    var front = 0.65 + 0.09;
    // brass trim following the arch
    var trimShape = new THREE.Shape(); trimShape.absarc(0, H - 0.6, R - 0.12, 0, Math.PI, false);
    var trimPts = trimShape.getPoints(64).map(function (p) { return new THREE.Vector3(p.x, p.y, front + 0.01); });
    trimPts.unshift(new THREE.Vector3(R - 0.12, -0.35, front + 0.01)); trimPts.push(new THREE.Vector3(-(R - 0.12), -0.35, front + 0.01));
    var trim = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(trimPts), 120, 0.035, 8, false), M.brass); root.add(trim);
    // speaker cloth: woven, brick-dark, behind fretwork bars
    var cc = document.createElement('canvas'); cc.width = cc.height = 256;
    var cg = cc.getContext('2d');
    cg.fillStyle = '#3a2219'; cg.fillRect(0, 0, 256, 256);
    for (var y = 0; y < 256; y += 3) { cg.fillStyle = y % 6 ? 'rgba(208,112,79,0.10)' : 'rgba(0,0,0,0.22)'; cg.fillRect(0, y, 256, 1); }
    for (var x = 0; x < 256; x += 3) { cg.fillStyle = 'rgba(0,0,0,0.12)'; cg.fillRect(x, 0, 1, 256); }
    var clothTex = new THREE.CanvasTexture(cc); clothTex.encoding = THREE.sRGBEncoding;
    var clothShape = new THREE.Shape(); clothShape.moveTo(-(R - 0.2), -0.4); clothShape.lineTo(R - 0.2, -0.4); clothShape.absarc(0, H - 0.6, R - 0.2, 0, Math.PI, false); clothShape.lineTo(-(R - 0.2), -0.4);
    var clothGeo = new THREE.ShapeGeometry(clothShape, 48);
    var uv = clothGeo.attributes.uv; for (var i = 0; i < uv.count; i++) uv.setXY(i, (uv.getX(i) + R) / (2 * R), (uv.getY(i) + 0.4) / (H + R));
    var cloth = new THREE.Mesh(clothGeo, new THREE.MeshStandardMaterial({ map: clothTex, roughness: 0.95 })); cloth.position.z = front - 0.03; root.add(cloth);
    for (var b = -4; b <= 4; b++) {
      var hgt = Math.sqrt(Math.max(0, (R - 0.25) * (R - 0.25) - (b * 0.3) * (b * 0.3))) + H - 0.6 + 0.35;
      var bar = new THREE.Mesh(new THREE.BoxGeometry(0.07, hgt, 0.06), M.bakelite);
      bar.position.set(b * 0.3, -0.4 + hgt / 2, front); root.add(bar);
    }
    // the dial: a lit glass window with the scale painted on it, and a needle
    var dc = document.createElement('canvas'); dc.width = dc.height = 512;
    var dTex = new THREE.CanvasTexture(dc); dTex.encoding = THREE.sRGBEncoding;
    var dial = new THREE.Mesh(new THREE.CircleGeometry(0.62, 64), new THREE.MeshBasicMaterial({ map: dTex, toneMapped: false }));
    dial.position.set(0, -1.12, front + 0.02); root.add(dial);
    var bezel = new THREE.Mesh(new THREE.TorusGeometry(0.64, 0.05, 12, 64), M.brass); bezel.position.copy(dial.position); bezel.position.z += 0.02; root.add(bezel);
    var dialGlow = halo(THREE, hTex, M.glow, 2.2, 0.32); dialGlow.position.set(0, -1.12, front + 0.06); root.add(dialGlow);
    var needle = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.5, 0.01), new THREE.MeshBasicMaterial({ color: 0x1a1210 }));
    needle.geometry.translate(0, 0.25, 0);
    needle.position.set(0, -1.12 - 0.08, front + 0.05); root.add(needle);
    var a0 = -1.15, a1 = 1.15;
    function paintDial(v) {
      var g = dc.getContext('2d');
      var grd = g.createRadialGradient(256, 256, 20, 256, 256, 256);
      grd.addColorStop(0, '#ffd9b8'); grd.addColorStop(0.75, glowHex); grd.addColorStop(1, '#7a3217');
      g.fillStyle = grd; g.fillRect(0, 0, 512, 512);
      g.strokeStyle = 'rgba(40,20,12,0.85)'; g.fillStyle = 'rgba(40,20,12,0.9)';
      g.lineWidth = 3; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.font = '500 30px "JetBrains Mono", ui-monospace, monospace';
      for (var i = 0; i <= 20; i++) {
        var a = a0 + (a1 - a0) * i / 20 - Math.PI / 2, major = i % 5 === 0;
        var r1 = major ? 168 : 186, r2 = 206;
        g.beginPath(); g.moveTo(256 + Math.cos(a) * r1, 286 + Math.sin(a) * r1); g.lineTo(256 + Math.cos(a) * r2, 286 + Math.sin(a) * r2); g.stroke();
        if (major) g.fillText(fmt(min + (max - min) * i / 20, 0), 256 + Math.cos(a) * 130, 286 + Math.sin(a) * 130);
      }
      g.font = '600 46px "JetBrains Mono", ui-monospace, monospace';
      g.fillText(fmt(v, opts.digits || 0), 256, 372);
      g.font = '500 22px "JetBrains Mono", ui-monospace, monospace';
      g.fillText((opts.label || '').toUpperCase(), 256, 418);
      dTex.needsUpdate = true;
    }
    // knobs: knurled brass, the right one turns with the value
    function knob(xp) {
      var k = new THREE.Group();
      var body = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.29, 0.22, 36), M.brass); body.rotation.x = Math.PI / 2; k.add(body);
      for (var i = 0; i < 18; i++) { var r = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.2, 0.05), M.copper); var a = i / 18 * Math.PI * 2; r.position.set(Math.cos(a) * 0.28, Math.sin(a) * 0.28, 0); r.rotation.z = a; k.add(r); }
      var mark = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.16, 0.02), new THREE.MeshBasicMaterial({ color: 0x1a1210 })); mark.position.set(0, 0.12, 0.12); k.add(mark);
      k.position.set(xp, -1.2, front + 0.11); root.add(k);
      return k;
    }
    var kL = knob(-1.12), kR = knob(1.12);
    kL.rotation.z = 0.6;
    // three valves on the shelf behind the arch, filaments lit
    var valves = [];
    for (var v = -1; v <= 1; v++) {
      var vg = new THREE.Group(); vg.position.set(v * 0.62, H - 0.6 + R - 0.05 + 0.02, -0.15);
      var sock = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.19, 0.12, 24), M.bakelite); vg.add(sock);
      var env = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.15, 0.62, 28, 1, true), M.glass); env.position.y = 0.37; vg.add(env);
      var top = new THREE.Mesh(new THREE.SphereGeometry(0.14, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), M.glass); top.position.y = 0.68; vg.add(top);
      var plate = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.34, 0.08), M.iron); plate.position.y = 0.36; vg.add(plate);
      var fil = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.3, 6), new THREE.MeshBasicMaterial({ color: M.glow, toneMapped: false })); fil.position.set(0, 0.36, 0.06); vg.add(fil);
      var fh = halo(THREE, hTex, M.glow, 0.8, 0.5); fh.position.set(0, 0.37, 0.08); vg.add(fh);
      root.add(vg); valves.push(fh);
    }
    var shown = opts.value == null ? min : opts.value, goal = shown;
    function place() {
      var k = Math.max(0, Math.min(1, (shown - min) / (max - min)));
      needle.rotation.z = -(a0 + (a1 - a0) * k);
      kR.rotation.z = -k * Math.PI * 1.6;
    }
    S.tick(function (t) {
      if (Math.abs(goal - shown) > (max - min) * 0.0005) { shown += (goal - shown) * 0.08; place(); }
      for (var i = 0; i < valves.length; i++) valves[i].material.opacity = 0.46 + Math.sin(t * 3.1 + i * 2.1) * 0.04;
    });
    function set(v) { goal = v; paintDial(v); if (reduced) { shown = v; place(); } S.once(); }
    (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(function () { paintDial(goal); S.once(); });
    paintDial(goal); place();
    return { set: set, dispose: S.dispose };
  }

  // ---------- CRTTerminal: a phosphor screen in a bakelite case ----------
  function CRTTerminal(el, opts) {
    opts = opts || {};
    var S = stage(el, { camera: [0, 0.15, 7.2], target: [0, 0.05, 0], fov: 32, fit: [3.9, 3.4] });
    var THREE = S.THREE, M = materials(THREE), hTex = haloTexture(THREE);
    var glowHex = '#' + M.glow.getHexString();
    var root = new THREE.Group(); root.rotation.y = 0.28; S.scene.add(root);
    var body = new THREE.Mesh(new THREE.BoxGeometry(3.4, 2.7, 0.7), M.bakelite); root.add(body);
    var back = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 1.75, 1.7, 4, 1), M.iron);
    back.rotation.x = Math.PI / 2; back.rotation.y = Math.PI / 4; back.position.z = -1.15; root.add(back);
    var stand = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.18, 1.6), M.iron); stand.position.set(0, -1.45, -0.35); root.add(stand);
    // the screen: a gently bulged glass over a painted phosphor canvas
    var sc = document.createElement('canvas'); sc.width = 1024; sc.height = 768;
    var sTex = new THREE.CanvasTexture(sc); sTex.encoding = THREE.sRGBEncoding;
    var geo = new THREE.PlaneGeometry(2.7, 2.02, 24, 18);
    var pos = geo.attributes.position;
    for (var i = 0; i < pos.count; i++) { var x = pos.getX(i), y = pos.getY(i); pos.setZ(i, 0.035 * (1 - (x * x) / 1.9 - (y * y) / 1.1)); }
    geo.computeVertexNormals();
    var screen = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ map: sTex, toneMapped: false })); screen.position.set(0, 0.08, 0.36); root.add(screen);
    var glass = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0, roughness: 0.08, transparent: true, opacity: 0.08 })); glass.position.set(0, 0.08, 0.37); root.add(glass);
    // brass bezel, four bars
    [[0, 1.13, 2.9, 0.1], [0, -0.97, 2.9, 0.1], [-1.4, 0.08, 0.1, 2.2], [1.4, 0.08, 0.1, 2.2]].forEach(function (b) {
      var m = new THREE.Mesh(new THREE.BoxGeometry(b[2], b[3], 0.08), M.brass); m.position.set(b[0], b[1], 0.38); root.add(m);
    });
    var lamp = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 8), new THREE.MeshBasicMaterial({ color: M.glow, toneMapped: false })); lamp.position.set(1.35, -1.17, 0.36); root.add(lamp);
    var lampHalo = halo(THREE, hTex, M.glow, 0.5, 0.6); lampHalo.position.set(1.35, -1.17, 0.4); root.add(lampHalo);
    var screenGlow = halo(THREE, hTex, M.glow, 5.2, 0.12); screenGlow.position.set(0, 0.08, 0.6); root.add(screenGlow);
    var lines = (opts.lines || []).slice(-12), title = opts.title || '';
    function paint(flick) {
      var g = sc.getContext('2d');
      g.fillStyle = '#120a07'; g.fillRect(0, 0, 1024, 768);
      g.font = '500 34px "JetBrains Mono", ui-monospace, monospace'; g.textBaseline = 'top';
      g.shadowColor = glowHex; g.shadowBlur = 14;
      if (title) { g.fillStyle = '#ffd2b4'; g.fillText(title, 96, 70); }
      for (var i = 0; i < lines.length; i++) {
        g.fillStyle = i === lines.length - 1 ? '#ffe2c8' : glowHex;
        g.globalAlpha = 0.55 + 0.45 * (i + 1) / lines.length;
        g.fillText(String(lines[i]).slice(0, 40), 96, (title ? 134 : 80) + i * 46);
      }
      g.globalAlpha = 1; g.shadowBlur = 0;
      if (flick) { g.fillStyle = glowHex; g.fillRect(96, (title ? 134 : 80) + lines.length * 46 + 4, 20, 34); }
      for (var y = 0; y < 768; y += 4) { g.fillStyle = 'rgba(0,0,0,0.28)'; g.fillRect(0, y, 1024, 2); }
      var v = g.createRadialGradient(512, 384, 200, 512, 384, 640);
      v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,0.45)');
      g.fillStyle = v; g.fillRect(0, 0, 1024, 768);
      sTex.needsUpdate = true;
    }
    var cursor = true, last = 0;
    S.tick(function (t) { var c = Math.floor(t * 1.6) % 2 === 0; if (c !== cursor) { cursor = c; paint(cursor); } });
    function push(line) { lines.push(line); if (lines.length > 12) lines.shift(); paint(true); S.once(); }
    function setLines(ls) { lines = ls.slice(-12); paint(true); S.once(); }
    (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(function () { paint(true); S.once(); });
    paint(true);
    return { push: push, setLines: setLines, dispose: S.dispose };
  }

  window.Foundry = {
    version: '1.0.0',
    NeedleGauge: NeedleGauge,
    NixieCounter: NixieCounter,
    ValveRadio: ValveRadio,
    CRTTerminal: CRTTerminal
  };
})();
