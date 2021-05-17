import * as bcrypt from 'bcrypt';
import { Request, Response, NextFunction, Router } from 'express';
import UserNotVerifiedException from '../../exceptions/UserNotVerifiedException';
import VerificationDateExpired from '../../exceptions/VerificationDateExpired';
import WrongCredentialsException from '../../exceptions/WrongCredentialsException';
import Controller from '../../interfaces/controller.interface';
import validationMiddleware from '../../middleware/validation.middleware';
import CreateUserDto from '../../models/user/user.dto';
import userModel from '../../models/user/user.model';
import AuthenticationService from './authentication.service';
import LogInDto from './logIn.dto';
import VerificationDataDto from './verification.dto';

class AuthenticationController implements Controller {
  public path = '/auth';
  public router = Router();
  public authenticationService = new AuthenticationService();
  private user = userModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/sign-up`, validationMiddleware(CreateUserDto), this.registration);
    this.router.post(`${this.path}/verification/:id`, validationMiddleware(VerificationDataDto), this.verification);
    this.router.post(`${this.path}/sign-in`, validationMiddleware(LogInDto), this.loggingIn);
    this.router.post(`${this.path}/sign-out`, this.loggingOut);
  }

  private registration = async (request: Request, response: Response, next: NextFunction) => {
    const userData: CreateUserDto = request.body;
    try {
      const {
        user,
      } = await this.authenticationService.register(userData);
      response.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  private loggingIn = async (request: Request, response: Response, next: NextFunction) => {
    const logInData: LogInDto = request.body;
    const user = await this.user.findOne({ email: logInData.email });
    if (user) {
      const isPasswordMatching = await bcrypt.compare(
        logInData.password,
        user.get('password', null, { getters: false }),
      );
      if (isPasswordMatching) {
        const tokenData = this.authenticationService.createToken(user);
        if (!user.verification.isVerify) {
          next(new UserNotVerifiedException());
        }
        response.setHeader('Set-Cookie', [this.authenticationService.createCookie(tokenData)]);
        response.status(200).json({
          _id: user._id,
          username: user.username,
          email: user.email,
        });
      } else {
        next(new WrongCredentialsException());
      }
    } else {
      next(new WrongCredentialsException());
    }
  }

  private verification = async (request: Request, response: Response, next: NextFunction) => {
    const verificationData: VerificationDataDto = request.body;
    const userId: string = request.params.id;
    const user = await this.user
      .findOne({ _id: userId })
      .select('verification email username');
    if (user) {
      const isCodeMatching = await bcrypt.compare(
        verificationData.code,
        user.verification.code,
      );
      if (isCodeMatching) {
        user.verification = {
          expirationDate: user.verification.expirationDate,
          code: "",
          isVerify: true,
        };
        const isDateValid: boolean = Date.now() < Date.parse(String(user.verification.expirationDate));
        if (!isDateValid) {
          next(new VerificationDateExpired());
        } 
        await user.save();
        const tokenData = this.authenticationService.createToken(user);
        const cookie = this.authenticationService.createCookie(tokenData)
        
        response.setHeader('Set-Cookie', [cookie]);
        const { _id, email, username } = user;
        response.status(200).json({
          _id, email, username
        });
      } else {
        next(new WrongCredentialsException());
      }
    } else {
      next(new WrongCredentialsException());
    }
  }

  private loggingOut = (request: Request, response: Response) => {
    response.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
    response.sendStatus(200);
  }
}

export default AuthenticationController;