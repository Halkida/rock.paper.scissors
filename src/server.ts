import path from 'path';
import express from 'express';
import compression from 'compression';
import router from './server/router/router';
import { dbConnect } from "@/server/initSequilize";

const app = express();

app.use(compression())
  .use(express.static(path.resolve(__dirname, '../dist')))
  .use(express.static(path.resolve(__dirname, '../static')))
  .use(router);

export function startApp() {
  dbConnect()
    .then(() => {
      const port = process.env.PORT || 3000;

      app.listen(port, () => {
        console.log(`Application is started on localhost:${port}`);
      });
    })
}