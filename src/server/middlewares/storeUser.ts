import {Request, NextFunction} from 'express';
import { ExpressResponse } from '@/types';
import { UserService } from '@/server/services';

export const storeUserMiddleware = async (_req: Request, res: ExpressResponse, next: NextFunction) => {
  try {
    if (res.user) {
      const { id, login } = res.user;
      const avatar = res.user.avatar ? res.user.avatar : '';
      const user = await UserService.request(Number(id));

      if (user === null) {
        await UserService.create({ id, login, avatar });
      } else {
        await UserService.update({ id: user.id, login, avatar });
      }
    }
  } catch (e: unknown) {
    console.log(e);
  } finally {
    next();
  }
};
