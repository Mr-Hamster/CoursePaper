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
const express_1 = require("express");
const UserNotVerifiedException_1 = __importDefault(require("../../exceptions/UserNotVerifiedException"));
const VerificationDateExpired_1 = __importDefault(require("../../exceptions/VerificationDateExpired"));
const WrongCredentialsException_1 = __importDefault(require("../../exceptions/WrongCredentialsException"));
const validation_middleware_1 = __importDefault(require("../../middleware/validation.middleware"));
const user_dto_1 = __importDefault(require("../../models/user/user.dto"));
const user_model_1 = __importDefault(require("../../models/user/user.model"));
const authentication_service_1 = __importDefault(require("./authentication.service"));
const logIn_dto_1 = __importDefault(require("./logIn.dto"));
const verification_dto_1 = __importDefault(require("./verification.dto"));
class AuthenticationController {
    constructor() {
        this.path = '/auth';
        this.router = express_1.Router();
        this.authenticationService = new authentication_service_1.default();
        this.user = user_model_1.default;
        this.registration = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const userData = request.body;
            try {
                const { user, } = yield this.authenticationService.register(userData);
                response.status(200).json(user);
            }
            catch (error) {
                next(error);
            }
        });
        this.loggingIn = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const logInData = request.body;
            const user = yield this.user.findOne({ email: logInData.email });
            if (user) {
                const isPasswordMatching = yield bcrypt.compare(logInData.password, user.get('password', null, { getters: false }));
                if (isPasswordMatching) {
                    const { token } = this.authenticationService.createToken(user);
                    if (!user.verification.isVerify) {
                        next(new UserNotVerifiedException_1.default());
                    }
                    response.status(200).json({
                        user: {
                            _id: user._id,
                            username: user.username,
                            email: user.email,
                        },
                        token,
                    });
                }
                else {
                    next(new WrongCredentialsException_1.default());
                }
            }
            else {
                next(new WrongCredentialsException_1.default());
            }
        });
        this.verification = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const verificationData = request.body;
            const userId = request.params.id;
            const user = yield this.user
                .findOne({ _id: userId })
                .select('verification email username');
            if (user) {
                const isCodeMatching = yield bcrypt.compare(verificationData.code, user.verification.code);
                if (isCodeMatching) {
                    user.verification = {
                        expirationDate: user.verification.expirationDate,
                        code: "",
                        isVerify: true,
                    };
                    const isDateValid = Date.now() < Date.parse(String(user.verification.expirationDate));
                    if (!isDateValid) {
                        next(new VerificationDateExpired_1.default());
                    }
                    yield user.save();
                    const { token } = this.authenticationService.createToken(user);
                    const { _id, email, username } = user;
                    response.status(200).json({
                        user: {
                            _id,
                            email,
                            username,
                        },
                        token,
                    });
                }
                else {
                    next(new WrongCredentialsException_1.default());
                }
            }
            else {
                next(new WrongCredentialsException_1.default());
            }
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/sign-up`, validation_middleware_1.default(user_dto_1.default), this.registration);
        this.router.post(`${this.path}/verification/:id`, validation_middleware_1.default(verification_dto_1.default), this.verification);
        this.router.post(`${this.path}/sign-in`, validation_middleware_1.default(logIn_dto_1.default), this.loggingIn);
    }
}
exports.default = AuthenticationController;
//# sourceMappingURL=authentication.controller.js.map