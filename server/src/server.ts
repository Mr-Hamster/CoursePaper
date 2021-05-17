import dotenv from 'dotenv';
dotenv.config();
import App from './app';
import AuthenticationController from './features/auth/authentication.controller';

const app = new App(
  [
    new AuthenticationController(),
  ],
);

app.listen();