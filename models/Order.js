const { Schema, model } = require('mongoose');
const orderSchema = new Schema({
  userId:          { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    productId:       { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity:        { type: Number, required: true, min: 1 },
    price:           { type: Number, required: true, min: 0 }
  }],
  totalAmount:     { type: Number, required: true, min: 0 },
  paymentIntentId: { type: String },
  paymentStatus:   { type: String, default: 'requires_payment' },
  status:          { type: String, enum: ['pending','confirmed','shipped','delivered','cancelled'], default: 'pending' },
  shippingAddress: { type: Schema.Types.ObjectId, ref: 'Address', required: true },
  billingAddress:  { type: Schema.Types.ObjectId, ref: 'Address', required: true }
}, { timestamps: true });
module.exports = model('Order', orderSchema);
