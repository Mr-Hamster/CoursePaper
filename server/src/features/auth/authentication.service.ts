import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import UserWithThatEmailAlreadyExistsException from '../../exceptions/UserWithThatEmailAlreadyExistsException';
import DataStoredInToken from '../../interfaces/dataStoredInToken';
import TokenData from '../../interfaces/tokenData.interface';
import CreateUserDto from '../../models/user/user.dto';
import User from '../../models/user/user.interface';
import userModel from '../../models/user/user.model';
const { sendToMail } = require('../../utils/mailSender/index'); 

class AuthenticationService {
  public user = userModel;

  public async register(userData: CreateUserDto) {
    if (await this.user.findOne({ email: userData.email })) {
      throw new UserWithThatEmailAlreadyExistsException(userData.email);
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const code: string = String(Math.floor(Math.random()*90000) + 10000); // generate 5-digit number
    const user = new this.user({
      ...userData,
      password: hashedPassword,
      verification: {
        code: await bcrypt.hash(code, 10),
        expirationDate: Date.now() + (3600000 * 24), // 3 600 000 = 1 hour
        isVerify: false,
      },
    });
    const [{ email, username, _id }] = await Promise.all([
      user.save(),
      sendToMail(userData.email, code),
    ]);
    return {
      user: {
        email,
        username,
        _id,
      },
    };
  }
  public createToken(user: User): TokenData {
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id,
    };
    return {
      token: jwt.sign(dataStoredInToken, secret),
    };
  }
}

export default AuthenticationService;