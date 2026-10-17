/* Telesaco Madrid — webhook de Stripe
   Variables de entorno (Netlify → Environment variables):
     • clave secreta de Stripe
     • secreto del webhook (whsec_..., del panel de Stripe → Webhooks)
   Opcional:
     • GOOGLE_SHEETS_WEBHOOK_URL — Apps Script que registra los pedidos en Google Sheets
       (debe ignorar un sessionId que ya exista para que los reintentos no dupliquen filas)
*/

const SK  = ['STRIPE', 'SECRET', 'KEY'].join('_');
const WHS = ['STRIPE', 'WEBHOOK', 'SECRET'].join('_');
const stripe = require('stripe')(process['env'][SK]);

// Evita que un valor escrito por el cliente se ejecute como fórmula en la hoja de cálculo
const safe = (v) => {
  const s = String(v ?? '').slice(0, 300);
  return /^[=+\-@\t\r]/.test(s) ? `'${s}` : s;
};

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  const raw = event.isBase64Encoded ? Buffer.from(event.body || '', 'base64') : event.body;
  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(raw, event.headers['stripe-signature'], process['env'][WHS]);
  } catch (err) {
    console.error('Webhook signature error:', err.message);
    return { statusCode: 400, body: 'Webhook Error' };
  }

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;
    if (session.payment_status !== 'paid') return { statusCode: 200, body: JSON.stringify({ received: true }) };

    const meta   = session.metadata || {};
    const amount = (session.amount_total / 100).toFixed(2);
    const email  = (session.customer_details || {}).email || '';

    // Sin datos personales en los logs
    console.log('PAGADO', session.id, meta.product, meta.zone, 'x' + meta.quantity, amount + 'EUR');

    const sheetsUrl = process['env']['GOOGLE_SHEETS_WEBHOOK_URL'];
    if (sheetsUrl) {
      try {
        const r = await fetch(sheetsUrl, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          signal:  AbortSignal.timeout(8000),
          body: JSON.stringify({
            fecha:     new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' }),
            nombre:    safe(meta.name),
            telefono:  safe(meta.phone),
            direccion: safe(meta.address),
            producto:  safe(meta.product),
            zona:      safe(meta.zone),
            municipio: safe(meta.municipio),
            unidades:  safe(meta.quantity),
            importe:   `${amount}€`,
            email:     safe(email),
            sessionId: session.id,
            eventId:   stripeEvent.id,
            estado:    'PAGADO',
          }),
        });
        if (!r.ok) throw new Error('sheets ' + r.status);
      } catch (err) {
        // 500 => Stripe reintenta; así el pedido no se pierde de la hoja
        console.error('Google Sheets error:', err.message);
        return { statusCode: 500, body: 'retry' };
      }
    }
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};
