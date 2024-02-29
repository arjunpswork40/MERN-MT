const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const stocksSchema = new mongoose.Schema({
  month: {
    type: String,
    required: false
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


const Stock = mongoose.model('Stock', stocksSchema);

module.exports = Stock;
