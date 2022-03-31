const express = require('express');

const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const authorise = require('../middlewares/authorise');
const { verifySellerFace } = require('../middlewares/verifySeller');

const Health = require('../models/health.models');

router.post('', authenticate, authorise, async (req, res) => {
  req.body.user_id = req.userID;
  try {
    const health = await Health.create(req.body);
    return res.status(200).send(health);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

router.get('', async (req, res) => {
  try {
    const health = await Health.find().lean().exec();
    return res.status(200).send(health);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

router.patch(
  '/:id',
  authenticate,
  authorise,
  verifySellerFace,
  async (req, res) => {
    req.body.user_id = req.userID;
    try {
      const health = await Health.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        price: req.body.price,
      });
      return res.status(200).send(health);
    } catch (err) {
      return res.status(400).send({ message: err.message });
    }
  }
);

router.delete(
  '/:id',
  authenticate,
  authorise,
  verifySellerFace,
  async (req, res) => {
    req.body.user_id = req.userID;
    try {
      const health = await Health.findByIdAndDelete(req.params.id);
      return res.status(200).send(health);
    } catch (err) {
      return res.status(400).send({ message: err.message });
    }
  }
);

module.exports = router;
