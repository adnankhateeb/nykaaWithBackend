const express = require('express');

const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const Cart = require('../models/cart.models');

router.get('', authenticate, async (req, res) => {
  const user = req.user;
  // console.log(user);
  // console.log(user);
  try {
    const cart = await Cart.findOne({ userId: user._id }).lean().exec();
    // console.log('cart:', cart);
    return res.status(200).send(cart.cartProducts);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

router.post('', authenticate, async (req, res) => {
  // req.body.user_id = req.userID;
  const user = req.user;
  // console.log(user);
  try {
    // console.log('post', req.body);
    const cart = await Cart.findOneAndUpdate(
      { userId: user._id.toString() },

      {
        $push: {
          cartProducts: req.body,
        },
      },
      { new: true, upsert: true }
    );
    return res.status(200).send(cart);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

router.patch('', authenticate, async (req, res) => {
  // req.body.user_id = req.userID;
  const user = req.user;
  // console.log(user);
  try {
   
    let cartItem = await Cart.updateOne(
      {
        userId: user._id.toString(),
      },
      {
        $pull: {
          cartProducts: {
            title: req.body.title,
          },
        },
      }
    );
    console.log(cartItem)
    return res.status(200).send(cartItem);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});
module.exports = router;
