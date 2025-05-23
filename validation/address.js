const Joi = require('joi');
exports.addressSchema = Joi.object({
  street: Joi.string().max(100).required(),
  city: Joi.string().max(50).required(),
  state: Joi.string().max(50).required(),
  postalCode: Joi.string().max(20).required(),
  country: Joi.string().max(50).required(),
  type: Joi.string().valid('shipping','billing').required()
});
