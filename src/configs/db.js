const mongoose = require('mongoose');
require('dotenv').config();

module.exports = () => {
  return mongoose.connect(
    'mongodb+srv://adnan:adnan@cluster0.rlrcf.mongodb.net/nykaaBackendTest?retryWrites=true&w=majority'
  );
};
