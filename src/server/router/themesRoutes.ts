import { Router } from 'express';
import { ThemeAPI } from "@/server/controllers";

export const themesRoutes = (router: Router) => {
  const themesRouter: Router = Router();

  themesRouter
    .post('/', ThemeAPI.update)
    .get('/', ThemeAPI.get);

  router.use('/theme', themesRouter);
};