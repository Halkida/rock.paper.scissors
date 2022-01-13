import path from 'path';
import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import router from '@/server/router/router';
import { dbConnect } from '@/server/initSequilize';

const app = express();
const jsonParser = bodyParser.json();


app.use(compression())
  .use(express.static(path.resolve(__dirname, '../dist')))
  .use(express.static(path.resolve(__dirname, '../static')))
  .use(jsonParser)
  .use(router);

export function startApp() {
  dbConnect()
    .then(() => {
      const port = process.env.PORT || 3000;

      app.listen(port, () => {
        console.log(`Application is started on localhost:${port}`);
      });
    });
}