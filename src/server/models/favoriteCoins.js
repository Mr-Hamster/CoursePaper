const mongoose = require('mongoose');

const favoriteCoinsSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  ticket: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('FavoriteCoins', favoriteCoinsSchema);