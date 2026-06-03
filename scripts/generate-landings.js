// Generador de landing pages por municipio
// Uso: node scripts/generate-landings.js

const fs = require('fs');
const path = require('path');

const municipios = [
  {
    slug: 'alcorcon',
    nombre: 'Alcorcón',
    nombreLargo: 'Alcorcón',
    barrios: ['Centro', 'San José de Valderas', 'Parque de Lisboa', 'Las Retamas', 'Las Bayonas', 'Parque Oeste', 'Parque Ondarreta'],
    contexto: 'Alcorcón es uno de los municipios con más actividad de reformas del sur de Madrid. Sus comunidades de vecinos suelen tener patios y plazas interiores que facilitan dejar el saco en propiedad privada sin necesidad de permiso municipal.',
    poblacion: '169.000',
    distancia: 'a 13 km del centro de Madrid',
  },
  {
    slug: 'mostoles',
    nombre: 'Móstoles',
    nombreLargo: 'Móstoles',
    barrios: ['Centro', 'Parque Coimbra', 'Estoril II', 'El Soto', 'Pinares Llanos', 'Norte-Universidad', 'Hospital', 'Iviasa'],
    contexto: 'Móstoles es la tercera ciudad de la Comunidad de Madrid. Con muchas urbanizaciones tipo chalet en barrios como Parque Coimbra o El Soto, es ideal para dejar el telesaco en propiedad privada sin trámites.',
    poblacion: '209.000',
    distancia: 'a 18 km del centro de Madrid',
  },
  {
    slug: 'getafe',
    nombre: 'Getafe',
    nombreLargo: 'Getafe',
    barrios: ['Centro', 'Sector III', 'Buenavista', 'Las Margaritas', 'San Isidro', 'Perales del Río', 'Los Molinos-Manzanares', 'El Bercial', 'Juan de la Cierva'],
    contexto: 'Getafe combina zona industrial activa (polígonos de Los Olivos, El Lomo) con barrios residenciales de bloques y unifamiliares. Damos servicio tanto a particulares como a empresas con factura inmediata.',
    poblacion: '188.000',
    distancia: 'a 14 km del centro de Madrid',
  },
  {
    slug: 'leganes',
    nombre: 'Leganés',
    nombreLargo: 'Leganés',
    barrios: ['Centro', 'Zarzaquemada', 'Vereda de los Estudiantes', 'La Fortuna', 'Solagua', 'San Nicasio', 'El Carrascal', 'Polígono Norte'],
    contexto: 'Leganés es uno de los municipios con más reformas residenciales del sur. Sus barrios maduros (Zarzaquemada, San Nicasio) tienen muchas comunidades en renovación, perfectas para el telesaco.',
    poblacion: '187.000',
    distancia: 'a 11 km del centro de Madrid',
  },
  {
    slug: 'fuenlabrada',
    nombre: 'Fuenlabrada',
    nombreLargo: 'Fuenlabrada',
    barrios: ['Centro', 'Loranca', 'Naranjo', 'El Vivero', 'Cerro Palomera', 'Hospital', 'El Molino'],
    contexto: 'Fuenlabrada tiene una densa zona residencial con bloques de los años 80 y 90 en plena fase de renovación. Damos servicio tanto en barrios consolidados como en urbanizaciones recientes tipo Loranca.',
    poblacion: '191.000',
    distancia: 'a 20 km del centro de Madrid',
  },
  {
    slug: 'pozuelo-de-alarcon',
    nombre: 'Pozuelo de Alarcón',
    nombreLargo: 'Pozuelo de Alarcón',
    barrios: ['Estación', 'La Cabaña', 'Húmera', 'Somosaguas', 'Monteclaro', 'Los Mochuelos', 'Prado de Somosaguas'],
    contexto: 'Pozuelo de Alarcón es un municipio de chalets y urbanizaciones con mucha actividad de reformas premium. La mayoría de viviendas permiten dejar el saco en parcela privada sin trámites.',
    poblacion: '87.000',
    distancia: 'a 14 km del centro de Madrid',
  },
  {
    slug: 'rivas-vaciamadrid',
    nombre: 'Rivas-Vaciamadrid',
    nombreLargo: 'Rivas-Vaciamadrid',
    barrios: ['Rivas Centro', 'Covibar', 'Pablo Iglesias', 'La Luna', 'Ciudadela', 'La Esperanza', 'El Cristo'],
    contexto: 'Rivas-Vaciamadrid es el municipio joven por excelencia del sureste de Madrid. Mayoría de bloques modernos y dúplex con espacio en garaje o trastero para el telesaco, simplificando la logística.',
    poblacion: '100.000',
    distancia: 'a 17 km del centro de Madrid',
  },
  {
    slug: 'coslada',
    nombre: 'Coslada',
    nombreLargo: 'Coslada',
    barrios: ['El Cerro', 'La Estación', 'Ciudad 70', 'San Pablo', 'Rincón de la Vega', 'Valleaguado', 'Avenida de Madrid'],
    contexto: 'Coslada es un municipio compacto del Corredor del Henares con muchas reformas en bloques históricos. Ideal para el telesaco por la cercanía a Madrid capital y la facilidad de aparcamiento.',
    poblacion: '81.000',
    distancia: 'a 12 km del centro de Madrid',
  },
  {
    slug: 'arganda-del-rey',
    nombre: 'Arganda del Rey',
    nombreLargo: 'Arganda del Rey',
    barrios: ['Centro', 'Mirador del Henares', 'La Poveda', 'El Quinto Don Pedro', 'Valdearganda', 'Los Almendros'],
    contexto: 'Arganda del Rey combina núcleo histórico con urbanizaciones nuevas como Valdearganda. Damos servicio a las zonas más alejadas del sureste con el mismo precio único de 50€.',
    poblacion: '56.000',
    distancia: 'a 27 km del centro de Madrid',
  },
  {
    slug: 'parla',
    nombre: 'Parla',
    nombreLargo: 'Parla',
    barrios: ['Centro', 'La Laguna', 'Cantueña', 'Las Mestas', 'El Norte', 'El Mirador', 'Las Américas'],
    contexto: 'Parla es uno de los municipios más densos del sur de Madrid. Sus comunidades tienen mucho recorrido de reformas y rehabilitación energética, donde el telesaco es la solución más práctica.',
    poblacion: '130.000',
    distancia: 'a 23 km del centro de Madrid',
  },
  {
    slug: 'san-sebastian-de-los-reyes',
    nombre: 'San Sebastián de los Reyes',
    nombreLargo: 'San Sebastián de los Reyes',
    barrios: ['Casco Histórico', 'Tempranales', 'Dehesa Vieja', 'Rosa Luxemburgo', 'San Vicente Paúl', 'El Trigal'],
    contexto: 'San Sebastián de los Reyes es un municipio del norte de Madrid con mezcla de viviendas históricas en el Casco y urbanizaciones modernas tipo Tempranales. Damos servicio puntual con un único día de entrega.',
    poblacion: '90.000',
    distancia: 'a 19 km del centro de Madrid',
  },
  {
    slug: 'san-fernando-de-henares',
    nombre: 'San Fernando de Henares',
    nombreLargo: 'San Fernando de Henares',
    barrios: ['Casco Antiguo', 'La Aldehuela', 'Parque Henares', 'Jarama', 'San Fernando Castillo'],
    contexto: 'San Fernando de Henares es un municipio compacto del Corredor con muchas viviendas de los años 70-80 en pleno proceso de reforma. Ideal para sacos de escombro por la facilidad logística.',
    poblacion: '41.000',
    distancia: 'a 17 km del centro de Madrid',
  },
];

const renderHTML = (m) => {
  const barriosHTML = m.barrios.map(b => `    <div class="barrio">${b}</div>`).join('\n');
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
<meta name="theme-color" content="#0f0f0f" />
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
<meta name="description" content="Alquiler de saco de escombro en ${m.nombreLargo} desde 50€. Entrega 24h y recogida incluidas. Saco de 1m³ y 1.000 kg. Servicio en ${m.barrios.slice(0,3).join(', ')} y resto del municipio." />

<title>Saco de Escombro en ${m.nombreLargo} desde 50€ · Entrega 24h | Telesaco</title>
<link rel="canonical" href="https://telesacoenmadrid.es/saco-escombro-${m.slug}" />

<meta property="og:url" content="https://telesacoenmadrid.es/saco-escombro-${m.slug}" />
<meta property="og:site_name" content="Telesaco en Madrid" />
<meta property="og:title" content="Saco de escombro en ${m.nombreLargo} desde 50€" />
<meta property="og:description" content="Saco de escombro a domicilio en ${m.nombreLargo}. Entrega 24h. Recogida incluida. Precio único 50€." />
<meta property="og:type" content="website" />
<meta property="og:locale" content="es_ES" />
<meta property="og:image" content="https://telesacoenmadrid.es/assets/img/og-cover.jpg" />
<meta name="twitter:card" content="summary_large_image" />

<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2218%22 fill=%22%23ffd400%22/><text x=%2250%22 y=%2272%22 font-family=%22Arial Black%22 font-size=%2272%22 font-weight=%22900%22 text-anchor=%22middle%22 fill=%22%230f0f0f%22>T</text></svg>" />

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

<link rel="stylesheet" href="/src/css/landing.css" />

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type":"ListItem","position":1,"name":"Inicio","item":"https://telesacoenmadrid.es/"},
    {"@type":"ListItem","position":2,"name":"Sacos de escombro Madrid","item":"https://telesacoenmadrid.es/sacos-escombro-madrid"},
    {"@type":"ListItem","position":3,"name":"Saco escombro ${m.nombreLargo}","item":"https://telesacoenmadrid.es/saco-escombro-${m.slug}"}
  ]
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Alquiler de saco de escombro en ${m.nombreLargo}",
  "description": "Saco de escombro de 1 m³ y hasta 1.000 kg con entrega 24h y recogida incluida en ${m.nombreLargo}, Comunidad de Madrid.",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Telesaco en Madrid",
    "telephone": "+34655416425",
    "url": "https://telesacoenmadrid.es"
  },
  "areaServed": {"@type":"City","name":"${m.nombreLargo}","containedInPlace":{"@type":"AdministrativeArea","name":"Comunidad de Madrid"}},
  "offers": {
    "@type": "Offer",
    "price": "50.00",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock",
    "url": "https://telesacoenmadrid.es/saco-escombro-${m.slug}"
  }
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type":"Question","name":"¿Cuánto cuesta un saco de escombro en ${m.nombreLargo}?","acceptedAnswer":{"@type":"Answer","text":"El saco de escombro en ${m.nombreLargo} cuesta 50€ con IVA incluido. Si pides menos de 3 sacos se añaden 5€ de envío; desde 3 unidades el envío es gratis."}},
    {"@type":"Question","name":"¿Cuánto tarda en llegar el saco a ${m.nombreLargo}?","acceptedAnswer":{"@type":"Answer","text":"Si pides antes de las 16:00, el saco llega al día siguiente en ${m.nombreLargo} entre las 8:00 y las 18:00. Para urgencias llámanos al 655 416 425."}},
    {"@type":"Question","name":"¿Necesito permiso del Ayuntamiento de ${m.nombreLargo}?","acceptedAnswer":{"@type":"Answer","text":"Si colocas el saco en propiedad privada (portal, garaje, jardín) NO necesitas permiso. Si lo pones en la calle o acera, sí necesitas una licencia de ocupación de vía pública del Ayuntamiento de ${m.nombreLargo}."}},
    {"@type":"Question","name":"¿Hacéis factura para empresas en ${m.nombreLargo}?","acceptedAnswer":{"@type":"Answer","text":"Sí. Facturamos con IVA y CIF a particulares, autónomos y empresas de ${m.nombreLargo} desde el primer servicio."}}
  ]
}
</script>
</head>
<body>

<div class="topbar">
  <span class="topbar__dot"></span>Disponible ahora · Entrega 24 h · <a href="tel:+34655416425">655 416 425</a> · L–V 8:00–19:00 · S 9:00–13:00
</div>

<header class="hd">
  <a href="/" class="hd__brand" aria-label="Inicio Telesaco">
    <svg viewBox="0 0 40 40" width="36" height="36" aria-hidden="true">
      <rect x="2" y="2" width="36" height="36" rx="8" fill="#FFD400"/>
      <path d="M10 12 H30 L26 30 H14 Z" fill="#0f0f0f"/>
      <path d="M14 18 H26" stroke="#FFD400" stroke-width="1.5"/>
    </svg>
    <span class="hd__name">
      <strong>TELESACO</strong>
      <em>en Madrid</em>
    </span>
  </a>
  <a href="/#pedir" class="hd__cta">Pedir mi saco</a>
</header>

<nav class="crumbs" aria-label="Migas de pan">
  <a href="/">Inicio</a><span>›</span>
  <a href="/sacos-escombro-madrid">Sacos de escombro Madrid</a><span>›</span>
  <span>${m.nombreLargo}</span>
</nav>

<section class="muni-hero">
  <div>
    <span class="muni-hero__badge">📍 ${m.nombreLargo} · ${m.distancia}</span>
    <h1>Saco de escombro<br/>en <em>${m.nombreLargo}</em><br/>desde 50€</h1>
    <p class="muni-hero__sub">
      Alquiler de saco de escombro de <strong>1 m³ y hasta 1.000 kg</strong> en ${m.nombreLargo}.
      Entrega en 24 h, recogida cuando avises y gestión completa del residuo en planta autorizada.
    </p>
    <div>
      <a href="/#pedir" class="muni-hero__cta">
        Pedir mi telesaco
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
      </a>
      <a href="tel:+34655416425" class="muni-hero__cta-sec">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        655 416 425
      </a>
    </div>
  </div>

  <aside class="muni-hero__card">
    <div class="muni-hero__price-row">
      <span class="muni-hero__price-label">Precio único</span>
    </div>
    <div class="muni-hero__price">50<i>€</i></div>
    <p class="muni-hero__price-note">+ 5 € envío · gratis desde 3 sacos · IVA incluido</p>
    <div class="muni-hero__features">
      <div class="muni-hero__feature"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>Capacidad 1 m³ / 1.000 kg</div>
      <div class="muni-hero__feature"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>Entrega 24h en ${m.nombreLargo}</div>
      <div class="muni-hero__feature"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>Recogida cuando avises</div>
      <div class="muni-hero__feature"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>Reciclaje certificado RCD</div>
      <div class="muni-hero__feature"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>Pago seguro · Stripe</div>
    </div>
  </aside>
</section>

<div class="muni-trust">
  <div class="muni-trust__inner">
    <div class="muni-trust__item"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><span><b>+12.000</b> sacos entregados</span></div>
    <div class="muni-trust__item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg><span>Entrega <b>en 24 h</b></span></div>
    <div class="muni-trust__item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg><span>Pago <b>Stripe</b></span></div>
    <div class="muni-trust__item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg><span>${m.poblacion} hab.</span></div>
  </div>
</div>

<article class="muni-section">

  <h2>Saco de escombro a domicilio en <em>${m.nombreLargo}</em></h2>
  <p class="lead">
    Si estás haciendo una reforma en ${m.nombreLargo}, no pierdas un sábado yendo al punto limpio. Te llevamos el saco a casa, lo llenas a tu ritmo y te lo recogemos cuando avises. <strong>Precio único 50€, sin sorpresas en factura.</strong>
  </p>

  <h3>Cuánto cuesta el saco en ${m.nombreLargo}</h3>
  <p>
    El precio en ${m.nombreLargo} es <strong>50€ con IVA incluido</strong>, igual que en el resto de los 13 municipios que cubrimos con telesaco. Se añaden 5€ de envío si pides 1 ó 2 sacos; desde 3 sacos el envío es gratuito. La recogida y la gestión completa del residuo en planta autorizada están siempre incluidas en el precio.
  </p>

  <h3>El servicio de telesaco en ${m.nombreLargo}</h3>
  <p>${m.contexto}</p>

  <h3>Cómo funciona en ${m.nombreLargo}</h3>
  <ol>
    <li><strong>Pides online</strong> en menos de 30 segundos desde la calculadora.</li>
    <li><strong>Recibes el saco al día siguiente</strong> entre las 8:00 y las 18:00 si pediste antes de las 16:00.</li>
    <li><strong>Llenas a tu ritmo</strong> — no cobramos por días, sin presión.</li>
    <li><strong>Nos avisas por WhatsApp</strong> cuando esté lleno y lo recogemos en menos de 48 h.</li>
    <li><strong>Gestionamos el residuo</strong> en planta autorizada de RCD.</li>
  </ol>

  <h3>Barrios y zonas de ${m.nombreLargo} donde entregamos</h3>
  <p>Damos servicio en todos los barrios del municipio. Algunos de ellos:</p>
  <div class="barrios">
${barriosHTML}
  </div>

  <h3>¿Necesito permiso del Ayuntamiento de ${m.nombreLargo}?</h3>
  <ul>
    <li><strong>En propiedad privada</strong> (portal, garaje, jardín, parcela): <strong>no necesitas ningún permiso</strong>.</li>
    <li><strong>En vía pública</strong> (acera, calzada): necesitas <strong>licencia de ocupación de vía pública</strong> del Ayuntamiento de ${m.nombreLargo}.</li>
  </ul>
  <p>Si no puedes dejarlo en privado, lo más práctico es contratar un <a href="/contenedores-escombro-madrid">contenedor metálico</a> con gestión administrativa incluida.</p>

  <h3>Saco o contenedor: qué te conviene</h3>
  <div class="compare">
    <div class="compare__card compare__card--featured">
      <h3>Telesaco</h3>
      <p class="cap">1 m³ · 1.000 kg</p>
      <ul>
        <li>Ideal para baños, cocinas, picado paredes</li>
        <li>Cabe en aceras anchas y propiedad privada</li>
        <li>Sin permiso si va en privado</li>
        <li>Sin coste por días de uso</li>
      </ul>
      <div class="compare__price">50<i>€</i></div>
    </div>
    <div class="compare__card">
      <h3>Contenedor metálico</h3>
      <p class="cap">3 m³ o 6 m³</p>
      <ul>
        <li>Reformas integrales, derribos grandes</li>
        <li>Necesita licencia municipal en calle</li>
        <li>Plazo máximo: 2 semanas</li>
        <li>Mayor capacidad por unidad</li>
      </ul>
      <div class="compare__price">desde 185<i>€</i></div>
    </div>
  </div>

  <h3>Qué se puede tirar</h3>
  <p>Sí: azulejos, ladrillo, mortero, hormigón, yeso, escayola, tabiquería, mampostería, madera de obra. No: pinturas, disolventes, amianto, electrodomésticos, vidrio, líquidos, restos orgánicos, jardinería.</p>

  <h2>Preguntas frecuentes · ${m.nombreLargo}</h2>
  <div class="faq-list">
    <details class="faq-item">
      <summary>¿En qué franja horaria llega el saco a ${m.nombreLargo}?</summary>
      <div class="faq-item__body">Entre las 8:00 y las 18:00 del día siguiente al pedido. Si necesitas franja específica, dínoslo al confirmar por WhatsApp.</div>
    </details>
    <details class="faq-item">
      <summary>¿Cuánto tiempo puedo tener el saco?</summary>
      <div class="faq-item__body">No cobramos por días. Lo tienes lo que necesites y nos avisas cuando esté lleno. Recogida en menos de 48 h desde tu aviso.</div>
    </details>
    <details class="faq-item">
      <summary>¿Hacéis factura para empresa o autónomo?</summary>
      <div class="faq-item__body">Sí. Facturamos con IVA y CIF desde el primer servicio. Indícanos los datos fiscales al hacer la reserva.</div>
    </details>
    <details class="faq-item">
      <summary>¿Puedo poner el saco en la calle de ${m.nombreLargo} sin permiso?</summary>
      <div class="faq-item__body">No legalmente. El Ayuntamiento exige licencia de ocupación de vía pública. Si no puedes ponerlo en privado, contrata un contenedor metálico con gestión administrativa.</div>
    </details>
  </div>

  <h3>Municipios cercanos a ${m.nombreLargo}</h3>
  <p>También damos servicio de telesaco en:</p>
  <div class="vecinos">
    <a href="/saco-escombro-madrid-capital">Madrid Capital</a>
    <a href="/saco-escombro-alcorcon">Alcorcón</a>
    <a href="/saco-escombro-mostoles">Móstoles</a>
    <a href="/saco-escombro-getafe">Getafe</a>
    <a href="/saco-escombro-leganes">Leganés</a>
    <a href="/saco-escombro-fuenlabrada">Fuenlabrada</a>
    <a href="/saco-escombro-pozuelo-de-alarcon">Pozuelo de Alarcón</a>
    <a href="/saco-escombro-coslada">Coslada</a>
  </div>

</article>

<section class="cta-banner">
  <h2>Pide tu saco de escombro en ${m.nombreLargo}</h2>
  <p>50€ precio único · Entrega 24h · Recogida incluida · Pago seguro online</p>
  <a href="/#pedir" class="cta-banner__btn">
    Pedir mi telesaco ahora
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
  </a>
</section>

<footer class="ft">
  <div class="ft__inner">
    <div class="ft__cols">
      <div>
        <h5>Productos</h5>
        <a href="/sacos-escombro-madrid">Saco de escombro</a>
        <a href="/contenedores-escombro-madrid">Contenedor 3 m³</a>
        <a href="/contenedores-escombro-madrid">Contenedor 6 m³</a>
      </div>
      <div>
        <h5>Madrid</h5>
        <a href="/saco-escombro-madrid-capital">Madrid Capital</a>
        <a href="/saco-escombro-alcorcon">Alcorcón</a>
        <a href="/saco-escombro-mostoles">Móstoles</a>
        <a href="/saco-escombro-getafe">Getafe</a>
        <a href="/saco-escombro-leganes">Leganés</a>
      </div>
      <div>
        <h5>Empresa</h5>
        <a href="/">Inicio</a>
        <a href="/condiciones">Condiciones</a>
        <a href="/politica-privacidad">Privacidad</a>
        <a href="/aviso-legal">Aviso legal</a>
      </div>
      <div>
        <h5>Contacto</h5>
        <a href="tel:+34655416425">655 416 425</a>
        <a href="https://wa.me/34655416425" target="_blank" rel="noopener">WhatsApp</a>
        <span>L–V 8:00–19:00 · S 9:00–13:00</span>
      </div>
    </div>
    <div class="ft__bar">
      <small>© 2026 Telesaco en Madrid · Servicio en toda la Comunidad de Madrid</small>
      <small>Gestor autorizado de RCDs</small>
    </div>
  </div>
</footer>

<a href="https://wa.me/34655416425?text=Hola,%20quiero%20un%20telesaco%20en%20${encodeURIComponent(m.nombreLargo)}" class="wsp" target="_blank" rel="noopener" aria-label="WhatsApp">
  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M20.52 3.48A11.82 11.82 0 0 0 12 0C5.37 0 .01 5.36.01 11.98c0 2.11.55 4.17 1.6 5.98L0 24l6.2-1.63a11.95 11.95 0 0 0 5.79 1.48h.01c6.62 0 11.99-5.36 11.99-11.98a11.9 11.9 0 0 0-3.47-8.39zM12 21.79h-.01a9.82 9.82 0 0 1-5-1.37l-.36-.21-3.68.97.98-3.59-.24-.37A9.78 9.78 0 0 1 2.2 11.98C2.2 6.58 6.6 2.2 12 2.2c2.62 0 5.08 1.02 6.93 2.87a9.74 9.74 0 0 1 2.88 6.91c0 5.4-4.4 9.81-9.81 9.81z"/></svg>
</a>

</body>
</html>
`;
};

const outDir = path.join(__dirname, '..');
let count = 0;
municipios.forEach(m => {
  const file = path.join(outDir, `saco-escombro-${m.slug}.html`);
  fs.writeFileSync(file, renderHTML(m), 'utf8');
  count++;
  console.log(`✓ ${file}`);
});
console.log(`\nGenerated ${count} landing pages.`);
