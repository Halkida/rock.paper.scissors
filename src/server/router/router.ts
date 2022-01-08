import express from 'express';
import serverRenderMiddleware from "@/server/server-render-middleware";
import { themesRoutes } from "./themesRoutes";

const router = express.Router();

themesRoutes(router);
router.get('/*', serverRenderMiddleware);

export default router;