import dotenv from 'dotenv';
dotenv.config();
import App from './app';
import AuthenticationController from './features/auth/authentication.controller';
import FavoriteCoinsController from './features/favoriteCoins/favoriteCoins.controller';

const app = new App(
  [
    new AuthenticationController(),
    new FavoriteCoinsController(),
  ],
);

app.listen();
