const Address = require('../models/Address');

exports.addAddress = async (req, res) => {
  try {
    const addr = new Address({ ...req.body, userId: req.user.id });
    await addr.save();
    res.status(201).json({ status: 'Address added', address: addr });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const addr = await Address.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!addr) return res.status(404).json({ error: 'Address not found' });
    res.json({ status: 'Address updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserAddresses = async (req, res) => {
  try {
    const addrs = await Address.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(addrs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const addr = await Address.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!addr) return res.status(404).json({ error: 'Address not found' });
    res.json({ status: 'Address deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
