const Joi = require('joi');
exports.registerSchema = Joi.object({
  name:     Joi.string().min(1).max(100).required(),
  email:    Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role:     Joi.string().valid('user','admin').default('user')
});
exports.loginSchema = Joi.object({
  email:    Joi.string().email().required(),
  password: Joi.string().required()
});
