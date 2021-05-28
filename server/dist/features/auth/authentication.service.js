"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const UserWithThatEmailAlreadyExistsException_1 = __importDefault(require("../../exceptions/UserWithThatEmailAlreadyExistsException"));
const user_model_1 = __importDefault(require("../../models/user/user.model"));
const { sendToMail } = require('../../utils/mailSender/index');
class AuthenticationService {
    constructor() {
        this.user = user_model_1.default;
    }
    register(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.user.findOne({ email: userData.email })) {
                throw new UserWithThatEmailAlreadyExistsException_1.default(userData.email);
            }
            const hashedPassword = yield bcrypt.hash(userData.password, 10);
            const code = String(Math.floor(Math.random() * 90000) + 10000); // generate 5-digit number
            const user = new this.user(Object.assign(Object.assign({}, userData), { password: hashedPassword, verification: {
                    code: yield bcrypt.hash(code, 10),
                    expirationDate: Date.now() + (3600000 * 24),
                    isVerify: false,
                } }));
            const [{ email, username, _id }] = yield Promise.all([
                user.save(),
                sendToMail(userData.email, code),
            ]);
            return {
                user: {
                    email,
                    username,
                    _id,
                },
            };
        });
    }
    createToken(user) {
        const secret = process.env.JWT_SECRET;
        const dataStoredInToken = {
            _id: user._id,
        };
        return {
            token: jwt.sign(dataStoredInToken, secret),
        };
    }
}
exports.default = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map