import { Request, Response } from 'express';
import { CommentService } from '@/server/services';

export class CommentAPI {
  public static create = async (req: Request, res: Response) => {
    const { body } = req;

    try {
      CommentService.create(body);
      res.json({ message: 'Comment created' });
    } catch (e) {
      res.status(400);
      res.json({ error: e.message });
    }
  }
}