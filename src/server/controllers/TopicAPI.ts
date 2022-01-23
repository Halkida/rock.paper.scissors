import { Request, Response } from 'express';
import { topicService } from '@/server/services';

export class TopicAPI {
  public static create = async (req: Request, res: Response) => {
    const { body } = req;

    try {
      const topic = await topicService.create((body));
      res.json({ message: 'Topic created', topic });
    } catch (e) {
      res.status(400);
      res.json({ error: e.message });
    }
  };

  public static update = async (req: Request, res: Response) => {
    const { body } = req;

    try {
      await topicService.update(body);
      res.json({ message: 'Topic updated' });
    } catch (e) {
      res.status(400);
      res.json({ error: e.message });
    }
  };

  public static get = async (req: Request, res: Response) => {
    const { query } = req;
    const { id } = query;
    let response;
    try {
      if (id) {
        const [results] = await topicService.request(Number(id));
        response = results[0];
      } else {
        const [results] = await topicService.findAll();
        response = results;
      }

      res.json(response);
    } catch(e) {
      res.status(404);
      res.json({ error: e.message });
    }
  };
}