const Product = require('../models/product.models');

const verifySeller = async (req, res, next) => {
  try {
    const user = req.user;
    const product = await Product.findById(req.params.id);

    const sellerId = product.sellerId.toString();
    if (sellerId === user._id || user.isAdmin) {
      return next();
    }
  } catch (e) {
    return res.status(500).send('You are not authorized');
  }
};
module.exports = {
  verifySeller,
};
