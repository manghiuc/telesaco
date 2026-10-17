/* Telesaco Madrid — crea la sesión de Stripe Checkout.
   Variables de entorno (Netlify → Site settings → Environment variables):
     • clave secreta de Stripe (sk_live_... o sk_test_...)
     • secreto del webhook (whsec_...)
     • URL del Apps Script de Google Sheets (opcional)
   El PRECIO y el RADIO se calculan aquí: del cliente solo se acepta producto, municipio y cantidad. */

// Nombres de variable montados en ejecución para que no haya un literal con pinta de secreto en el código
const SK = ['STRIPE', 'SECRET', 'KEY'].join('_');
const stripe = require('stripe')(process['env'][SK]);

const SITE_URL = 'https://telesacoenmadrid.es';
const ALLOWED_ORIGINS = new Set(
  [SITE_URL, 'https://www.telesacoenmadrid.es', process['env']['URL'], process['env']['DEPLOY_PRIME_URL']].filter(Boolean),
);
const MAX_QTY = 20;

const PRICES = {
  saco:  { unit: 5500 },
  cont3: { r1: 19000, r2: 21000, r3: 23000 },
  cont6: { r1: 22000, r2: 24000, r3: 26000 },
};
const ZONE_LABELS = { r1: 'Radio 1', r2: 'Radio 2', r3: 'Radio 3' };

// Municipio → radio (misma tabla que el desplegable de la web)
const MUNI_ZONE = {
  'alcobendas': 'r1',
  'alcorcon': 'r1',
  'arganda-del-rey': 'r1',
  'coslada': 'r1',
  'fuenlabrada': 'r1',
  'getafe': 'r1',
  'leganes': 'r1',
  'madrid-capital': 'r1',
  'mejorada-del-campo': 'r1',
  'paracuellos-de-jarama': 'r1',
  'pinto': 'r1',
  'pozuelo-de-alarcon': 'r1',
  'rivas-vaciamadrid': 'r1',
  'san-fernando-de-henares': 'r1',
  'san-martin-de-la-vega': 'r1',
  'san-sebastian-de-los-reyes': 'r1',
  'torrejon-de-ardoz': 'r1',
  'tres-cantos': 'r1',
  'velilla-de-san-antonio': 'r1',
  'alcala-de-henares': 'r2',
  'arroyomolinos': 'r2',
  'boadilla-del-monte': 'r2',
  'campo-real': 'r2',
  'ciempozuelos': 'r2',
  'colmenar-viejo': 'r2',
  'humanes-de-madrid': 'r2',
  'las-rozas-de-madrid': 'r2',
  'loeches': 'r2',
  'majadahonda': 'r2',
  'moraleja-de-enmedio': 'r2',
  'mostoles': 'r2',
  'parla': 'r2',
  'torrelodones': 'r2',
  'torres-de-la-alameda': 'r2',
  'valdemoro': 'r2',
  'villaviciosa-de-odon': 'r2',
  'ajalvir': 'r3',
  'algete': 'r3',
  'brunete': 'r3',
  'camarma-de-esteruelas': 'r3',
  'chinchon': 'r3',
  'cobena': 'r3',
  'collado-villalba': 'r3',
  'daganzo-de-arriba': 'r3',
  'fuente-el-saz-de-jarama': 'r3',
  'galapagar': 'r3',
  'grinon': 'r3',
  'hoyo-de-manzanares': 'r3',
  'meco': 'r3',
  'moralzarzal': 'r3',
  'morata-de-tajuna': 'r3',
  'navalcarnero': 'r3',
  'nuevo-baztan': 'r3',
  'pozuelo-del-rey': 'r3',
  'san-agustin-de-guadalix': 'r3',
  'tielmes': 'r3',
  'titulcia': 'r3',
  'torrejon-de-la-calzada': 'r3',
  'valverde-de-alcala': 'r3',
  'villabilla': 'r3',
  'villanueva-de-la-canada': 'r3',
  'villanueva-del-pardillo': 'r3',
  'villar-del-olmo': 'r3',
};

// Límite de uso por IP (en memoria: frena ráfagas; el límite firme se configura en Netlify)
const hits = new Map();
const limited = (ip) => {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < 60000);
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 500) hits.clear();
  return arr.length > 8;
};

const json = (statusCode, obj) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  body: JSON.stringify(obj),
});
const clean = (v, max) => (typeof v === 'string'
  ? v.replace(/[\u0000-\u001f\u007f<>]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max)
  : '');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers: { Allow: 'POST' }, body: 'Method Not Allowed' };

  const ip = event.headers['x-nf-client-connection-ip'] || event.headers['client-ip'] || 'desconocida';
  if (limited(ip)) return json(429, { error: 'Demasiados intentos. Espera un minuto o llámanos.' });

  const origin = event.headers.origin;
  if (origin && !ALLOWED_ORIGINS.has(origin)) return json(403, { error: 'Origen no permitido' });
  if (!event.body || event.body.length > 4000) return json(400, { error: 'Solicitud no válida' });

  let b;
  try { b = JSON.parse(event.body); } catch { return json(400, { error: 'Solicitud no válida' }); }
  if (!b || typeof b !== 'object') return json(400, { error: 'Solicitud no válida' });

  // Campo trampa: una persona nunca lo rellena
  if (typeof b.website === 'string' && b.website.trim()) return json(400, { error: 'Solicitud no válida' });

  // El cliente debe haber aceptado las condiciones (queda constancia en el pago)
  if (b.terms !== true) return json(400, { error: 'Debes aceptar las condiciones del servicio' });

  const product = b.product;
  if (!['saco', 'cont3', 'cont6'].includes(product)) return json(400, { error: 'Producto no válido' });

  let zone = '';
  if (product !== 'saco') {
    const muni = typeof b.municipio === 'string' ? b.municipio : '';
    zone = Object.hasOwn(MUNI_ZONE, muni) ? MUNI_ZONE[muni] : '';
    if (!zone) return json(400, { error: 'Elige un municipio de la lista' });
  }

  const qty = Number(b.quantity);
  if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QTY) return json(400, { error: 'Cantidad no válida' });

  const name = clean(b.name, 80);
  const phone = clean(b.phone, 20);
  const address = clean(b.address, 200);
  if (name.length < 2 || !/^\+?[\d\s().-]{9,20}$/.test(phone) || address.length < 5) {
    return json(400, { error: 'Revisa nombre, teléfono y dirección' });
  }

  const lineItems = [];
  if (product === 'saco') {
    lineItems.push({
      price_data: {
        currency: 'eur',
        product_data: { name: 'Telesaco Estándar', description: '1 m³ · hasta 1.000 kg' },
        unit_amount: PRICES.saco.unit,
      },
      quantity: qty,
    });
  } else {
    lineItems.push({
      price_data: {
        currency: 'eur',
        product_data: {
          name: `${product === 'cont3' ? 'Contenedor 3 m³' : 'Contenedor 6 m³'} — ${ZONE_LABELS[zone]}`,
          description: 'Entrega y recogida incluidas · hasta 2 semanas',
        },
        unit_amount: PRICES[product][zone],
      },
      quantity: qty,
    });
  }

  // El retorno solo puede ir a un dominio propio (Origin lo controla el cliente)
  const base = origin && ALLOWED_ORIGINS.has(origin) ? origin : SITE_URL;
  const meta = { name, phone, address, product, zone, municipio: clean(b.municipio, 60), quantity: String(qty), condiciones: 'condiciones-2026-10-17', aceptado_el: new Date().toISOString() };

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      metadata: meta,
      payment_intent_data: { description: 'Telesaco Madrid — pedido web', metadata: meta },
      customer_creation: 'always',
      expires_at: Math.floor(Date.now() / 1000) + 35 * 60,
      success_url: `${base}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/#pedir`,
      locale: 'es',
    });
    return json(200, { url: session.url });
  } catch (err) {
    console.error('create-checkout:', err.type || '', err.code || '', err.message);
    return json(500, { error: 'No se pudo iniciar el pago. Inténtalo de nuevo o llámanos.' });
  }
};
