import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { Request, Response } from 'express';
import { App } from '@/components/App/App';
import { configureStore, getInitialState } from '@/store';

export default (req: Request, res: Response) => {
  const store = configureStore(getInitialState());

  const jsx = (
    <StaticRouter location={req.url}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>
  );
  const reactHtml = renderToString(jsx);

  res.send(getHtml(reactHtml));
};

function getHtml(reactHtml: string) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>RPS</title>
      <link href="/main.css" rel="stylesheet">
  </head>
  <body>
      <div id="root">${reactHtml}</div>
      <script src="/main.js"></script>
  </body>
  </html>
  `;
}