import HttpException from './HttpException';

class UserNotVerifiedException extends HttpException {
  constructor() {
    super(302, 'User is not verify!');
  }
}

export default UserNotVerifiedException;