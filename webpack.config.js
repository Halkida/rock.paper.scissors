const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    devtool: 'inline-source-map',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.json'],
      modules: [
        path.join(__dirname, 'node_modules')
      ]
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                configFile: path.resolve(__dirname, 'tsconfig.json')
              },
            },
          ],
          exclude: /(node_modules)/
        },
        {
          test: sassRegex,
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
          include: sassModuleRegex
        },
        {
          test: sassRegex,
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
          exclude: sassModuleRegex
        }
      ]
    },
    plugins: [new HtmlWebpackPlugin({
      template: 'index.html'
    })],
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
    devServer: {
      static: {
          directory: path.join(__dirname, 'public'),
      },
      watchFiles: ['src/**/*.tsx', 'src/**/*.scss'],
      compress: true,
      hot: true,
      open: true,
      port: 3000,
      historyApiFallback: true,
    }
  };