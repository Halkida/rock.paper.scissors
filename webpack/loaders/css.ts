import { SRC_DIR, DIST_DIR } from '../env';

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
export default {
  client: {
    scssModules: {
      test: sassModuleRegex,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: DIST_DIR,
          },
        },
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
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: DIST_DIR,
          },
        },
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
    scssModules: {
      test: sassModuleRegex,
      use: [
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            modules: {
              localIdentName: '[path][name]__[local]',
              exportOnlyLocals: true
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
  }
};