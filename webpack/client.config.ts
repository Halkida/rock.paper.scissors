import * as path from 'path';
import { Configuration } from 'webpack';

import {  DIST_DIR, SRC_DIR } from './env';
import fileLoader from './loaders/file';
import cssLoader from './loaders/css';
import jsLoader from './loaders/js';

const config: Configuration = {
  entry: path.join(SRC_DIR, 'client.tsx'),
    module: {
        rules: [
          fileLoader.client,
          cssLoader.client.scss,
          cssLoader.client.scssModules,
          jsLoader.client
        ],
    },
    output: {
        path: DIST_DIR,
        filename: '[name].js',
        publicPath: '/',
    },
    resolve: {
        modules: ['src', 'node_modules'],
        alias: {
          '@': path.resolve(SRC_DIR)
        },
        extensions: ['.tsx', '.ts', '.js', '.json'],
    },
    devtool: 'source-map',
};

export default config;