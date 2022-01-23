import express from 'express';
import serverApp from '@/server/serverRenderApp';
import { themesRoutes } from './themesRoutes';
import { userRoutes } from './userRoutes';
import { commentRoutes } from './commentRoutes';
import { topicRoutes } from './topicRoutes';

const router = express.Router();

themesRoutes(router);
userRoutes(router);
commentRoutes(router);
topicRoutes(router);

router.get('/*', serverApp);

export default router;