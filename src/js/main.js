/* TELESACO MADRID — main.js */

(() => {
  const $  = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  /* ===== Year ===== */
  $('#y') && ($('#y').textContent = new Date().getFullYear());

  /* ===== Header on scroll ===== */
  const hd = $('#hd');
  const onScroll = () => hd?.classList.toggle('is-scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ===== Mobile menu ===== */
  const burger = $('#burger');
  const mob    = $('#mobMenu');
  const setMenu = (open) => {
    burger?.classList.toggle('is-open', open);
    burger?.setAttribute('aria-expanded', String(open));
    burger?.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    mob?.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  burger?.addEventListener('click', () => setMenu(!mob?.classList.contains('is-open')));
  matchMedia('(min-width: 1101px)').addEventListener?.('change', (e) => { if (e.matches) setMenu(false); });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape' || !mob?.classList.contains('is-open')) return;
    setMenu(false);
    burger?.focus();
  });

  /* ===== Smooth scroll ===== */
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      const tb  = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--tb')) || 0;
      const off = tb + (document.querySelector('.hd')?.offsetHeight || 70) + 10;
      const y = t.getBoundingClientRect().top + window.scrollY - off;
      const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: y, behavior: calm ? 'auto' : 'smooth' });
      setMenu(false);
    });
  });

  /* ===== Calculator ===== */
  const PRICES = {
    saco:  { unit: 55 },
    cont3: { r1: 190, r2: 210, r3: 230 },
    cont6: { r1: 220, r2: 240, r3: 260 }
  };

  let prod  = 'saco';
  let radio = 'r1';
  let qty   = 1;

  const segBtns   = $$('.seg[data-group="prod"] button');
  const zoneSel   = $('#zone');
  const qtyIn     = $('#qty');
  const qBtns     = $$('.qty button');
  const totalEl   = $('#total');
  const orderBtn  = $('#orderBtn');
  const zoneField = $('#zoneField');
  const sacoNote  = $('#sacoNote');
  const shipNote  = $('#shippingNote');

  if (zoneSel?.selectedOptions[0]) radio = zoneSel.selectedOptions[0].parentElement?.dataset.radio || 'r1';
  if (qtyIn) qtyIn.value = String(qty);

  function switchProduct(p) {
    prod = p;
    if (zoneField) zoneField.style.display = (prod === 'saco') ? 'none' : 'block';
    if (sacoNote)  sacoNote.style.display  = (prod === 'saco') ? 'block' : 'none';
  }

  function animateTotal(target) {
    if (!totalEl) return;
    const start = parseInt(totalEl.textContent.replace(/\D/g, ''), 10) || 0;
    const dur = 350;
    const t0  = performance.now();
    const tick = (now) => {
      const p      = Math.min(1, (now - t0) / dur);
      const eased  = 1 - Math.pow(1 - p, 3);
      totalEl.textContent = Math.round(start + (target - start) * eased).toLocaleString('es-ES');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function update() {
    let total;
    if (prod === 'saco') {
      total = qty * PRICES.saco.unit;
      if (shipNote) {
        shipNote.textContent = qty > 1
          ? `${qty} \u00d7 ${PRICES.saco.unit} \u20ac \u00b7 \u2713 Sin gastos de env\u00edo`
          : '\u2713 Sin gastos de env\u00edo';
        shipNote.className   = 'calc__shipping calc__shipping--free';
      }
    } else {
      const unit = PRICES[prod][radio];
      total = unit * qty;
      if (shipNote) {
        shipNote.textContent = qty > 1
          ? `${qty} \u00d7 ${unit} \u20ac \u00b7 Entrega y recogida incl.`
          : 'Entrega y recogida incluidas';
        shipNote.className   = 'calc__shipping calc__shipping--free';
      }
    }
    animateTotal(total);
    window.fxBump?.(totalEl?.closest('.calc__total'));
  }

  function activateProdButton(val) {
    const btn = segBtns.find(b => b.dataset.val === val);
    if (!btn) return;
    segBtns.forEach(x => x.classList.remove('is-on'));
    btn.classList.add('is-on');
    switchProduct(val);
    update();
  }

  segBtns.forEach(b => {
    b.addEventListener('click', () => {
      activateProdButton(b.dataset.val);
    });
  });

  // Botones de catálogo y comparador que preseleccionan el formato en la calculadora
  $$('[data-select-prod]').forEach(el => {
    el.addEventListener('click', () => {
      const targetProd = el.dataset.selectProd;
      if (targetProd) activateProdButton(targetProd);
    });
  });

  // Normalizador para cruzar nombres de municipios con el select #zone
  const norm = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();

  // Hacer clicables los municipios de las tarjetas Radio 1, 2 y 3 + buscador en vivo
  const radioLis = $$('.radio-card ul li');
  if (radioLis.length && zoneSel) {
    const opts = [...zoneSel.querySelectorAll('option')];
    radioLis.forEach(li => {
      const name = li.textContent.trim();
      const nName = norm(name);
      const matchOpt = opts.find(o => norm(o.textContent) === nName);
      if (matchOpt) {
        li.dataset.zoneVal = matchOpt.value;
        li.setAttribute('role', 'button');
        li.setAttribute('tabindex', '0');
        li.setAttribute('title', `Calcular contenedor en ${name}`);
        const pickMuni = () => {
          if (prod === 'saco') activateProdButton('cont3');
          zoneSel.value = matchOpt.value;
          radio = matchOpt.parentElement?.dataset.radio || 'r1';
          update();
          const pedir = $('#pedir');
          if (pedir) {
            const tb = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--tb')) || 0;
            const off = tb + (document.querySelector('.hd')?.offsetHeight || 70) + 16;
            const y = pedir.getBoundingClientRect().top + window.scrollY - off;
            window.scrollTo({ top: y, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
          }
          window.fxToast?.(`Municipio seleccionado: ${name} (Contenedor)`);
        };
        li.addEventListener('click', pickMuni);
        li.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pickMuni(); }
        });
      }
    });

    const filterIn = $('#zoneFilter');
    filterIn?.addEventListener('input', () => {
      const q = norm(filterIn.value);
      $$('.radio-card').forEach(card => {
        let visibleCount = 0;
        $$('ul li', card).forEach(li => {
          const hit = !q || norm(li.textContent).includes(q);
          li.classList.toggle('is-dim', Boolean(q && !hit));
          li.classList.toggle('is-match', Boolean(q && hit));
          if (hit) visibleCount++;
        });
        card.classList.toggle('is-empty-filter', Boolean(q && visibleCount === 0));
      });
    });
  }

  zoneSel?.addEventListener('change', () => {
    radio = zoneSel.selectedOptions[0]?.parentElement?.dataset.radio || 'r1';
    update();
  });

  qBtns.forEach(b => {
    b.addEventListener('click', () => {
      const op = b.dataset.q;
      if (op === '+') qty = Math.min(20, qty + 1);
      if (op === '-') qty = Math.max(1, qty - 1);
      if (qtyIn) qtyIn.value = qty;
      update();
    });
  });

  // Aviso inline (fx.js define window.fxToast; si no carga, cae a alert)
  const toast = (msg) => (window.fxToast ? window.fxToast(msg) : alert(msg));

  // ── Stripe Checkout (dynamic, via Netlify Function) ──────────────────────
  orderBtn?.addEventListener('click', async (e) => {
    e.preventDefault();
    const nameEl    = document.getElementById('custName');
    const phoneEl   = document.getElementById('custPhone');
    const addressEl = document.getElementById('custAddress');
    const name      = nameEl?.value.trim()    || '';
    const phone     = phoneEl?.value.trim()   || '';
    const address   = addressEl?.value.trim() || '';

    const phoneOk = /^\+?[\d\s().-]{9,20}$/.test(phone) && phone.replace(/\D/g, '').length >= 9;
    const checks  = [name.length >= 2, phoneOk, address.length >= 5];
    [nameEl, phoneEl, addressEl].forEach((el, i) => {
      if (!el) return;
      el.classList.remove('is-invalid');
      if (!checks[i]) {
        void el.offsetWidth; // reinicia la animación de sacudida
        el.classList.add('is-invalid');
      }
    });
    if (!checks.every(Boolean)) {
      const first = [nameEl, phoneEl, addressEl].find((el, i) => !checks[i]);
      first?.focus({ preventScroll: false });
      toast(!phoneOk && phone
        ? 'Revisa el teléfono: solo números, mínimo 9 dígitos.'
        : 'Rellena tu nombre, teléfono y dirección (calle y número) para continuar.');
      return;
    }

    const termsEl = document.getElementById('acceptTerms');
    if (termsEl && !termsEl.checked) {
      const box = document.getElementById('termsBox');
      box?.classList.remove('is-invalid'); void box?.offsetWidth; box?.classList.add('is-invalid');
      termsEl.focus();
      toast('Para continuar, acepta las condiciones del servicio.');
      return;
    }

    orderBtn.disabled = true;
    orderBtn.classList.add('is-loading');
    orderBtn.querySelector('span').textContent = 'Redirigiendo al pago…';

    let res = null, data = null;
    try {
      res = await fetch('/.netlify/functions/create-checkout', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ terms: !!termsEl?.checked, website: document.getElementById('hpWebsite')?.value || '', product: prod, municipio: prod === 'saco' ? '' : (zoneSel?.value || ''), quantity: qty, name, phone, address }),
      });
      data = await res.json().catch(() => null);
    } catch (err) { /* sin conexión */ }

    if (data && data.url) {
      window.location.href = data.url;
      return;
    }
    toast(!res
      ? 'No se pudo conectar. Revisa tu conexión o llámanos al 677 882 716 para hacer tu pedido.'
      : (data && data.error) || 'El pago no está disponible ahora mismo. Llámanos al 677 882 716 para hacer tu pedido.');
    orderBtn.disabled = false;
    orderBtn.classList.remove('is-loading');
    orderBtn.querySelector('span').textContent = 'Continuar al pago';
  });

  // Al volver atrás desde Stripe el navegador restaura la página: se rehabilita el botón
  window.addEventListener('pageshow', (e) => {
    if (!e.persisted || !orderBtn) return;
    orderBtn.disabled = false;
    orderBtn.classList.remove('is-loading');
    const label = orderBtn.querySelector('span');
    if (label) label.textContent = 'Continuar al pago';
  });

  // Limpia el error de un campo en cuanto el usuario vuelve a escribir
  ['custName', 'custPhone', 'custAddress'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', e => e.target.classList.remove('is-invalid'));
  });
  document.getElementById('acceptTerms')?.addEventListener('change', () => {
    document.getElementById('termsBox')?.classList.remove('is-invalid');
  });

  /* init */
  switchProduct('saco');
  update();

  /* ===== Counters ===== */
  const cIO = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el  = entry.target;
      const end = parseInt(el.dataset.count, 10);
      const dur = 1600;
      const t0  = performance.now();
      const tick = (now) => {
        const p     = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(end * eased).toLocaleString('es-ES');
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      cIO.unobserve(el);
    });
  }, { threshold: 0.5 });
  $$('[data-count]').forEach(el => cIO.observe(el));

  /* (los reveals por scroll viven ahora en fx.js) */

  /* ===== Copiar enlace (botón de compartir) ===== */
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-copy]');
    if (!btn) return;
    navigator.clipboard?.writeText(btn.dataset.copy).then(() => { btn.textContent = '¡Copiado!'; });
  });

  /* ===== FAQ (close others) ===== */
  $$('.faq details').forEach(d => {
    d.addEventListener('toggle', () => {
      if (d.open) {
        $$('.faq details').forEach(o => { if (o !== d) o.open = false; });
      }
    });
  });

})();
