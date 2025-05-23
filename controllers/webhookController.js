const Order  = require('../models/Order');
const stripe = require('../config/stripe');

exports.handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  if (event.type === 'payment_intent.succeeded') {
    const pi = event.data.object;
    const order = await Order.findOne({ paymentIntentId: pi.id });
    if (order) {
      order.paymentStatus = pi.status;
      order.status = 'confirmed';
      await order.save();
      console.log(`Order ${order._id} marked confirmed.`);
    }
  }
  res.json({ received: true });
};
