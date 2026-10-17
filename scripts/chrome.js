// Piezas compartidas de las subpáginas (landings + legales): cabecera, pie, iconos y scripts
const ICONS = `<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml" />
<link rel="icon" type="image/x-icon" href="/favicon.ico" sizes="48x48" />
<link rel="icon" type="image/png" href="/assets/img/favicon-32.png" sizes="32x32" />
<link rel="icon" type="image/png" href="/assets/img/favicon-192.png" sizes="192x192" />
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />`;

const VERSION = '20261042';

// Fuentes propias: sin peticiones a Google (RGPD) y con precarga de las dos críticas
const FONTS = `<link rel="preload" href="/assets/fonts/archivo-black-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/assets/fonts/inter-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin />`;

const HEAD_JS = `<script src="/src/js/boot.js?v=${VERSION}"></script>`;

const STYLES = (extra = []) => HEAD_JS + '\n' + ['/src/css/site.css', ...extra]
  .map((h) => `<link rel="stylesheet" href="${h}?v=${VERSION}" />`).join('\n');

const ARROW = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>';
const CHECK = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
const PIN = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>';
const WSP_PATH = 'M20.52 3.48A11.82 11.82 0 0 0 12 0C5.37 0 .01 5.36.01 11.98c0 2.11.55 4.17 1.6 5.98L0 24l6.2-1.63a11.95 11.95 0 0 0 5.79 1.48h.01c6.62 0 11.99-5.36 11.99-11.98a11.9 11.9 0 0 0-3.47-8.39z';

const NAV = [
  ['/#productos', 'Productos'], ['/#zonas', 'Zonas'], ['/#comparador', 'Saco vs Contenedor'],
  ['/#proceso', 'Cómo funciona'], ['/#faq', 'Preguntas'],
];

const top = () => `<a class="skip-link" href="#contenido">Saltar al contenido</a>
<div class="fx-progress" aria-hidden="true"><i></i></div>
<div class="fx-grain" aria-hidden="true"></div>

<div class="topbar">
  <div class="topbar__inner">
    <span class="topbar__status"><span class="topbar__dot"></span>Disponible ahora · Entrega en 24 h</span>
    <span class="topbar__sep">·</span>
    <a href="tel:+34677882716" class="topbar__phone">677 882 716</a>
    <span class="topbar__sep">·</span>
    <span>L–V 8:00–19:00 · S 9:00–13:00</span>
  </div>
</div>

<header class="hd" id="hd">
  <a href="/" class="hd__brand" aria-label="Telesaco a domicilio · Madrid, inicio">
    <img class="hd__wm" src="/assets/img/logo-telesaco-completo-claro.svg" alt="Telesaco a domicilio · Madrid" width="190" height="56" />
    <img class="hd__sack" src="/assets/img/saco-escombro-s.webp" alt="" width="240" height="252" decoding="async" />
  </a>
  <nav class="hd__nav" aria-label="Principal">
${NAV.map(([h, t]) => `    <a href="${h}">${t}</a>`).join('\n')}
  </nav>
  <div class="hd__cta"><a href="/#pedir" class="btn btn--primary">Pedir mi saco</a></div>
  <button class="hd__burger" id="burger" aria-label="Abrir menú" aria-expanded="false" aria-controls="mobMenu"><span></span><span></span><span></span></button>
</header>

<div class="mob-menu" id="mobMenu">
${NAV.map(([h, t]) => `  <a href="${h}">${t}</a>`).join('\n')}
  <a href="/#pedir" class="btn btn--primary btn--xl">Pedir mi saco</a>
</div>
`;

const footer = () => `<footer class="ft">
  <div class="ft__brand">
    <img class="ft__wm" src="/assets/img/logo-telesaco-completo-claro.svg" alt="Telesaco a domicilio · Madrid" width="920" height="274" loading="lazy" />
    <img class="ft__sack" src="/assets/img/saco-logo.webp" alt="" width="328" height="383" loading="lazy" decoding="async" />
  </div>
  <div class="ft__cols">
    <div>
      <p class="ft__h">Productos</p>
      <a href="/#productos">Telesaco 1 m³</a>
      <a href="/contenedores-escombro-madrid">Contenedor 3 m³</a>
      <a href="/contenedores-escombro-madrid">Contenedor 6 m³</a>
    </div>
    <div>
      <p class="ft__h">Municipios con telesaco</p>
      <a href="/saco-escombro-madrid-capital">Saco escombro Madrid Capital</a>
      <a href="/saco-escombro-alcorcon">Saco escombro Alcorcón</a>
      <a href="/saco-escombro-mostoles">Saco escombro Móstoles</a>
      <a href="/saco-escombro-getafe">Saco escombro Getafe</a>
      <a href="/saco-escombro-leganes">Saco escombro Leganés</a>
      <a href="/saco-escombro-fuenlabrada">Saco escombro Fuenlabrada</a>
      <a href="/saco-escombro-pozuelo-de-alarcon">Saco escombro Pozuelo</a>
    </div>
    <div>
      <p class="ft__h">Más municipios</p>
      <a href="/saco-escombro-rivas-vaciamadrid">Saco escombro Rivas</a>
      <a href="/saco-escombro-coslada">Saco escombro Coslada</a>
      <a href="/saco-escombro-arganda-del-rey">Saco escombro Arganda</a>
      <a href="/saco-escombro-parla">Saco escombro Parla</a>
      <a href="/saco-escombro-san-sebastian-de-los-reyes">Saco escombro Sanse</a>
      <a href="/saco-escombro-san-fernando-de-henares">Saco escombro S. Fernando</a>
    </div>
    <div>
      <p class="ft__h">Empresa</p>
      <a href="/#proceso">Cómo funciona</a>
      <a href="/#faq">FAQ</a>
      <a href="/politica-privacidad">Política de privacidad</a>
      <a href="/condiciones">Condiciones del servicio</a>
      <a href="/aviso-legal">Aviso legal</a>
    </div>
    <div>
      <p class="ft__h">Contacto</p>
      <a href="tel:+34677882716">677 882 716</a>
      <a href="https://wa.me/34677882716" target="_blank" rel="noopener">WhatsApp</a>
      <span>L–V 8:00–19:00 · S 9:00–13:00</span>
    </div>
  </div>
  <div class="ft__bar">
    <small>© <span id="y"></span> Telesaco en Madrid · Servicio en toda la Comunidad de Madrid</small>
    <small>Gestor autorizado de RCDs</small>
  </div>
</footer>
`;

const wsp = (href = 'https://wa.me/34677882716?text=Hola,%20quiero%20un%20telesaco', label = 'WhatsApp') => `<a href="${href}" class="wsp" target="_blank" rel="noopener" aria-label="${label}">
  <span class="wsp__tip" aria-hidden="true">¿Hablamos?</span>
  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="${WSP_PATH}"/></svg>
</a>

<div class="toast" id="toast" role="status" aria-live="polite"></div>

<script src="/src/js/main.js?v=${VERSION}" defer></script>
<script src="/src/js/fx.js?v=${VERSION}" defer></script>
<script src="/src/js/fx2.js?v=${VERSION}" defer></script>`;

module.exports = { VERSION, ICONS, FONTS, STYLES, ARROW, CHECK, PIN, top, footer, wsp };
