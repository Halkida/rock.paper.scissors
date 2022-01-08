import express from 'express';
import serverRenderMiddleware from "@/server/server-render-middleware";

const router = express.Router();

router.get('/*', serverRenderMiddleware);

export default router;