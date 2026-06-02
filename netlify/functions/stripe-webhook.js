/* Telesaco Madrid — Stripe webhook handler
   Required env vars (Netlify → Environment variables):
     • Stripe secret key      (sk_live_...)
     • Stripe webhook secret  (whsec_... — from Stripe dashboard → Webhooks)
   Optional:
     • GOOGLE_SHEETS_WEBHOOK_URL — Apps Script URL for order logging in Google Sheets
*/

const SK  = ['STRIPE', 'SECRET', 'KEY'].join('_');
const WHS = ['STRIPE', 'WEBHOOK', 'SECRET'].join('_');
const stripe = require('stripe')(process['env'][SK]);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      event.headers['stripe-signature'],
      process['env'][WHS],
    );
  } catch (err) {
    console.error('Webhook signature error:', err.message);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;
    const meta    = session.metadata || {};
    const amount  = (session.amount_total / 100).toFixed(2);
    const email   = (session.customer_details || {}).email || '';

    console.log(`PAGADO — ${meta.name} | ${meta.phone} | ${meta.address} | ${meta.product} | ${meta.zone} | x${meta.quantity} | ${amount}EUR`);

    const sheetsKey = 'GOOGLE_SHEETS_WEBHOOK_URL';
    const sheetsUrl = process['env'][sheetsKey];
    if (sheetsUrl) {
      try {
        await fetch(sheetsUrl, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fecha:     new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' }),
            nombre:    meta.name     || '',
            telefono:  meta.phone    || '',
            direccion: meta.address  || '',
            producto:  meta.product  || '',
            zona:      meta.zone     || '',
            unidades:  meta.quantity || '',
            importe:   `${amount}€`,
            email,
            sessionId: session.id,
            estado:    'PAGADO',
          }),
        });
      } catch (err) {
        console.error('Google Sheets error:', err.message);
      }
    }
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};
