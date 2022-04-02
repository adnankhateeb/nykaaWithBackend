const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    cartProducts: {
      type: Array
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Cart = new mongoose.model('cart', cartSchema);

module.exports = Cart;
