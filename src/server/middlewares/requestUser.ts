import {Request, NextFunction} from 'express';
import authApi from '@/services/auth';
import { ExpressResponse } from '@/types';

export const requestUserMiddleware = async (req: Request, res: ExpressResponse, next: NextFunction) => {
  try {
    res.user = await authApi.getUser({
      headers: { cookie: req.headers.cookie },
    });
  } catch (e: unknown) {
    console.log(e);
  } finally {
    next();
  }
};
