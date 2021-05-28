"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        get: () => undefined,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    verification: {
        code: String,
        expirationDate: Date,
        isVerify: {
            type: Boolean,
            default: false,
        }
    },
    favoriteCoins: [{
            type: String,
            ref: 'FavoriteCoins',
        }]
}, {
    toJSON: {
        getters: true,
    },
    id: false,
});
const userModel = mongoose_1.default.model('User', userSchema);
exports.default = userModel;
//# sourceMappingURL=user.model.js.map