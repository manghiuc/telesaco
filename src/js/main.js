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
  burger?.addEventListener('click', () => {
    const open = burger.classList.toggle('is-open');
    mob?.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  /* ===== Smooth scroll ===== */
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      const y = t.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: 'smooth' });
      mob?.classList.remove('is-open');
      burger?.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });

  /* ===== Calculator ===== */
  const PRICES = {
    saco:  { unit: 50, shipping: 5, freeFrom: 3 },
    cont3: { r1: 185, r2: 205, r3: 225 },
    cont6: { r1: 215, r2: 235, r3: 255 }
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
      const hasShipping = qty < PRICES.saco.freeFrom;
      total = qty * PRICES.saco.unit + (hasShipping ? PRICES.saco.shipping : 0);
      if (shipNote) {
        shipNote.textContent  = hasShipping
          ? `+ ${PRICES.saco.shipping}\u20ac gastos de env\u00edo`
          : '\u2713 Env\u00edo gratis incluido';
        shipNote.className = hasShipping ? 'calc__shipping' : 'calc__shipping calc__shipping--free';
      }
    } else {
      total = PRICES[prod][radio] * qty;
      if (shipNote) {
        shipNote.textContent = 'Entrega y recogida incluidas';
        shipNote.className   = 'calc__shipping calc__shipping--free';
      }
    }
    animateTotal(total);
  }

  segBtns.forEach(b => {
    b.addEventListener('click', () => {
      segBtns.forEach(x => x.classList.remove('is-on'));
      b.classList.add('is-on');
      switchProduct(b.dataset.val);
      update();
    });
  });

  zoneSel?.addEventListener('change', () => {
    radio = zoneSel.value || 'r1';
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

  // ── Stripe Checkout (dynamic, via Netlify Function) ──────────────────────
  orderBtn?.addEventListener('click', async (e) => {
    e.preventDefault();
    const nameEl    = document.getElementById('custName');
    const phoneEl   = document.getElementById('custPhone');
    const addressEl = document.getElementById('custAddress');
    const name      = nameEl?.value.trim()    || '';
    const phone     = phoneEl?.value.trim()   || '';
    const address   = addressEl?.value.trim() || '';

    [nameEl, phoneEl, addressEl].forEach((el, i) => {
      const val = [name, phone, address][i];
      if (!el) return;
      el.classList.toggle('is-invalid', !val);
    });
    if (!name || !phone || !address) return;

    orderBtn.disabled = true;
    orderBtn.textContent = 'Redirigiendo al pago…';

    try {
      const res  = await fetch('/.netlify/functions/create-checkout', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ product: prod, zone: radio, quantity: qty, name, phone, address }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Error desconocido');
      }
    } catch (err) {
      alert('No se pudo conectar con el sistema de pago.\nLl\u00e1manos al 677 882 716 para hacer tu pedido.');
      orderBtn.disabled = false;
      orderBtn.textContent = 'Continuar al pago \u2192';
    }
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

  /* ===== Reveal on scroll ===== */
  const targets = $$('.prod, .step, .rev, .radio-card, .saco-flat, .allowed__col, .compare__table, .calc, .hero__copy');
  targets.forEach(el => el.classList.add('reveal'));
  const rIO = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        rIO.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  $$('.reveal').forEach(el => rIO.observe(el));

  /* ===== FAQ (close others) ===== */
  $$('.faq details').forEach(d => {
    d.addEventListener('toggle', () => {
      if (d.open) {
        $$('.faq details').forEach(o => { if (o !== d) o.open = false; });
      }
    });
  });

})();
