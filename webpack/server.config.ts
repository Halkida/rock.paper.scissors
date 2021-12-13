
import * as path from 'path';
import { Configuration } from 'webpack';
import * as nodeExternals from 'webpack-node-externals';
// import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';

import { /* IS_DEV, */ DIST_DIR, SRC_DIR } from './env';
import fileLoader from './loaders/file';
import cssLoader from './loaders/css';
import jsLoader from './loaders/js';

const config: Configuration = {
    name: 'server',
    target: 'node',
    node: { __dirname: false },
    entry: path.join(SRC_DIR, 'server'),
    module: {
        rules: [fileLoader.server, cssLoader.server, jsLoader.server],
    },
    output: {
        filename: 'server.js',
        libraryTarget: 'commonjs2',
        path: DIST_DIR,
        publicPath: '/static/',
    },
    resolve: {
        modules: ['src', 'node_modules'],
        alias: {
          // 'react-dom': '@hot-loader/react-dom',
          '@': path.resolve(SRC_DIR)
        },
        extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
        // plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    },

    devtool: 'source-map',
    externals: [nodeExternals({ allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i] })],
    optimization: { nodeEnv: false },
};

export default config;