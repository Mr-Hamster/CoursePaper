import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import Controller from './interfaces/controller.interface';
import errorMiddleware from './middleware/error';
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
import './utils/db';

class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cors());
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/api/v1/', controller.router);
    });
  }

  private connectToTheDatabase() {
    const { MONGODB_URI, SECRET_KEY, } = process.env;
    const store = new MongoDBStore({
      uri: MONGODB_URI,
      collection: 'devices'
    });
    
    this.app.use(
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
  }
}

export default App;