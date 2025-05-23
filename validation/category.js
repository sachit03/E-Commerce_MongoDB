const Joi = require('joi');
exports.categorySchema = Joi.object({
  name: Joi.string().max(50).required(),
  description: Joi.string().max(500).allow('')
});

