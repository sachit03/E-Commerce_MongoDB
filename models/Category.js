const { Schema, model } = require('mongoose');
const categorySchema = new Schema({
  name: { type: String, required: true, maxlength: 50 },
  description: { type: String, maxlength: 500 }
}, { timestamps: true });
module.exports = model('Category', categorySchema);
