require('dotenv').config();
const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) return reject(err);

      return resolve(decoded);
    });
  });
};

const authenticate = async (req, res, next) => {
  const newToken = req.cookies.token;
  // console.log(newToken);

  if (!newToken) {
    return res
      .status(400)
      .send({ message: 'Authorization token not found or incorrect' });
  }

  let decoded;
  try {
    decoded = await verifyToken(newToken);
  } catch (err) {
    return res
      .status(400)
      .send({ message: 'You are not authorized to perform this action' });
  }

  req.user = decoded.user;

  console.log(req.user)
  return next();
};

module.exports = authenticate;
