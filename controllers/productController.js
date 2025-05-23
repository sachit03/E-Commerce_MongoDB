const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  try {
    const prod = new Product(req.body);
    await prod.save();
    res.json({ status: 'Product created', product: prod });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id);
    if (!prod) return res.status(404).json({ error: 'Not found' });
    res.json(prod);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const f = {};
    if (req.query.search) f.name = new RegExp(req.query.search, 'i');
    if (req.query.category) f.category = req.query.category;
    const prods = await Product.find(f);
    res.json(prods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const prod = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!prod) return res.status(404).json({ error: 'Not found' });
    res.json({ status: 'Product updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const prod = await Product.findByIdAndDelete(req.params.id);
    if (!prod) return res.status(404).json({ error: 'Not found' });
    res.json({ status: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
