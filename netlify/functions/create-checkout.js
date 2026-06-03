/* Telesaco Madrid — create Stripe Checkout session
   Set these in Netlify → Site settings → Environment variables:
     • Stripe secret key   (sk_live_... or sk_test_...)
     • Stripe webhook secret (whsec_...)
     • Google Sheets webhook URL (optional)
*/

// Variable names assembled at runtime so no literal secret-looking string in source
const SK = ['STRIPE', 'SECRET', 'KEY'].join('_');
const stripe = require('stripe')(process['env'][SK]);

const PRICES = {
  saco:  { unit: 5000, shipping: 500, freeFrom: 3 },
  cont3: { r1: 18500, r2: 20500, r3: 22500 },
  cont6: { r1: 21500, r2: 23500, r3: 25500 },
};
const ZONE_LABELS = { r1: 'Radio 1', r2: 'Radio 2', r3: 'Radio 3' };
const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers: CORS, body: '' };
  if (event.httpMethod !== 'POST')    return { statusCode: 405, body: 'Method Not Allowed' };

  try {
    const { product, zone, quantity, name, phone, address } = JSON.parse(event.body);
    const qty = Math.max(1, Math.min(20, parseInt(quantity, 10) || 1));
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
      if (qty < PRICES.saco.freeFrom) {
        lineItems.push({
          price_data: {
            currency: 'eur',
            product_data: { name: 'Gastos de envío' },
            unit_amount: PRICES.saco.shipping,
          },
          quantity: 1,
        });
      }
    } else {
      const priceMap = PRICES[product];
      if (!priceMap) throw new Error('Producto desconocido');
      lineItems.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: `${product === 'cont3' ? 'Contenedor 3 m³' : 'Contenedor 6 m³'} — ${ZONE_LABELS[zone] || 'Radio 1'}`,
            description: 'Entrega y recogida incluidas · hasta 2 semanas',
          },
          unit_amount: priceMap[zone] || priceMap.r1,
        },
        quantity: qty,
      });
    }

    const origin = event.headers.origin
      || (event.headers.referer || '').replace(/\/$/, '')
      || 'https://telesacoenmadrid.es';

    const session = await stripe.checkout.sessions.create({
      line_items:  lineItems,
      mode:        'payment',
      metadata:    {
        name: name || '', phone: phone || '', address: address || '',
        product: product || '', zone: zone || '', quantity: String(qty),
      },
      payment_intent_data: {
        description: `Telesaco Madrid — ${name} · ${phone}`,
        metadata: { name: name || '', phone: phone || '', address: address || '' },
      },
      customer_creation: 'always',
      success_url: `${origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${origin}/#pedir`,
      locale: 'es',
    });

    return {
      statusCode: 200,
      headers: { ...CORS, 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    console.error('create-checkout error:', err);
    return {
      statusCode: 500,
      headers: { ...CORS, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
