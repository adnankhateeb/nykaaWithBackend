const express = require('express');

const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const authorise = require('../middlewares/authorise');
const { verifySeller } = require('../middlewares/verifySeller');

const Product = require('../models/product.models');

router.post('', authenticate, authorise, async (req, res) => {
  // req.body.user_id = req.userID;
  // const user = req.user;
  console.log("user:", user)
  try {
    const product = await Product.create({
      link: req.body.link,
      title: req.body.title,
      rating: req.body.rating,
      price: req.body.price,
      bestseller: req.body.bestseller,
      sellerId : req.user._id,
      numberOfRatings: req.body.numberOfRatings,
      category: req.body.category,
    });
    return res.status(200).send(product);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

router.get('/:name', async (req, res) => {
  try {
    const product = await Product.find({ category: req.params.name })
      .lean()
      .exec();
    return res.status(200).send(product);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

router.patch(
  '/:name/:id',
  authenticate,
  authorise,
  verifySeller,
  async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        price: req.body.price,
      });
      return res.status(200).send(product);
    } catch (err) {
      return res.status(400).send({ message: err.message });
    }
  }
);

router.delete(
  ':name/:id',
  authenticate,
  authorise,
  verifySeller,
  async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      return res.status(200).send(product);
    } catch (err) {
      return res.status(400).send({ message: err.message });
    }
  }
);

module.exports = router;
