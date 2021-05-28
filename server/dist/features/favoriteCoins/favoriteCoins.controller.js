"use strict";
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
const express_1 = require("express");
const validation_middleware_1 = __importDefault(require("../../middleware/validation.middleware"));
const favoriteCoin_dto_1 = __importDefault(require("../..//models/favoriteCoins/favoriteCoin.dto"));
const favoriteCoins_model_1 = __importDefault(require("../../models/favoriteCoins/favoriteCoins.model"));
const user_model_1 = __importDefault(require("../../models/user/user.model"));
const auth_middleware_1 = __importDefault(require("../../middleware/auth.middleware"));
const FavoriteCoinNotFound_1 = __importDefault(require("../../exceptions/FavoriteCoinNotFound"));
const ForbiddenException_1 = __importDefault(require("../../exceptions/ForbiddenException"));
class FavoriteCoinsController {
    constructor() {
        this.path = '/favorites';
        this.router = express_1.Router();
        this.favoriteCoin = favoriteCoins_model_1.default;
        this.user = user_model_1.default;
        this.getFavorites = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.id;
                const { favoriteCoins } = yield this.user
                    .findById(userId)
                    .select('favoriteCoins')
                    .populate('favoriteCoins', '-__v')
                    .lean();
                res.status(200).json(favoriteCoins);
            }
            catch (err) {
                next(err);
            }
        });
        this.saveToFavorites = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const coinData = req.body;
                const userId = req.id;
                const newFavoriteCoin = new this.favoriteCoin(coinData);
                yield Promise.all([
                    newFavoriteCoin.save(),
                    this.user.findByIdAndUpdate(userId, {
                        $addToSet: { favoriteCoins: newFavoriteCoin._id },
                    }),
                ]);
                res.status(200).json(newFavoriteCoin);
            }
            catch (err) {
                next(err);
            }
        });
        this.deleteCoin = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const coinId = req.params.id;
            const userId = req.id;
            const userData = yield this.user
                .findById(userId)
                .select('favoriteCoins');
            if (userData.favoriteCoins.includes(coinId)) {
                const indexToDelete = userData.favoriteCoins.findIndex(item => item === coinId);
                const newFavoriteCoins = [
                    ...userData.favoriteCoins.slice(0, indexToDelete),
                    ...userData.favoriteCoins.slice(indexToDelete + 1),
                ];
                userData.favoriteCoins = newFavoriteCoins;
                const [successResponse] = yield Promise.all([
                    this.favoriteCoin.findByIdAndDelete(coinId),
                    userData.save(),
                ]);
                if (successResponse) {
                    res.sendStatus(200);
                }
                else {
                    next(new FavoriteCoinNotFound_1.default());
                }
            }
            else {
                next(new ForbiddenException_1.default());
            }
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.all(`${this.path}/*`, auth_middleware_1.default);
        this.router.get(`${this.path}/`, this.getFavorites);
        this.router.post(`${this.path}/`, validation_middleware_1.default(favoriteCoin_dto_1.default), this.saveToFavorites);
        this.router.delete(`${this.path}/:id`, this.deleteCoin);
    }
}
exports.default = FavoriteCoinsController;
//# sourceMappingURL=favoriteCoins.controller.js.map