import { Request, Response } from 'express';
import { UserService } from '@/server/services';

export class UserAPI {
  public static get = async (req: Request, res: Response) => {
    const { query } = req;

    try {
      const { id } = query;
      const user = await UserService.request(Number(id));

      if(user === null) {
        res.json(null);
        return;
      }

      console.log(user.toJSON());
      res.json(user.toJSON());

    } catch(e) {
      res.status(404);
      res.json({ error: e.message });
    }
  }

  public static create = async (req: Request, res: Response) => {
    const { body } = req;

    try {
      UserService.create((body));
      res.json({ message: 'User created' });
    } catch (e) {
      res.status(400);
      res.json({ error: e.message });
    }
  }

  public static update = async (req: Request, res: Response) => {
    const { body } = req;

    try {
      await UserService.update(body);
      res.json({ message: 'User updated' });
    } catch (e) {
      res.status(400);
      res.json({ error: e.message });
    }
  }
}