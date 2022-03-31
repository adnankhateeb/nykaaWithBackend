const express = require('express');

const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const authorise = require('../middlewares/authorise');
const { verifySellerMen } = require('../middlewares/verifySeller');

const Men = require('../models/men.models');

router.post('',authenticate, authorise,  async (req, res) => {
  req.body.user_id = req.userID;
  try {
    const men = await Men.create(req.body);
    return res.status(200).send(men);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

router.get('', async (req, res) => {
  try {
    const men = await Men.find().lean().exec();
    return res.status(200).send(men);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});


router.patch(
  '/:id',
  authenticate,
  authorise,
  verifySellerMen,
  async (req, res) => {
    req.body.user_id = req.userID;
    try {
      const men = await Men.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        price: req.body.price,
      });
      return res.status(200).send(men);
    } catch (err) {
      return res.status(400).send({ message: err.message });
    }
  }
);

router.delete(
  '/:id',
  authenticate,
  authorise,
  verifySellerMen,
  async (req, res) => {
    req.body.user_id = req.userID;
    try {
      const men = await Men.findByIdAndDelete(req.params.id);
      return res.status(200).send(men);
    } catch (err) {
      return res.status(400).send({ message: err.message });
    }
  }
);

module.exports = router;
