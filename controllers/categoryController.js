const Category = require('../models/Category');

exports.addCategory = async (req, res) => {
  try {
    const cat = new Category(req.body);
    await cat.save();
    res.json({ status: 'Category created', category: cat });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCategoryDetails = async (req, res) => {
  try {
    const cat = await Category.findById(req.params.id);
    if (!cat) return res.status(404).json({ error: 'Not found' });
    res.json(cat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllCategory = async (req, res) => {
  try {
    const q = req.query.search ? { name: new RegExp(req.query.search, 'i') } : {};
    const cats = await Category.find(q);
    res.json(cats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const cat = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cat) return res.status(404).json({ error: 'Not found' });
    res.json({ status: 'Category updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const cat = await Category.findByIdAndDelete(req.params.id);
    if (!cat) return res.status(404).json({ error: 'Not found' });
    res.json({ status: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
