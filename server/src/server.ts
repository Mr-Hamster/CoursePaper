import dotenv from 'dotenv';
dotenv.config();
import express, { Router, Application, } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const { PORT, MONGODB_URI, SECRET_KEY } = process.env;

const app: Application = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(
  MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

client.connect((err: Error) => {
  if (err) {
    console.log('err', err);
  }
  console.log('DB connected')
  client.close();
});

app.listen(PORT, () => console.log(`Started on port ${PORT}!`));

const apiRouter = Router();
app.use('/api/v1', apiRouter);
apiRouter.use('/sign-up', require('./features/signUp/router'));
// apiRouter.use('/sign-in');
