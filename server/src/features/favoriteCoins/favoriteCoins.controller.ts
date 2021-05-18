import { NextFunction, Response, Router, Request } from "express";
import Controller from "../../interfaces/controller.interface";
import validationMiddleware from "../../middleware/validation.middleware";
import FavoriteCoinsDto from "../..//models/favoriteCoins/favoriteCoin.dto";
import favoriteCoinModel from '../../models/favoriteCoins/favoriteCoins.model';
import userModel from "../../models/user/user.model";
import authMiddleware from "../../middleware/auth.middleware";
import RequestWithUserId from "../../interfaces/requestWithUserId.interface";
import FavoriteCoinNotFound from "../../exceptions/FavoriteCoinNotFound";
import ForbiddenException from "../../exceptions/ForbiddenException";

class FavoriteCoinsController implements Controller {
  public path = '/favorites';
  public router = Router();

  private favoriteCoin = favoriteCoinModel;
  private user = userModel;

  constructor () {
    this.initializeRoutes();
  }

  private initializeRoutes () {
    this.router.all(`${this.path}/*`, authMiddleware);
    this.router.get(`${this.path}/`, this.getFavorites);
    this.router.post(`${this.path}/`, validationMiddleware(FavoriteCoinsDto), this.saveToFavorites);
    this.router.delete(`${this.path}/:id`, this.deleteCoin)
  }

  private getFavorites = async (req: RequestWithUserId, res: Response, next: NextFunction) => {
    try {
      const userId = req.id;

      const { favoriteCoins } = await this.user
        .findById(userId)
        .select('favoriteCoins')
        .populate('favoriteCoins', '-__v')
        .lean();

      res.status(200).json(favoriteCoins);
    } catch (err) {
      next(err);
    }
  }

  private saveToFavorites = async (req: RequestWithUserId, res: Response, next: NextFunction) => {
    try {
      const coinData: FavoriteCoinsDto = req.body;
      const userId = req.id;

      const newFavoriteCoin = new this.favoriteCoin(coinData);

      await Promise.all([
        newFavoriteCoin.save(),
        this.user.findByIdAndUpdate(userId, {
          $push: { favoriteCoins: newFavoriteCoin._id },
        }),
      ]);

      res.status(200).json(newFavoriteCoin);
    } catch (err) {
      next(err);
    }
  }

  private deleteCoin = async (req: RequestWithUserId, res: Response, next: NextFunction) => {
    const coinId = req.params.id;
    const userId = req.id;

    const userData = await this.user
      .findById(userId)
      .select('favoriteCoins');

    if (userData.favoriteCoins.includes(coinId)) {
      const successResponse = await Promise.all([
        this.favoriteCoin.findByIdAndDelete(coinId),
        
      ])
      if (successResponse) {
        res.sendStatus(200);
      } else {
        next(new FavoriteCoinNotFound());
      }
    } else {
      next(new ForbiddenException())
    }
  }
}

export default FavoriteCoinsController;
