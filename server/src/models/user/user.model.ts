import mongoose from 'mongoose';
import User from './user.interface';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      get: (): undefined => undefined,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    verification: {
      code: String,
      expirationDate: Date,
      isVerify: {
        type: Boolean,
        default: false,
      }
    },
    favoriteCoins: [{
      type: String,
      ref: 'FavoriteCoins',
    }]
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  },
);

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);
export default userModel;