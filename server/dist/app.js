"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const error_1 = __importDefault(require("./middleware/error"));
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
require("./utils/db");
class App {
    constructor(controllers) {
        this.app = express_1.default();
        this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }
    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`App listening on the port ${process.env.PORT}`);
        });
    }
    initializeMiddlewares() {
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(body_parser_1.default.json());
        this.app.use(cors_1.default());
    }
    initializeErrorHandling() {
        this.app.use(error_1.default);
    }
    initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use('/api/v1/', controller.router);
        });
    }
    connectToTheDatabase() {
        const { MONGODB_URI, SECRET_KEY, } = process.env;
        const store = new MongoDBStore({
            uri: MONGODB_URI,
            collection: 'devices'
        });
        this.app.use(session({
            name: 'test',
            secret: SECRET_KEY,
            store: store,
            cookie: {
                path: '/',
                maxAge: 60 * 60 * 1000,
            },
            resave: false,
            saveUninitialized: false,
        }));
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map