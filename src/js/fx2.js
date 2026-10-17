/* TELESACO MADRID — fx2.js
   Segundo paquete de efectos (todas las páginas): escombros flotantes,
   texto gigante ligado al scroll, botón de subir con progreso, aviso de intro.
   Sin JS o con movimiento reducido todo se queda estático. */
(() => {
  const $  = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePtr = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const dark    = document.body.classList.contains('sub');

  /* ===== Intro: marca la sesión para no repetir la cortinilla ===== */
  try { sessionStorage.setItem('fxIntro', '1'); } catch (e) { /* sin storage */ }

  /* ===== Altura real de la barra superior (la cabecera se pega justo debajo) ===== */
  const bar = $('.topbar');
  if (bar) {
    const setBar = () => document.documentElement.style.setProperty('--tb', bar.offsetHeight + 'px');
    setBar();
    addEventListener('resize', setBar);
    document.fonts?.ready.then(setBar);
  }

  /* ===== Escombros flotando en el hero ===== */
  const fx = $('.hero__fx');
  if (fx && !reduced) {
    const n = innerWidth < 700 ? 9 : 18;
    const rnd = (a, b) => a + Math.random() * (b - a);
    for (let i = 0; i < n; i++) {
      const p = document.createElement('i');
      p.className = 'fx-debris';
      const s = rnd(6, 20);
      p.style.cssText =
        `left:${rnd(2, 98).toFixed(1)}%;top:${rnd(55, 108).toFixed(1)}%;width:${s.toFixed(1)}px;height:${(s * rnd(.5, 1)).toFixed(1)}px;` +
        `--r:${rnd(-160, 160).toFixed(0)}deg;--dx:${rnd(-70, 70).toFixed(0)}px;--dur:${rnd(14, 28).toFixed(1)}s;--dl:${rnd(-24, 0).toFixed(1)}s;` +
        `--clip:${['polygon(0 12%,100% 0,86% 100%,10% 88%)', 'polygon(14% 0,100% 20%,78% 100%,0 70%)', 'polygon(0 0,100% 30%,60% 100%)', 'none'][i % 4]};` +
        `--o:${rnd(.25, .7).toFixed(2)}`;
      p.dataset.k = i % 3;
      fx.append(p);
    }
  }

  /* ===== Texto gigante que viaja con el scroll ===== */
  const makeBig = (text, rev) => {
    const d = document.createElement('div');
    d.className = 'fx-bigtext' + (rev ? ' fx-bigtext--rev' : '');
    d.setAttribute('aria-hidden', 'true');
    const run = (text + ' ✦ ').repeat(4);
    d.innerHTML = `<div class="fx-bigtext__track"><span>${run}</span></div>`;
    return d;
  };
  const stats = $('.stats'), cta = $('.cta-final');
  if (stats) stats.after(makeBig('SACOS DE ESCOMBRO · ENTREGA EN 24 H', false));
  if (cta) cta.before(makeBig('RECOGIDA INCLUIDA · PRECIO CERRADO', true));
  // Respaldo sin animation-timeline: se mueve con el scroll por JS
  if (!CSS.supports?.('animation-timeline: view()') && !reduced) {
    const bigs = $$('.fx-bigtext');
    const run = () => bigs.forEach(b => {
      const r = b.getBoundingClientRect();
      const t = Math.min(1, Math.max(0, 1 - (r.top + r.height / 2) / innerHeight));
      const track = b.firstElementChild;
      track.style.translate = `${((b.classList.contains('fx-bigtext--rev') ? -1 : 1) * (t - .5) * -40).toFixed(1)}% 0`;
    });
    addEventListener('scroll', () => requestAnimationFrame(run), { passive: true });
    run();
  }

  /* ===== Botón de subir con anillo de progreso ===== */
  const top = document.createElement('button');
  top.className = 'fx-top';
  top.type = 'button';
  top.setAttribute('aria-label', 'Volver arriba');
  top.innerHTML =
    '<svg viewBox="0 0 48 48" aria-hidden="true"><circle class="fx-top__bg" cx="24" cy="24" r="21"/><circle class="fx-top__ring" cx="24" cy="24" r="21" pathLength="100"/></svg>' +
    '<svg class="fx-top__arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  document.body.append(top);
  const ring = $('.fx-top__ring', top);
  const upd = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? Math.min(1, scrollY / max) : 0;
    ring.style.strokeDashoffset = (100 - p * 100).toFixed(1);
    top.classList.toggle('is-on', scrollY > 700);
  };
  addEventListener('scroll', upd, { passive: true });
  upd();
  top.addEventListener('click', () => scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }));

  /* ===== Inclinación 3D de la tarjeta de precio y del logo del pie ===== */
  if (!reduced && finePtr) {
    $$('.pcard, .ft__brand').forEach(card => {
      const MAX = card.classList.contains('pcard') ? 4 : 6;
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
        card.style.transform = `perspective(1000px) rotateX(${(-py * MAX).toFixed(2)}deg) rotateY(${(px * MAX).toFixed(2)}deg)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
  }
})();

/* ===== Formulario de pedido: validación visual, progreso, número que salta ===== */
(() => {
  const calc = document.querySelector('.calc');
  if (!calc) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $id = (id) => document.getElementById(id);
  const txt = $id('calcProgTxt');
  const rules = {
    custName: (v) => v.trim().length >= 3,
    custPhone: (v) => v.replace(/\D/g, '').length >= 9,
    custAddress: (v) => v.trim().length >= 5,
  };
  const update = () => {
    let done = 0;
    for (const [id, ok] of Object.entries(rules)) {
      const el = $id(id);
      if (!el) continue;
      const good = ok(el.value || '');
      el.closest('label')?.classList.toggle('is-ok', good);
      if (good) done++;
    }
    if ($id('acceptTerms')?.checked) done++;
    calc.style.setProperty('--done', done);
    calc.classList.toggle('is-ready', done === 4);
    if (txt) txt.textContent = done === 4 ? '¡Todo listo para pagar!' : done === 0 ? 'Rellena tus datos para continuar' : 'Te faltan ' + (4 - done) + (4 - done === 1 ? ' paso' : ' pasos');
  };
  calc.addEventListener('input', update);
  calc.addEventListener('change', update);
  update();
  if (reduced) return;
  calc.querySelectorAll('.qty button').forEach((b) => b.addEventListener('click', () => {
    const q = $id('qty');
    if (!q) return;
    q.classList.remove('is-tick');
    void q.offsetWidth;
    q.classList.add('is-tick');
  }));
})();
