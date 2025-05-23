const Cart = require('../models/Cart');

async function findOrCreateCart(userId) {
  let cart = await Cart.findOne({ userId });
  if (!cart) cart = new Cart({ userId, items: [] });
  return cart;
}

exports.addProductToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    const cart = await findOrCreateCart(userId);
    const idx = cart.items.findIndex(i => String(i.productId) === productId);
    if (idx > -1) cart.items[idx].quantity += quantity;
    else cart.items.push({ productId, quantity });
    await cart.save();
    res.json({ status: 'Added to cart', cart });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllCartItems = async (req, res) => {
  try {
    const cart = await findOrCreateCart(req.user.id);
    res.json(cart.items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    const cart = await findOrCreateCart(userId);
    cart.items = cart.items.filter(i => String(i.productId) !== productId);
    await cart.save();
    res.json({ status: 'Item removed', items: cart.items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
