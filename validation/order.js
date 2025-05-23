const Joi = require('joi');
exports.orderSchema = Joi.object({
  items: Joi.array().items(
    Joi.object({
      productId: Joi.string().hex().length(24).required(),
      quantity:  Joi.number().min(1).required(),
      price:     Joi.number().min(0).required()
    })
  ).min(1).required(),
  shippingAddress: Joi.string().hex().length(24).required(),
  billingAddress:  Joi.string().hex().length(24).required()
});
