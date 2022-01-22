import { Router } from 'express';
import { CommentAPI } from '@/server/controllers';

export const commentRoutes = (router: Router) => {
  const commentRouter: Router = Router();

  commentRouter
    .get('/', CommentAPI.get)
    .post('/', CommentAPI.create);

  router.use('/comment', commentRouter);
};
