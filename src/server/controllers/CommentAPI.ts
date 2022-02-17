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

      const response = results.map((comment: Record<string, unknown>) => {
        const { reply_author_id, reply_content, reply_avatar, reply_id, reply_login } = comment;
        const replyTo = {
          author_id: reply_author_id,
          content: reply_content,
          avatar: reply_avatar,
          id: reply_id,
          login: reply_login,
        };

        return  {
          id: comment.id,
          author_id: comment.author_id,
          content: comment.content,
          reply_to: replyTo,
          avatar: comment.avatar,
          login: comment.login
        };
      });

      res.json({ comments: response });
    } catch(e) {
      res.status(404);
      res.json({ error: e.message });
    }
  }
}