import path from 'path';
import express from 'express';
import compression from 'compression';
import renderApp from './serverRenderApp';

const app = express();

app.use(compression())
    .use(express.static(path.resolve(__dirname, '../dist')))
    .use(express.static(path.resolve(__dirname, '../static')));

app.get('/*', renderApp);

export { app };