"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const favoriteCoinsSchema = new mongoose_1.default.Schema({
    _id: String,
    title: {
        type: String,
        required: true,
    },
    ticket: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
}, {
    id: false,
});
const favoriteCoinsModel = mongoose_1.default.model('FavoriteCoins', favoriteCoinsSchema);
exports.default = favoriteCoinsModel;
//# sourceMappingURL=favoriteCoins.model.js.map