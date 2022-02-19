import { Response } from 'express';
import { IUser } from './User';

export interface ExpressResponse extends Response {
  user: IUser
}