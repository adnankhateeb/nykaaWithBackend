const mongoose = require('mongoose');

const kajalSchema = new mongoose.Schema(
  {
    link: { type: String, required: true },
    title: { type: String, required: true },
    rating: { type: String, required: true },
    price: { type: String, required: true },
    bestseller: { type: String, required: true },
    numberOfRatings: { type: Number, required: true },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Kajal = new mongoose.model('kajal', kajalSchema);

module.exports = Kajal;
