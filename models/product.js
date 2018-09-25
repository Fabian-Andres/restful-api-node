'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create product model
const ProductSchema = Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  name: String,
  picture: String,
  price: { type: Number, default: 0 },
  category: { type: String, enum: ['computers', 'phones', 'accesories'] },
  description: String
});

module.exports = mongoose.model('Product', ProductSchema);
