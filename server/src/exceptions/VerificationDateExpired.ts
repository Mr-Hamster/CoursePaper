import HttpException from './HttpException';

class VerificationDateExpired extends HttpException {
  constructor() {
    super(401, 'Verification date has been expired!');
  }
}

export default VerificationDateExpired;