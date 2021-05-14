import dotenv from 'dotenv';
dotenv.config();
import * from './utils/db';
import express, { Router, Application, } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import MongoDBSession from 'connect-mongodb-session';
const MongoDBStore = MongoDBSession(session);
const { PORT, MONGODB_URI, SECRET_KEY } = process.env;

const app: Application = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'devices'
  });
  
  app.use(
    session({
      name: 'test',
      secret: SECRET_KEY,
      store: store,
      cookie: {
        path: '/',
        maxAge: 60 * 60 * 1000,
      },
      resave: false,
      saveUninitialized: false,
    })
  );
  

const apiRouter = Router();
app.use('/api/v1', apiRouter);

app.listen(PORT, () => console.log(`Started on port ${PORT}!`));

apiRouter.use('/sign-up', require('./features/signUp/router'));
// apiRouter.use('/sign-in');
