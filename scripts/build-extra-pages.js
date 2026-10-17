// Páginas que no salen del generador de municipios: pilar de contenedores y 404.
// Uso: node scripts/build-extra-pages.js   (los datos de zonas se leen del desplegable de index.html)
const fs = require('fs');
const path = require('path');
const C = require('./chrome');

const root = path.join(__dirname, '..');
const B = 'https://telesacoenmadrid.es';
const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

// Municipios por radio, tal y como están en el desplegable de la calculadora
const radios = [...home.matchAll(/<optgroup label="Radio (\d)[^"]*"[^>]*>([\s\S]*?)<\/optgroup>/g)].map((m) => ({
  n: m[1],
  munis: [...m[2].matchAll(/<option value="([^"]+)">([^<]+)<\/option>/g)].map((o) => ({ slug: o[1], name: o[2] })),
}));
const conSaco = new Set(fs.readdirSync(root).filter((f) => /^saco-escombro-.*\.html$/.test(f)).map((f) => f.replace(/^saco-escombro-|\.html$/g, '')));

const PRECIOS = { 1: [190, 220], 2: [210, 240], 3: [230, 260] };

const head = ({ title, desc, path: p, robots = 'index, follow, max-image-preview:large, max-snippet:-1', ld = null, extra = [] }) => `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
<meta name="theme-color" content="#0f0f0f" />
<meta name="robots" content="${robots}" />
<meta name="description" content="${desc}" />
<title>${title}</title>
${robots.startsWith('noindex') ? '' : `<link rel="canonical" href="${B}${p}" />
<meta property="og:url" content="${B}${p}" />
<meta property="og:site_name" content="Telesaco en Madrid" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${desc}" />
<meta property="og:type" content="website" />
<meta property="og:locale" content="es_ES" />
<meta property="og:image" content="${B}/assets/img/og-cover.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Telesaco a domicilio en Madrid: saco de escombro desde 50 €" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${desc}" />
<meta name="twitter:image" content="${B}/assets/img/og-cover.jpg" />
`}
${C.ICONS}
${C.FONTS}
${C.STYLES(extra)}
${ld ? `<script type="application/ld+json">\n${JSON.stringify(ld, null, 2)}\n</script>\n` : ''}</head>
<body class="sub">

${C.top()}`;

const tail = (wspLabel) => `
${C.footer()}
${C.wsp(undefined, wspLabel)}
</body>
</html>
`;

/* ============================ Pilar: contenedores ============================ */
const faq = [
  ['¿Cuánto cuesta alquilar un contenedor de escombro en Madrid?', 'Depende del tamaño y de la zona. El contenedor de 3 m³ cuesta entre 190 € y 230 € y el de 6 m³ entre 220 € y 260 €, con entrega y recogida incluidas. El precio exacto lo da el radio de tu municipio.'],
  ['¿Cuánto tiempo puedo tener el contenedor?', 'Los contenedores tienen un plazo máximo de 2 semanas.'],
  ['¿Necesito permiso del Ayuntamiento para poner un contenedor?', 'Sí. El contenedor se deja en la vía pública (calzada o acera) para poder retirarlo bien, así que necesitas la licencia de ocupación de vía pública del Ayuntamiento; sin ella te pueden multar.'],
  ['¿Qué diferencia hay entre un saco y un contenedor?', 'El saco (1 m³, hasta 1.000 kg) es la opción para reformas pequeñas, cabe en espacios reducidos y cuesta 50 € en 13 municipios. El contenedor metálico (3 m³ o 6 m³) es para reformas integrales y derribos grandes y se contrata por zona en toda la Comunidad de Madrid.'],
  ['¿Cómo se paga?', 'El pago es online con tarjeta a través de Stripe. Para empresas facturamos con IVA y CIF; indícanoslo al hacer la reserva.'],
];

const pilarTitle = 'Alquiler de contenedores de escombro en Madrid · 3 y 6 m³';
const pilarDesc = 'Contenedores de escombro de 3 m³ (desde 190 €) y 6 m³ (desde 220 €) con entrega y recogida incluidas en toda la Comunidad de Madrid. Precio por zona.';
const pilarUrl = `${B}/contenedores-escombro-madrid`;

const pilarLD = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebPage', '@id': `${pilarUrl}#webpage`, url: pilarUrl, name: pilarTitle, inLanguage: 'es-ES',
      isPartOf: { '@id': `${B}/#website` }, about: { '@id': `${pilarUrl}#service` }, breadcrumb: { '@id': `${pilarUrl}#breadcrumb` } },
    { '@type': 'BreadcrumbList', '@id': `${pilarUrl}#breadcrumb`, itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${B}/` },
      { '@type': 'ListItem', position: 2, name: 'Contenedores de escombro en Madrid', item: pilarUrl } ] },
    { '@type': 'Service', '@id': `${pilarUrl}#service`, name: 'Alquiler de contenedor de escombro en Madrid',
      serviceType: 'Alquiler de contenedor metálico de escombro', provider: { '@id': `${B}/#business` },
      areaServed: { '@type': 'AdministrativeArea', name: 'Comunidad de Madrid' },
      offers: [
        { '@type': 'Offer', name: 'Contenedor 3 m³', priceCurrency: 'EUR', priceSpecification: { '@type': 'PriceSpecification', minPrice: 190, maxPrice: 230, priceCurrency: 'EUR' }, url: pilarUrl },
        { '@type': 'Offer', name: 'Contenedor 6 m³', priceCurrency: 'EUR', priceSpecification: { '@type': 'PriceSpecification', minPrice: 220, maxPrice: 260, priceCurrency: 'EUR' }, url: pilarUrl },
      ] },
    { '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
  ],
};

const tabla = `<table class="price-table" aria-label="Precios de contenedores por zona">
    <thead><tr><th>Zona</th><th>Municipios</th><th>3 m³</th><th>6 m³</th></tr></thead>
    <tbody>
${radios.map((r) => `      <tr><td><strong>Radio ${r.n}</strong></td><td>${r.munis.length} municipios</td><td class="price-cell">${PRECIOS[r.n][0]} €</td><td class="price-cell">${PRECIOS[r.n][1]} €</td></tr>`).join('\n')}
    </tbody>
  </table>`;

const listaRadios = radios.map((r) => `  <h3>Radio ${r.n} · ${PRECIOS[r.n][0]} € (3 m³) · ${PRECIOS[r.n][1]} € (6 m³)</h3>
  <div class="vecinos">
${r.munis.map((m) => (conSaco.has(m.slug) ? `    <a href="/saco-escombro-${m.slug}">${m.name}</a>` : `    <span>${m.name}</span>`)).join('\n')}
  </div>`).join('\n\n');

const pilar = `${head({ title: pilarTitle, desc: pilarDesc, path: '/contenedores-escombro-madrid', ld: pilarLD, extra: ['/src/css/landing.css'] })}
<main id="contenido">
<section class="hero hero--muni">
  <div class="hero__fx" aria-hidden="true">
    <span class="hero__orb hero__orb--a" data-parallax="0.12"></span>
    <span class="hero__orb hero__orb--b" data-parallax="-0.08"></span>
    <span class="hero__orb hero__orb--c" data-parallax="0.18"></span>
    <span class="hero__grid-bg"></span>
    <span class="hero__glow"></span>
    <img class="hero__float hero__float--cont" src="/assets/img/contenedor.webp" alt="" loading="lazy" decoding="async" width="266" height="155" data-parallax="-0.14" />
  </div>
  <nav class="crumbs" aria-label="Migas de pan">
    <a href="/">Inicio</a><span aria-hidden="true">›</span>
    <span aria-current="page">Contenedores de escombro en Madrid</span>
  </nav>
  <div class="hero__grid">
    <div class="hero__copy">
      <span class="hero__chip"><i class="hero__chip-dot"></i>${C.PIN}Toda la Comunidad de Madrid · 63 municipios</span>
      <h1 class="hero__title">Alquiler de <em>contenedores</em> de escombro en Madrid</h1>
      <p class="hero__sub">Contenedores metálicos de <strong>3 m³ y 6 m³</strong> con entrega y recogida incluidas. El precio depende de la zona de tu municipio y lo ves al momento en la calculadora.</p>
      <div class="hero__cta">
        <a href="/#pedir" class="btn btn--primary btn--xl"><span>Calcular mi precio</span>${C.ARROW}</a>
        <a href="tel:+34677882716" class="btn btn--ghost btn--xl"><span>677 882 716</span></a>
      </div>
      <ul class="hero__bullets">
        <li>${C.CHECK} Entrega y recogida incluidas</li>
        <li>${C.CHECK} Hasta 2 semanas</li>
        <li>${C.CHECK} Reciclaje certificado</li>
        <li>${C.CHECK} Factura con IVA y CIF</li>
      </ul>
    </div>
    <aside class="calc pcard" aria-label="Precios de contenedores">
      <header class="calc__head"><span class="calc__step">€</span><p class="calc__title">Contenedores desde</p></header>
      <div class="pcard__price">190<i>€</i></div>
      <p class="pcard__note">3 m³ en Radio 1 · 6 m³ desde 220 € · IVA incluido</p>
      <ul class="pcard__list">
        <li>${C.CHECK}3 m³ · hasta 3.000 kg</li>
        <li>${C.CHECK}6 m³ · hasta 6.000 kg</li>
        <li>${C.CHECK}Entrega y recogida incluidas</li>
        <li>${C.CHECK}Pago seguro · Stripe</li>
      </ul>
      <a href="/#pedir" class="btn btn--primary btn--full btn--lg"><span>Elegir mi municipio</span>${C.ARROW}</a>
      <p class="calc__note">Pago seguro con Stripe · Tarjeta</p>
    </aside>
  </div>
</section>

<article class="muni-section">
  <h2>Precios del contenedor de escombro según tu zona</h2>
  <p class="lead">Tarifa por radio, con entrega y recogida incluidas. Si tu municipio es uno de los 13 con servicio de saco, entra en su página para ver el detalle local.</p>
  ${tabla}

  <h2>Qué tamaño de contenedor elegir</h2>
  <div class="vs">
    <div class="vs__card">
      <h3>Contenedor 3 m³</h3>
      <p class="cap">hasta 3.000 kg</p>
      <ul><li>Reformas de vivienda y locales</li><li>Derribo de tabiques y alicatados</li><li>Plazo máximo: 2 semanas</li></ul>
      <div class="vs__price">desde 190<i>€</i></div>
    </div>
    <div class="vs__card vs__card--featured">
      <h3>Contenedor 6 m³</h3>
      <p class="cap">hasta 6.000 kg</p>
      <ul><li>Reformas integrales y derribos grandes</li><li>Mayor capacidad por unidad</li><li>Plazo máximo: 2 semanas</li></ul>
      <div class="vs__price">desde 220<i>€</i></div>
    </div>
  </div>
  <p>¿Obra pequeña? Un <a href="/#productos">saco de escombro</a> de 1 m³ cuesta 50 € y cabe en espacios reducidos.</p>

  <h2>Municipios por zona</h2>
  <p>Estos son los municipios de cada radio. Los que tienen enlace cuentan además con servicio de saco de escombro.</p>
${listaRadios}

  <h2>¿Necesito permiso para poner un contenedor?</h2>
  <ul>
    <li><strong>En vía pública</strong> (acera, calzada): necesitas licencia de ocupación de vía pública del Ayuntamiento. El contenedor se deja en la calle para poder retirarlo bien.</li>
  </ul>

  <h2>Preguntas frecuentes sobre contenedores de escombro</h2>
  <div class="faq-list">
${faq.map(([q, a]) => `    <details class="faq-item">\n      <summary>${q}</summary>\n      <div class="faq-item__body">${a}</div>\n    </details>`).join('\n')}
  </div>
</article>

<section class="cta-final">
  <div class="cta-final__inner">
    <h2 class="h2">Pide tu contenedor de escombro en Madrid</h2>
    <p>Elige tu municipio, mira el precio y paga online. Entrega y recogida incluidas.</p>
    <div class="cta-final__actions">
      <a href="/#pedir" class="btn btn--primary btn--xl"><span>Calcular mi precio</span>${C.ARROW}</a>
      <a href="https://wa.me/34677882716" target="_blank" rel="noopener" class="btn btn--wsp btn--xl">WhatsApp directo</a>
    </div>
  </div>
</section>
</main>
${tail('WhatsApp Telesaco en Madrid')}`;

fs.writeFileSync(path.join(root, 'contenedores-escombro-madrid.html'), pilar);

/* ================================== 404 ================================== */
const enlaces = [['/', 'Inicio'], ['/contenedores-escombro-madrid', 'Contenedores de escombro']]
  .concat([...conSaco].sort().map((s) => [`/saco-escombro-${s}`, 'Saco de escombro en ' + (radios.flatMap((r) => r.munis).find((m) => m.slug === s) || { name: s }).name]));
const notFound = `${head({ title: 'Página no encontrada · Telesaco en Madrid', desc: 'Esta página no existe. Vuelve al inicio o elige tu municipio para pedir un saco de escombro.', path: '/404', robots: 'noindex, nofollow', extra: ['/src/css/landing.css', '/src/css/legal.css'] })}
<main class="wrap legal" id="contenido">
  <span class="badge">Error 404</span>
  <h1>Esta página no existe</h1>
  <p class="meta">Puede que el enlace haya cambiado. Estas son las páginas principales:</p>
  <div class="vecinos">
${enlaces.map(([h, t]) => `    <a href="${h}">${t}</a>`).join('\n')}
  </div>
  <p style="margin-top:32px">¿Necesitas ayuda? Llámanos al <a href="tel:+34677882716">677 882 716</a>.</p>
</main>
${tail('WhatsApp Telesaco')}`;
fs.writeFileSync(path.join(root, '404.html'), notFound);
console.log('✓ contenedores-escombro-madrid.html  ✓ 404.html', `(radios: ${radios.map((r) => r.munis.length).join('/')}, con saco: ${conSaco.size})`);
