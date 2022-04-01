const express = require('express');

const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const authorise = require('../middlewares/authorise');
const { verifySellerPerfume } = require('../middlewares/verifySeller');

const Perfume = require('../models/perfume.models');

router.post('', authenticate, authorise, async (req, res) => {
  // req.body.user_id = req.userID;
  try {
    const perfume = await Perfume.create(req.body);
    return res.status(200).send(perfume);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

router.get('', async (req, res) => {
  try {
    const perfume = await Perfume.find().lean().exec();
    return res.status(200).send(perfume);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});


router.patch(
  '/:id',
  authenticate,
  authorise,
  verifySellerPerfume,
  async (req, res) => {
    req.body.user_id = req.userID;
    try {
      const perfume = await Perfume.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        price: req.body.price,
      });
      return res.status(200).send(perfume);
    } catch (err) {
      return res.status(400).send({ message: err.message });
    }
  }
);

router.delete(
  '/:id',
  authenticate,
  authorise,
  verifySellerPerfume,
  async (req, res) => {
    req.body.user_id = req.userID;
    try {
      const perfume = await Perfume.findByIdAndDelete(req.params.id);
      return res.status(200).send(perfume);
    } catch (err) {
      return res.status(400).send({ message: err.message });
    }
  }
);


module.exports = router;
