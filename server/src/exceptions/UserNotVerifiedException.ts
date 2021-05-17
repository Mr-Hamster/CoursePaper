import HttpException from './HttpException';

class UserNotVerifiedException extends HttpException {
  constructor() {
    super(401, 'User is not verify!');
  }
}

export default UserNotVerifiedException;