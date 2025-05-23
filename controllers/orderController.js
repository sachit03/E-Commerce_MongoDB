const Order  = require('../models/Order');
const stripe = require('../config/stripe');

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, shippingAddress, billingAddress } = req.body;
    const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100),
      currency: 'usd',
      metadata: { userId: String(userId) }
    });
    const order = new Order({
      userId, items, totalAmount,
      shippingAddress, billingAddress,
      paymentIntentId: paymentIntent.id,
      paymentStatus: paymentIntent.status
    });
    await order.save();
    res.status(201).json({
      status: 'Order pending payment',
      orderId: order._id,
      clientSecret: paymentIntent.client_secret
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, userId: req.user.id });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, userId: req.user.id });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    if (order.status !== 'pending') {
      return res.status(400).json({ error: 'Only pending orders can be cancelled' });
    }
    order.status = 'cancelled';
    await order.save();
    res.json({ status: 'Order cancelled' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
