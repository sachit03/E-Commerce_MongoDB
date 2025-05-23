const { Schema, model } = require('mongoose');
const addressSchema = new Schema({
  street:     { type: String, required: true, maxlength: 100 },
  city:       { type: String, required: true, maxlength: 50 },
  state:      { type: String, required: true, maxlength: 50 },
  postalCode: { type: String, required: true, maxlength: 20 },
  country:    { type: String, required: true, maxlength: 50 },
  type:       { type: String, enum: ['shipping','billing'], required: true },
  userId:     { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });
module.exports = model('Address', addressSchema);
