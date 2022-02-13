import path, { join } from 'path';
import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import https from 'https';
import { readFileSync } from 'fs';
import cookieParser from 'cookie-parser';
import router from '@/server/router/router';
import { dbConnect } from '@/server/initSequilize';
import { requestUserMiddleware } from './middlewares/requestUser';

const app = express();
const jsonParser = bodyParser.json();

app.use(compression())
  .use(cookieParser())
  .use(requestUserMiddleware)
  .use(express.static(path.resolve(__dirname, '../dist')))
  .use(express.static(path.resolve(__dirname, '../static')))
  .use(express.static('public'))
  .use(jsonParser)
  .use(router);

export function startApp() {
  dbConnect()
    .then(() => {
      const port = 443;

      if (process.env.NODE_ENV !== 'production') {
        const options = {
          cert: readFileSync(join(__dirname, 'certs', 'local.ya-praktikum.tech.pem'), 'utf-8'),
          key: readFileSync(join(__dirname, 'certs', 'local.ya-praktikum.tech-key.pem'), 'utf-8'),
        };
        https.createServer(options, app).listen(port, () => {
          console.log(`Application is started with https on port:${port}`);
        });
      } else {
        app.listen(port, () => {
          console.log(`Application is started on localhost:${port}`);
        });
      }
    });
}