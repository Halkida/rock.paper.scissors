import express from 'express';
import serverApp from '@/server/serverRenderApp';
import { themesRoutes } from './themesRoutes';

const router = express.Router();

themesRoutes(router);
router.get('/*', serverApp);

export default router;