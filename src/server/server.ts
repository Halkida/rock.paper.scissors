import path, { join } from 'path';
import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import https from 'https';
import { readFileSync } from 'fs';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import router from '@/server/router/router';
import { dbConnect } from '@/server/initSequilize';
import { requestUserMiddleware, storeUserMiddleware } from '@/server/middlewares';

const app = express();
const jsonParser = bodyParser.json();


const csp = helmet.contentSecurityPolicy({
  directives: {
    'default-src': ['self', 'ya-praktikum.tech'],
    'img-src': ['self', 'ya-praktikum.tech', 'data:']
  },
});
const xssFilter = helmet.xssFilter();
const hidePoweredBy = helmet.hidePoweredBy();

app.use(compression())
  .use(requestUserMiddleware)
  .use(storeUserMiddleware)
  .use(csp)
  .use(xssFilter)
  .use(hidePoweredBy)
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