const Joi = require('joi');
exports.productSchema = Joi.object({
  name:        Joi.string().max(100).required(),
  description: Joi.string().max(1000).allow(''),
  price:       Joi.number().min(0).required(),
  stock:       Joi.number().min(0).required(),
  category:    Joi.string().hex().length(24).required()
});
