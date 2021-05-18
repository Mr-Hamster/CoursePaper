import mongoose from 'mongoose';
import FavoriteCoins from './favoriteCoins.interface';

const favoriteCoinsSchema = new mongoose.Schema(
  {
    _id: String,
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
  },
  {
    id: false,
  }
);

const favoriteCoinsModel = mongoose.model<FavoriteCoins & mongoose.Document>('FavoriteCoins', favoriteCoinsSchema);
export default favoriteCoinsModel;