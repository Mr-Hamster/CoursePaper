import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import RequestWithUserId from '../interfaces/requestWithUserId.interface';
import DataStoredInToken from '../interfaces/dataStoredInToken';
import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';
import AuthenticationTokenMissingException from '../exceptions/AuthenticationTokenMissingException';

async function authMiddleware(request: RequestWithUserId, response: Response, next: NextFunction) {
  // const cookies = request.cookies;
  const token = request.headers.authorization;

  if (token) {
    const secret = process.env.JWT_SECRET;
    try {
      const verificationResponse = jwt.verify(token, secret) as DataStoredInToken;
      const id = verificationResponse._id;
      if (id) {
        request.id = id;
        next();
      } else {
        next(new WrongAuthenticationTokenException());
      }
    } catch (error) {
      next(new WrongAuthenticationTokenException());
    }
  } else {
    next(new AuthenticationTokenMissingException());
  }
}

export default authMiddleware;