import {Request, Response, NextFunction} from 'express';
import authApi from '@/services/auth.ts';

export const requestUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const cookies = req.cookies;
  try {
    const user = await authApi.getUser({
      headers: { cookie: cookies },
    });
    res.user = user;
    console.log(user);
    next();
  } catch (e: unknown) {
    console.log('|||||||||||||||||||||||||||||||||||||||');
    console.log(e.config);
    next();
  }
};
