import path from 'path';
import express from 'express';
import compression from 'compression';
import dotenv from 'dotenv';
import renderApp from './serverRenderApp';
import { dbConnect } from "@/initSequilize";

dotenv.config();
const app = express();

app.use(compression())
    .use(express.static(path.resolve(__dirname, '../dist')))
    .use(express.static(path.resolve(__dirname, '../static')));

app.get('/*', renderApp);

export function startApp() {
  dbConnect()
    .then(() => {
      const port = process.env.PORT || 3000;

      app.listen(port, () => {
        console.log(`Application is started on localhost:${port}`);
      });
    })
}