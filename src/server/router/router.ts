import express from 'express';
import serverApp from '@/server/serverRenderApp';
import { themesRoutes } from './themesRoutes';
import { userRoutes } from './userRoutes';

const router = express.Router();

themesRoutes(router);
userRoutes(router);
router.get('/*', serverApp);

export default router;