import { Request } from 'express';

interface RequestWithUserId extends Request {
  id: string;
}

export default RequestWithUserId;