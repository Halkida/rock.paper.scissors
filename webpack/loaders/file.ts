const fileRegex = /\.(jpg|png|gif|woff|eot|ttf|svg|mp3)/;

export default {
  client: {
    test: fileRegex,
    loader: 'url-loader',
    options: {
      limit: 50000,
    }
  },
  server: {
    test: fileRegex,
    loader: 'null-loader',
  },
};