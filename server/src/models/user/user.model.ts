import mongoose from 'mongoose';
import User from './user.interface';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      maxlength: [16, 'The maximum length for "username" is 16 characters'],
      minlength: [3, 'The minimum length for "username" is 3 characters'],
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
      match: [
        '^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$',
        "This email is not correct, try again!"
      ]
    },
    verification: {
      code: String,
      expirationDate: Date,
      isVerify: {
        type: Boolean,
        default: false,
      }
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  },
);

userSchema.virtual('favoriteCoins', {
  ref: 'FavoriteCoins',
  localField: '_id',
  foreignField: 'favoriteCoins',
});

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);
export default userModel;