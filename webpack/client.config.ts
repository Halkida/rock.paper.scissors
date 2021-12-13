import * as path from 'path';
import { Configuration, /* Plugin, Entry  */} from 'webpack';
// import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
// import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// import CompressionPlugin from 'compression-webpack-plugin';

import { /* IS_DEV, */ DIST_DIR, SRC_DIR } from './env';
import fileLoader from './loaders/file';
import cssLoader from './loaders/css';
import jsLoader from './loaders/js';

const config: Configuration = {
  entry: path.join(SRC_DIR, 'client.tsx'),
    // entry: ([
    //     IS_DEV && 'react-hot-loader/patch',
    //     IS_DEV && 'webpack-hot-middleware/client',
    //     IS_DEV && 'css-hot-loader/hotModuleReplacement',
    //     path.join(SRC_DIR, 'client.tsx'),
    // ].filter(Boolean) as unknown) as Entry,
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
          // 'react-dom': '@hot-loader/react-dom',
          '@': path.resolve(SRC_DIR)
        },
        extensions: ['.tsx', '.ts', '.js', '.json'],
        // extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
        // plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    },
    // plugins: [
    //     new MiniCssExtractPlugin({ filename: '[name].css' }),
    //     !IS_DEV && new CompressionPlugin(),
    // ].filter(Boolean) as Plugin[],

    devtool: 'source-map',

    // performance: {
    //     hints: IS_DEV ? false : 'warning',
    // },
};

export default config;