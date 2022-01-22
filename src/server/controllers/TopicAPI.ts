import { Request, Response } from 'express';
import { topicService } from '@/server/services';

export class TopicAPI {
  public static get = async (req: Request, res: Response) => {
    const { params } = req;

    try {
      const { id } = params;
      const topic = await topicService.request(Number(id));

      if(!topic) {
        throw new Error('Topic not found');
      }

      res.json(topic.toJSON());
    } catch(e) {
      res.status(404);
      res.json({ error: e.message });
    }
  };

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

  public static getAll = async (_: Request, res: Response) => {
    try {
      const [results] = await topicService.findAll();

      res.json(results);
    } catch(e) {
      res.status(404);
      res.json({ error: e.message });
    }
  };
}