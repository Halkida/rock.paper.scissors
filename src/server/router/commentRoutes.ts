import { Router } from 'express';
import { CommentAPI } from '@/server/controllers';

export const commentRoutes = (router: Router) => {
  const commentRouter: Router = Router();

  commentRouter
    .post('/', CommentAPI.create);

  router.use('/comment', commentRouter);
};
