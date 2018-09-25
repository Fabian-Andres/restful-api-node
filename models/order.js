'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create order model
const OrderSchema = new Schema({
  name: { type: String, required: false },
  total: { type: Number, required: [true, 'Total  is required'] },
  date: { type: Date, default: Date.now },
  items: [
    {
      name: { type: String, required: [true, 'Name is required'] },
      price: { type: Number, required: [true, 'Price  is required'] },
      qty: { type: Number, required: [true, 'Quantity  is required'] },
      product: { type: Schema.Types.ObjectId, required: [true, 'Product id is required'] }
    }
  ]
});

module.exports = mongoose.model('Order', OrderSchema);
