import { Router } from 'express';
import { ThemeAPI } from "@/server/controllers";

export const themesRoutes = (router: Router) => {
  const themesRouter: Router = Router();

  themesRouter
    .post('/', ThemeAPI.addUserTheme)
    .post('/update', ThemeAPI.update)
    .get('/', ThemeAPI.get)
    .get('/all', ThemeAPI.getAll);

  router.use('/theme', themesRouter);
};