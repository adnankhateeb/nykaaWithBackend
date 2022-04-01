const express = require('express');

const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const authorise = require('../middlewares/authorise');
const { verifySellerFace } = require('../middlewares/verifySeller');

const Face = require('../models/face.models');

router.post('',authenticate, authorise, async (req, res) => {
  // req.body.user_id = req.userID;
  try {
    const face = await Face.create(req.body);
    return res.status(200).send(face);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

router.get('', async (req, res) => {
  try {
    const face = await Face.find().lean().exec();
    return res.status(200).send(face);
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
      const face = await Face.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        price: req.body.price,
      });
      return res.status(200).send(face);
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
      const face = await Face.findByIdAndDelete(req.params.id);
      return res.status(200).send(face);
    } catch (err) {
      return res.status(400).send({ message: err.message });
    }
  }
);


module.exports = router;
