"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const authentication_controller_1 = __importDefault(require("./features/auth/authentication.controller"));
const favoriteCoins_controller_1 = __importDefault(require("./features/favoriteCoins/favoriteCoins.controller"));
const app = new app_1.default([
    new authentication_controller_1.default(),
    new favoriteCoins_controller_1.default(),
]);
app.listen();
//# sourceMappingURL=server.js.map