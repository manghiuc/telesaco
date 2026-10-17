/* TELESACO MADRID — fx.js
   Capa de efectos: reveals, titulares partidos, spotlight, tilt, imanes,
   indicador del selector, scrollspy, parallax y avisos.
   Todo se degrada solo: sin JS o con movimiento reducido la web es estática. */

(() => {
  const $  = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  const reduced  = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePtr  = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const wide     = () => innerWidth >= 900;
  const clamp    = (v, a, b) => Math.min(b, Math.max(a, v));
  const hasIO    = 'IntersectionObserver' in window;

  /* ===== Aviso inline (sustituye al alert) ===== */
  const toastEl = $('#toast');
  let toastTimer;
  window.fxToast = (msg) => {
    if (!toastEl) return alert(msg);
    toastEl.textContent = msg;
    toastEl.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-on'), 5200);
  };

  /* ===== Rebote del total al recalcular ===== */
  let bumpTimer;
  window.fxBump = (el) => {
    if (!el || reduced) return;
    el.classList.remove('is-bump');
    void el.offsetWidth; // reinicia la animación
    el.classList.add('is-bump');
    clearTimeout(bumpTimer);
    bumpTimer = setTimeout(() => el.classList.remove('is-bump'), 750);
  };

  /* ===== Barra de progreso de scroll ===== */
  const bar = $('.fx-progress i');
  const nativeTimeline = window.CSS?.supports?.('animation-timeline: scroll()');
  const setProgress = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? clamp(scrollY / max, 0, 1) : 0})`;
  };
  if (bar && (reduced || !nativeTimeline)) {
    addEventListener('scroll', setProgress, { passive: true });
    addEventListener('resize', setProgress);
    setProgress();
  }

  /* ===== Scrollspy del menú ===== */
  const links = $$('.hd__nav a[data-link]');
  const spyMap = new Map();
  links.forEach(a => {
    const sec = $(a.getAttribute('href'));
    if (sec) spyMap.set(sec, a);
  });
  if (hasIO && spyMap.size) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        links.forEach(l => l.classList.remove('is-active'));
        spyMap.get(en.target)?.classList.add('is-active');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    spyMap.forEach((_, sec) => spy.observe(sec));
    // al volver arriba (hero) no queda nada activo
    addEventListener('scroll', () => {
      if (scrollY < 200) links.forEach(l => l.classList.remove('is-active'));
    }, { passive: true });
  }

  /* ===== Selector con indicador deslizante ===== */
  $$('.seg').forEach(seg => {
    const ind = document.createElement('span');
    ind.className = 'seg__ind';
    ind.setAttribute('aria-hidden', 'true');
    seg.prepend(ind);

    const place = (instant) => {
      const on = $('button.is-on', seg);
      if (!on) return;
      if (instant) seg.classList.add('no-anim');
      ind.style.width  = on.offsetWidth + 'px';
      ind.style.height = on.offsetHeight + 'px';
      ind.style.transform = `translate(${on.offsetLeft}px, ${on.offsetTop}px)`;
      if (!seg.classList.contains('has-ind')) seg.classList.add('has-ind');
      if (instant) { void ind.offsetWidth; seg.classList.remove('no-anim'); }
    };

    place(true);
    // solo se observan los botones: tocar clases del propio .seg no puede realimentar el observer
    const mo = new MutationObserver(() => place(false));
    $$('button', seg).forEach(b => mo.observe(b, { attributes: true, attributeFilter: ['class'] }));
    addEventListener('resize', () => place(true));
    document.fonts?.ready.then(() => place(true));
  });

  /* ===== Titulares partidos por palabra ===== */
  const splitWords = (root, skip) => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: n => (n.nodeValue.trim() && !(skip && n.parentElement.closest(skip)))
        ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    let wi = 0;
    nodes.forEach(node => {
      const frag = document.createDocumentFragment();
      let first = true;
      node.nodeValue.split(/(\s+)/).forEach(part => {
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.append(' '); first = false; return; }
        if (first && /^[,.;:!?…)»]+$/.test(part) && node.previousSibling?.nodeType === 1) {
          const last = [...node.previousSibling.querySelectorAll('.fx-w > i')].pop();
          if (last) { last.append(part); first = false; return; }
        }
        first = false;
        const w = document.createElement('span');
        w.className = 'fx-w';
        const i = document.createElement('i');
        i.textContent = part;
        i.style.setProperty('--wi', wi++);
        w.append(i);
        frag.append(w);
      });
      node.replaceWith(frag);
    });
  };

  const heads = $$('.hero__title, .sec-head .h2, .cta-final .h2, .muni-section > h2');
  const headIO = hasIO && !reduced ? new IntersectionObserver((entries, o) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add('is-split-in');
      o.unobserve(en.target);
    });
  }, { threshold: 0.3, rootMargin: '0px 0px -6% 0px' }) : null;

  heads.forEach(h => {
    if (reduced || !hasIO) {
      h.classList.add('is-split', 'is-split-in');
      return;
    }
    splitWords(h, '.hero__price');
    h.classList.add('is-split');
    if (h.classList.contains('hero__title')) {
      h.style.setProperty('--d', '250ms');
      requestAnimationFrame(() => requestAnimationFrame(() => h.classList.add('is-split-in')));
    } else {
      headIO.observe(h);
    }
  });

  /* ===== Reveals por scroll con stagger ===== */
  // [selector, variante, escalonado por hermano, retraso base]
  const REVEALS = [
    ['.sec-head .kicker',             'up',    0, 0],
    ['.sec-head .lead',               'up',    0, 3],
    ['.prods > .prod',                'up',    1, 0],
    ['.stats .stat',                  'up',    1, 0],
    ['.saco-flat',                    'scale', 0, 0],
    ['.towns',                        'up',    0, 0],
    ['.towns__stat',                  'pop',   1, 0],
    ['.towns__grid > li',             'up',    .45, 0],
    ['.zones__kicker',                'up',    0, 0],
    ['.radio-card',                   'up',    1, 0],
    ['.zones__more',                  'up',    0, 0],
    ['.compare__hint',                'up',    0, 0],
    ['.compare__table .row',          'fade',  .5, 0],
    ['.steps__grid .step',            'up',    1.2, 0],
    ['.allowed__col--ok',             'left',  0, 0],
    ['.allowed__col--no',             'right', 0, 0],
    ['.rev',                          'up',    1, 0],
    ['.faq__list details',            'up',    .6, 0],
    ['.cta-final__inner > p',         'up',    0, 0],
    ['.cta-final__actions',           'up',    0, 2],
    ['.ft__cols > div',               'up',    1, 0],
    // subpáginas
    ['.muni-section > .lead',         'up',    0, 0],
    ['.muni-section > h3',            'up',    0, 0],
    ['.tldr',                         'scale', 0, 0],
    ['.tldr li',                      'left',  .6, 2],
    ['.inline-cta',                   'scale', 0, 0],
    ['.price-table',                  'up',    0, 0],
    ['.price-table tbody tr',         'fade',  .5, 3],
    ['.muni-section ol li',           'left',  .8, 0],
    ['.barrios .barrio',              'pop',   .35, 0],
    ['.vs__card',                     'up',    1.4, 0],
    ['.share',                        'up',    0, 0],
    ['.faq-item',                     'up',    .6, 0],
    ['.vecinos a',                    'pop',   .3, 0],
    ['.legal .badge, .legal .meta',   'up',    1, 0],
    ['.legal h2',                     'left',  0, 0],
    ['.legal .info-box',              'scale', 0, 0],
    ['.legal h2 + p, .legal h2 + ul', 'up',    0, 1],
  ];
  // el logo del pie usa su propio destape (clip-path), solo necesita la marca de visibilidad
  const brandFoot = $('.ft__brand');

  const revealIO = hasIO && !reduced ? new IntersectionObserver((entries, o) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add('is-in');
      o.unobserve(en.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' }) : null;

  if (revealIO) {
    REVEALS.forEach(([sel, variant, step, base]) => {
      $$(sel).forEach(el => {
        // el escalonado se cuenta entre hermanos del mismo tipo, con tope
        const siblings = el.parentElement ? [...el.parentElement.children].filter(c => c.matches(sel)) : [el];
        el.dataset.reveal = variant;
        el.style.setProperty('--i', base + Math.min(siblings.indexOf(el), 9) * step);
        revealIO.observe(el);
      });
    });

    // listas que se encadenan dentro de su tarjeta
    $$('.radio-card ul, .allowed__col ul').forEach(ul =>
      [...ul.children].forEach((li, i) => li.style.setProperty('--li', Math.min(i, 24))));

    if (brandFoot) { brandFoot.classList.add('is-armed'); revealIO.observe(brandFoot); }

    // Red de seguridad: lo que ya está en pantalla al cargar se muestra sí o sí
    addEventListener('load', () => setTimeout(() => {
      $$('[data-reveal]:not(.is-in)').forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.top < innerHeight && r.bottom > 0) el.classList.add('is-in');
      });
    }, 1200));
  }

  if (!revealIO) brandFoot?.classList.add('is-in');

  /* ===== Parallax suave del hero ===== */
  const para = $$('[data-parallax]');
  const hero = $('.hero');
  if (para.length && hero && !reduced) {
    let ticking = false;
    const run = () => {
      ticking = false;
      if (!wide() || scrollY > hero.offsetHeight + 200) return;
      para.forEach(el => {
        el.style.translate = `0 ${(scrollY * parseFloat(el.dataset.parallax)).toFixed(1)}px`;
      });
    };
    addEventListener('scroll', () => {
      if (!ticking) { ticking = true; requestAnimationFrame(run); }
    }, { passive: true });
    run();
  }

  if (!reduced) $('.hero__cta .btn--primary')?.classList.add('btn--pulse');

  /* ===== Cintas: aceleran con la velocidad del scroll ===== */
  const tracks = $$('.hero__stripe__track');
  if (tracks.length && !reduced && 'getAnimations' in document) {
    const anims = tracks.map(t => t.getAnimations()[0]).filter(Boolean);
    let lastY = scrollY, boost = 0, rafId = 0;
    const spin = () => {
      boost *= 0.92;
      const rate = 1 + Math.min(boost, 9);
      anims.forEach(a => { a.playbackRate = rate; });
      rafId = boost > 0.02 ? requestAnimationFrame(spin) : 0;
      if (!rafId) anims.forEach(a => { a.playbackRate = 1; });
    };
    addEventListener('scroll', () => {
      boost = Math.min(boost + Math.abs(scrollY - lastY) * 0.05, 9);
      lastY = scrollY;
      if (!rafId) rafId = requestAnimationFrame(spin);
    }, { passive: true });
  }

  /* ===== Onda al pulsar botones ===== */
  if (!reduced) {
    document.addEventListener('pointerdown', e => {
      const b = e.target.closest?.('.btn, .inline-cta__btn, .share__btn');
      if (!b) return;
      const r = b.getBoundingClientRect(), d = Math.max(r.width, r.height) * 2;
      const s = document.createElement('span');
      s.className = 'fx-ripple';
      s.style.cssText = 'width:' + d + 'px;height:' + d + 'px;left:' + (e.clientX - r.left - d / 2) + 'px;top:' + (e.clientY - r.top - d / 2) + 'px';
      b.append(s);
      s.addEventListener('animationend', () => s.remove());
    });
  }

  /* ===== A partir de aquí, solo con ratón/trackpad ===== */
  if (reduced || !finePtr) return;

  /* — Foco amarillo que persigue al cursor en el hero — */
  const glow = $('.hero__glow');
  if (hero && glow) {
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const loop = () => {
      cx += (tx - cx) * 0.14;
      cy += (ty - cy) * 0.14;
      glow.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0)`;
      raf = (Math.abs(tx - cx) > .4 || Math.abs(ty - cy) > .4) ? requestAnimationFrame(loop) : 0;
    };
    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      hero.classList.add('is-hover');
      if (!raf) raf = requestAnimationFrame(loop);
    });
    hero.addEventListener('pointerleave', () => hero.classList.remove('is-hover'));
  }

  /* — Spotlight que sigue al cursor dentro de tarjetas — */
  const SPOT = '.prod, .radio-card, .step, .rev, .allowed__col, .towns, .town, .saco-flat, .compare__table, .tldr, .vs__card, .barrio, .faq-item, .info-box';
  $$(SPOT).forEach(host => {
    const wrap = document.createElement('span');
    wrap.className = 'fx-spot-wrap';
    wrap.setAttribute('aria-hidden', 'true');
    wrap.innerHTML = '<i class="fx-spot"></i>';
    host.prepend(wrap);
  });
  let spotEvt = null, spotRaf = 0;
  const paintSpots = () => {
    spotRaf = 0;
    if (!spotEvt) return;
    let el = spotEvt.target.closest?.(SPOT);
    while (el) {
      const spot = el.querySelector(':scope > .fx-spot-wrap > .fx-spot');
      if (spot) {
        const r = el.getBoundingClientRect();
        spot.style.transform = `translate3d(${(spotEvt.clientX - r.left).toFixed(0)}px, ${(spotEvt.clientY - r.top).toFixed(0)}px, 0)`;
      }
      el = el.parentElement?.closest(SPOT);
    }
  };
  document.addEventListener('pointermove', e => {
    spotEvt = e;
    if (!spotRaf) spotRaf = requestAnimationFrame(paintSpots);
  }, { passive: true });

  /* — Inclinación 3D en productos y pasos — */
  $$('.prod, .step, .vs__card').forEach(card => {
    const MAX = 5;
    card.addEventListener('pointerenter', () => card.classList.add('is-tilting'));
    card.addEventListener('pointermove', e => {
      const r  = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width  - .5;
      const py = (e.clientY - r.top)  / r.height - .5;
      card.style.transform =
        `perspective(900px) rotateX(${(-py * MAX).toFixed(2)}deg) rotateY(${(px * MAX).toFixed(2)}deg) translate3d(-4px,-4px,0)`;
    });
    card.addEventListener('pointerleave', () => {
      card.classList.remove('is-tilting');
      card.style.transform = '';
    });
  });

  /* — Botones magnéticos — */
  $$('.btn--xl, .hd__cta .btn, .cta-final .btn, .pcard .btn--full, .inline-cta__btn').forEach(btn => {
    btn.classList.add('fx-magnet');
    btn.addEventListener('pointermove', e => {
      const r = btn.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      btn.style.transform = `translate3d(${(dx * 10).toFixed(1)}px, ${(dy * 8).toFixed(1)}px, 0)`;
    });
    btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
  });
})();
