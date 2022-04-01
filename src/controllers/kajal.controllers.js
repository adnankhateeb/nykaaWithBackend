const express = require('express');

const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const authorise = require('../middlewares/authorise');
const {verifySellerKajal} = require('../middlewares/verifySeller')
const Kajal = require('../models/kajal.models');


router.post('', authenticate, authorise, async (req, res) => {

  try {
    const kajal = await Kajal.create(req.body);
    return res.status(200).send(kajal);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

router.get('', async (req, res) => {
  try {
    const kajal = await Kajal.find().lean().exec();
    return res.status(200).json(kajal);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

router.patch(
  '/:id',
  authenticate,
  authorise,
  verifySellerKajal,
  async (req, res) => {
    req.body.user_id = req.userID;
    try {
      const kajal = await Kajal.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        price: req.body.price,
      });
      return res.status(200).send(kajal);
    } catch (err) {
      return res.status(400).send({ message: err.message });
    }
  }
);

router.delete(
  '/:id',
  authenticate,
  authorise,
  verifySellerKajal,
  async (req, res) => {
    req.body.user_id = req.userID;
    try {
      const kajal = await Kajal.findByIdAndDelete(req.params.id);
      return res.status(200).send(kajal);
    } catch (err) {
      return res.status(400).send({ message: err.message });
    }
  }
);

module.exports = router;
