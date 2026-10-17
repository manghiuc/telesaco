// Convierte las landings por municipio al diseño de la home (hero vivo, cintas, contadores, efectos).
// Uso: node scripts/build-subpages.js   (también lo invoca generate-landings.js)
const fs = require('fs');
const path = require('path');
const C = require('./chrome');

const strip = (s) => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const grab = (html, re) => (html.match(re) || [])[1];

const band = (items, cls = '') => {
  const run = items.map((t) => `<span>${t}</span><b>${cls ? '✦' : '·'}</b>`).join('\n      ');
  return `${run}\n      ${run}`;
};

function transformLanding(html) {
  const head = html.slice(0, html.indexOf('</head>'))
    .replace(/<link rel="icon" href="data:[^\n]*\n/, C.ICONS + '\n')
    .replace(/<link rel="icon" type="image\/x-icon"[^\n]*\n<link rel="icon" type="image\/png"[^\n]*\n<link rel="icon" type="image\/png"[^\n]*\n<link rel="apple-touch-icon"[^\n]*\n(<link rel="manifest"[^\n]*\n)?/, C.ICONS + '\n')
    .replace(/<link rel="preconnect"[\s\S]*?rel="stylesheet" \/>\n/, C.FONTS + '\n')
    .replace(/<link rel="stylesheet" href="\/src\/css\/[^"]*" \/>\n?/g, '')
    .replace(/(\n<script type="application\/ld\+json">)/, `\n${C.STYLES(['/src/css/landing.css'])}\n$1`)
    + '</head>';
  // evita iconos duplicados si la plantilla ya traía alguno
  const headClean = head.replace(/(<link rel="icon" href="\/assets\/img\/favicon\.svg"[^\n]*\n)\1/, '$1');

  const badge = strip(grab(html, /<span class="muni-hero__badge">([\s\S]*?)<\/span>/)).replace(/^📍\s*/, '');
  const h1 = strip(grab(html, /<h1>([\s\S]*?)<\/h1>/));
  const sub = grab(html, /<p class="muni-hero__sub">([\s\S]*?)<\/p>/).replace(/\s+/g, ' ').trim();
  const note = strip(grab(html, /<p class="muni-hero__price-note">([\s\S]*?)<\/p>/));
  const feats = [...html.matchAll(/<div class="muni-hero__feature">[\s\S]*?<\/svg>([\s\S]*?)<\/div>/g)].map((m) => strip(m[1]));
  const name = strip(grab(html, /<nav class="crumbs"[\s\S]*?<span>([^<]+)<\/span>\s*<\/nav>/) || '').replace(/&amp;/g, '&');
  const pop = (grab(html, /([\d.]+)\s*hab\./) || '').replace(/\./g, '');
  const article = grab(html, /<article class="muni-section">([\s\S]*?)<\/article>/)
    .replace(/class="compare__card/g, 'class="vs__card').replace(/compare__price/g, 'vs__price')
    .replace(/<div class="compare">/g, '<div class="vs">')
    .replace(/(<div class="vs__card[^"]*">\s*)<h3>([^<]*)<\/h3>/g, '$1<h4>$2</h4>');
  const ctaH2 = strip(grab(html, /<section class="cta-banner">[\s\S]*?<h2>([\s\S]*?)<\/h2>/));
  const ctaP = strip(grab(html, /<section class="cta-banner">[\s\S]*?<p>([\s\S]*?)<\/p>/));
  const wspHref = grab(html, /<a href="(https:\/\/wa\.me\/34677882716\?text=[^"]*)" class="wsp"/) || undefined;
  const wspLabel = grab(html, /class="wsp"[^>]*aria-label="([^"]*)"/) || 'WhatsApp';

  // el municipio va resaltado en el titular
  const short = name.replace(/ Capital$/, '');
  let h1html = h1;
  if (name && h1.includes(short)) h1html = h1.replace(short, `<em>${short}</em>`);
  else h1html = h1.replace(/(\S+)$/, '<em>$1</em>');

  const place = short || 'tu zona';
  const statPop = pop
    ? `<div class="stat"><strong><span data-count="${pop}">0</span></strong><span>habitantes en ${place}</span></div>`
    : `<div class="stat"><strong><span data-count="13">0</span></strong><span>municipios con telesaco</span></div>`;

  const body = `<body class="sub">

${C.top()}
<main id="contenido">
<!-- ============== HERO ============== -->
<section class="hero hero--muni">
  <div class="hero__fx" aria-hidden="true">
    <span class="hero__orb hero__orb--a" data-parallax="0.12"></span>
    <span class="hero__orb hero__orb--b" data-parallax="-0.08"></span>
    <span class="hero__orb hero__orb--c" data-parallax="0.18"></span>
    <span class="hero__grid-bg"></span>
    <span class="hero__glow"></span>
    <img class="hero__float hero__float--saco" src="/assets/img/saco-escombro-s.webp" alt="" loading="eager" fetchpriority="high" decoding="async" width="240" height="252" data-parallax="0.22" />
    <img class="hero__float hero__float--cont" src="/assets/img/contenedor.webp" alt="" loading="lazy" decoding="async" width="266" height="155" data-parallax="-0.14" />
  </div>

  <nav class="crumbs" aria-label="Migas de pan">
    <a href="/">Inicio</a><span aria-hidden="true">›</span>
    <span aria-current="page">Saco de escombro en ${place}</span>
  </nav>

  <div class="hero__grid">
    <div class="hero__copy">
      <span class="hero__chip"><i class="hero__chip-dot"></i>${C.PIN}${badge}</span>
      <h1 class="hero__title">${h1html}</h1>
      <p class="hero__sub">${sub}</p>
      <div class="hero__cta">
        <a href="/#pedir" class="btn btn--primary btn--xl"><span>Pedir mi telesaco</span>${C.ARROW}</a>
        <a href="tel:+34677882716" class="btn btn--ghost btn--xl"><span>677 882 716</span></a>
      </div>
      <ul class="hero__bullets">
        <li>${C.CHECK} Entrega en 24 h</li>
        <li>${C.CHECK} Recogida incluida</li>
        <li>${C.CHECK} Reciclaje certificado</li>
        <li>${C.CHECK} Sin sorpresas en factura</li>
      </ul>
    </div>

    <aside class="calc pcard" aria-label="Precio en ${place}">
      <header class="calc__head">
        <span class="calc__step">€</span>
        <p class="calc__title">Precio único en ${place}</p>
      </header>
      <div class="pcard__price">55<i>€</i></div>
      <p class="pcard__note">${note}</p>
      <ul class="pcard__list">
${feats.map((f) => `        <li>${C.CHECK}${f}</li>`).join('\n')}
      </ul>
      <a href="/#pedir" class="btn btn--primary btn--full btn--lg"><span>Pedir ahora</span>${C.ARROW}</a>
      <p class="calc__note">Pago seguro con Stripe · Tarjeta, Bizum, Google Pay, Apple Pay</p>
    </aside>
  </div>

  <div class="hero__stripe hero__stripe--alt" aria-hidden="true">
    <div class="hero__stripe__track hero__stripe__track--rev">
      ${band(['CUANDO AVISES', 'RECOGIDA INCLUIDA', 'PRECIO CERRADO', `${place.toUpperCase()}`, 'EL MISMO DÍA SI HAY HUECO'], 'x')}
    </div>
  </div>
  <div class="hero__stripe" aria-hidden="true">
    <div class="hero__stripe__track">
      ${band(['+12.000 SACOS ENTREGADOS', '13 MUNICIPIOS', 'ENTREGA EN 24 H', 'RECICLAJE CERTIFICADO', 'PAGO SEGURO ONLINE'])}
    </div>
  </div>
</section>

<section class="stats" aria-label="Datos del servicio">
  <div class="stat"><strong><span data-count="12000">0</span>+</strong><span>sacos entregados</span></div>
  <div class="stat"><strong><span data-count="24">0</span> h</strong><span>plazo de entrega</span></div>
  <div class="stat"><strong><span data-count="55">0</span><i>€</i></strong><span>precio único</span></div>
  ${statPop}
</section>

<article class="muni-section">${article}</article>

<section class="cta-final">
  <div class="cta-final__inner">
    <h2 class="h2">${ctaH2}</h2>
    <p>${ctaP}</p>
    <div class="cta-final__actions">
      <a href="/#pedir" class="btn btn--primary btn--xl"><span>Pedir mi telesaco</span>${C.ARROW}</a>
      <a href="https://wa.me/34677882716" target="_blank" rel="noopener" class="btn btn--wsp btn--xl">WhatsApp directo</a>
    </div>
  </div>
</section>

</main>

${C.footer()}
${C.wsp(wspHref, wspLabel)}
</body>
</html>
`;
  return headClean + '\n' + body;
}

function transformLegal(html) {
  if (html.includes('class="wrap legal"')) return html;
  const head = html.slice(0, html.indexOf('</head>'))
    .replace(/<style>[\s\S]*?<\/style>\n?/, '')
    .replace(/<meta name="viewport"[^>]*>/, '<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />')
    .replace(/<link rel="icon"[\s\S]*?<link rel="apple-touch-icon"[^\n]*\n/, C.ICONS + '\n')
    .replace(/<link rel="preconnect"[\s\S]*?rel="stylesheet" \/>\n/, C.FONTS + '\n' + C.STYLES(['/src/css/landing.css', '/src/css/legal.css']) + '\n')
    + '</head>';
  const main = grab(html, /<main class="wrap">([\s\S]*?)<\/main>/);
  return head + '\n<body class="sub">\n\n' + C.top() + '\n<main class="wrap legal" id="contenido">' + main + '</main>\n\n' + C.footer() + '\n' + C.wsp() + '\n</body>\n</html>\n';
}

module.exports = { transformLanding, transformLegal };

if (require.main === module) {
  const root = path.join(__dirname, '..');
  ['aviso-legal', 'condiciones', 'politica-privacidad'].forEach((n) => {
    const p = path.join(root, n + '.html');
    const src = fs.readFileSync(p, 'utf8');
    fs.writeFileSync(p, transformLegal(src), 'utf8');
    console.log('✓', n + '.html');
  });
  const files = fs.readdirSync(root).filter((f) => /^saco-escombro-.*\.html$/.test(f));
  files.forEach((f) => {
    const p = path.join(root, f);
    const src = fs.readFileSync(p, 'utf8');
    if (src.includes('hero--muni')) { console.log('= ya convertida', f); return; }
    fs.writeFileSync(p, transformLanding(src), 'utf8');
    console.log('✓', f);
  });
}
