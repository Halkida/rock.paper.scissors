import { Request, Response } from 'express';
import { CommentService } from '@/server/services';

export class CommentAPI {
  public static create = async (req: Request, res: Response) => {
    const { body } = req;

    try {
      await CommentService.create(body);
      res.json({ message: 'Comment created' });
    } catch (e) {
      res.status(400);
      res.json({ error: e.message });
    }
  }

  public static get = async (req: Request, res: Response) => {
    const { query } = req;

    try {
      const { topicId } = query;

      const [results] = await CommentService.request(Number(topicId));
      const response = results;

      res.json({ comments: response });
    } catch(e) {
      res.status(404);
      res.json({ error: e.message });
    }
  }
}