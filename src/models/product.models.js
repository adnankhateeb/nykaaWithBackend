const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    link: { type: String, required: true },
    title: { type: String, required: true },
    rating: { type: String, required: false, default: '✩✩✩✩✩' },
    price: { type: String, required: true },
    bestseller: { type: String, required: false, default: '' },
    numberOfRatings: { type: Number, required: false, default: 0 },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    category: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Product = new mongoose.model('product', productSchema);

module.exports = Product;
