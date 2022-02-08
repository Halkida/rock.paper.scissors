import { Router } from 'express';
import { TopicAPI } from '@/server/controllers';

export const topicRoutes = (router: Router) => {
  const topicRouter: Router = Router();

  topicRouter
    .get('/', TopicAPI.get)
    .post('/create', TopicAPI.create)
    .post('/update', TopicAPI.update);

  router.use('/topics', topicRouter);
};