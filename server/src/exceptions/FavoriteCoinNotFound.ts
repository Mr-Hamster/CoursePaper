import HttpException from './HttpException';

class FavoriteCoinNotFound extends HttpException {
  constructor() {
    super(404, 'This coin not found!');
  }
}

export default FavoriteCoinNotFound;