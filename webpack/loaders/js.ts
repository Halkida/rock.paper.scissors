import { ROOT_DIR } from '../env';

const path = require('path');

export default {
  client: {
      test: /\.ts(x?)$/,
      exclude: /node_modules/,
      use: {
        loader: 'ts-loader',
        options: {
          configFile: path.resolve(ROOT_DIR, 'tsconfig.json')
        }
      }
  },
  server: {
      test: /\.ts(x?)$/,
      exclude: /node_modules/,
      use: {
        loader: 'ts-loader',
        options: {
          configFile: path.resolve(ROOT_DIR, '../tsconfig.json')
        }
      }
  },
};