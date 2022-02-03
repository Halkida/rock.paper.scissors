import path from 'path';
import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import router from '@/server/router/router';
import { dbConnect } from '@/server/initSequilize';

const app = express();
const jsonParser = bodyParser.json();

const csp = helmet.contentSecurityPolicy({
  directives: {
    'default-src': ['self', 'http://localhost:3000', 'ya-praktikum.tech'],
    'img-src': ['self', 'http://localhost:3000', 'ya-praktikum.tech', 'data:']
  },
});
const xssFilter = helmet.xssFilter();

app.use(compression())
  .use(csp)
  .use(xssFilter)
  .use(express.static(path.resolve(__dirname, '../dist')))
  .use(express.static(path.resolve(__dirname, '../static')))
  .use(express.static('public'))
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