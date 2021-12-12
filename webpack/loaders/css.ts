
import { SRC_DIR } from '../env';

const path = require('path');

const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

export default {
  client: {
    scssModules: {
      test: sassModuleRegex,
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            modules: {
              localIdentName: '[path][name]__[local]'
            }
          }
        },
        { loader: 'sass-loader' }
      ],
      exclude: path.resolve(SRC_DIR, './styles')
    },
    scss: {
      test: sassRegex,
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          }
        },
        { loader: 'sass-loader' }
      ],
      include: path.resolve(SRC_DIR, './styles')
    }
  },
  server: {
      test: /\.css$/,
      loader: 'null-loader',
  },
};