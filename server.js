import Stripe from 'stripe';
import express from 'express';
import cors from 'cors';

const stripe = Stripe(process.env.STRIPE_SECRET);
const app = express();
const FRONT_DOMAIN = process.env.FRONT_DOMAIN;

const PRODUCTS = {
  basic_monthly: {
    name: 'Plan Básico',
    description: 'Acceso a consultas básicas y funciones esenciales',
    price: 1999, // $19.99
  },
  pro_monthly: {
    name: 'Plan Profesional',
    description: 'Acceso completo con funciones avanzadas',
    price: 4999, // $49.99
  },
  enterprise_monthly: {
    name: 'Plan Empresarial',
    description: 'Solución personalizada para empresas',
    price: 9999, // $99.99
  }
};

// Función para asegurarse de que existen los productos y precios
async function ensureProductsAndPrices() {
  for (const [lookup_key, product] of Object.entries(PRODUCTS)) {
    try {
      // Buscar si ya existe un precio con este lookup_key
      const existingPrices = await stripe.prices.list({
        lookup_keys: [lookup_key],
        expand: ['data.product'],
      });

      if (existingPrices.data.length === 0) {
        // Crear el producto si no existe el precio
        const stripeProduct = await stripe.products.create({
          name: product.name,
          description: product.description,
        });

        // Crear el precio para el producto
        await stripe.prices.create({
          unit_amount: product.price,
          currency: 'usd',
          recurring: {
            interval: 'month'
          },
          product: stripeProduct.id,
          lookup_key: lookup_key,
        });

        console.log(`Created product and price for ${lookup_key}`);
      }
    } catch (error) {
      console.error(`Error ensuring product ${lookup_key}:`, error);
    }
  }
}

app.use(cors({
  origin: FRONT_DOMAIN,
}));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  try {
    // Asegurarse de que existen los productos y precios
    await ensureProductsAndPrices();

    const prices = await stripe.prices.list({
      lookup_keys: [req.body.lookup_key],
      expand: ['data.product'],
    });

    if (!prices.data.length) {
      throw new Error(`No price found for lookup key: ${req.body.lookup_key}`);
    }

    const session = await stripe.checkout.sessions.create({
      billing_address_collection: 'auto',
      line_items: [
        {
          price: prices.data[0].id,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${FRONT_DOMAIN}?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONT_DOMAIN}?canceled=true`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/create-portal-session', async (req, res) => {
  try {
    const { session_id } = req.body;
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: checkoutSession.customer,
      return_url: FRONT_DOMAIN,
    });

    res.redirect(portalSession.url);
  } catch (error) {
    console.error('Error creating portal session:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  (request, response) => {
    let event = request.body;
    const endpointSecret = 'whsec_12345';

    if (endpointSecret) {
      const signature = request.headers['stripe-signature'];
      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
      }
    }

    let subscription;
    let status;

    switch (event.type) {
      case 'customer.subscription.trial_will_end':
      case 'customer.subscription.deleted':
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        break;
      case 'entitlements.active_entitlement_summary.updated':
        subscription = event.data.object;
        console.log(`Active entitlement summary updated for ${subscription}.`);
        break;
      default:
        console.log(`Unhandled event type ${event.type}.`);
    }

    response.send();
  }
);

// Crear productos y precios al iniciar el servidor
ensureProductsAndPrices().then(() => {
  app.listen(4242, () => console.log('Running on port 4242'));
});
