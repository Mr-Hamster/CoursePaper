import HttpException from './HttpException';

class ForbiddenException extends HttpException {
  constructor() {
    super(403, 'Forbidden action!');
  }
}

export default ForbiddenException;