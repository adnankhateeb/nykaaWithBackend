const Kajal = require('../models/kajal.models');
const Face = require('../models/face.models');
const Men = require('../models/men.models');
const Hair = require('../models/hair.models');
const Perfume = require('../models/perfume.models');

const verifySellerKajal = async (req, res, next) => {
  const user = req.user;
  const kajal = await Kajal.findById(req.params.id);

  const kajalId = kajal.sellerId.toString();
  if (kajalId === user._id) {
    return next();
  }
  return res.status(500).send('You are not authorized');
};

const verifySellerFace = async (req, res, next) => {
  const user = req.user;
  const face = await Face.findById(req.params.id);

  const faceId = face.sellerId.toString();
  if (faceId === user._id) {
    return next();
  }
  return res.status(500).send('You are not authorized');
};

const verifySellerMen = async (req, res, next) => {
  const user = req.user;
  const men = await Men.findById(req.params.id);

  const menId = men.sellerId.toString();
  if (menId === user._id) {
    return next();
  }
  return res.status(500).send('You are not authorized');
};

const verifySellerHair = async (req, res, next) => {
  const user = req.user;
  const hair = await Hair.findById(req.params.id);

  const hairId = hair.sellerId.toString();
  if (hairId === user._id) {
    return next();
  }
  return res.status(500).send('You are not authorized');
};

const verifySellerPerfume = async (req, res, next) => {
  const user = req.user;
  const perfume = await Perfume.findById(req.params.id);

  const perfumeId = perfume.sellerId.toString();
  if (perfumeId === user._id) {
    return next();
  }
  return res.status(500).send('You are not authorized');
};

module.exports = {
  verifySellerFace,
  verifySellerHair,
  verifySellerKajal,
  verifySellerMen,
  verifySellerPerfume,
};

