const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/',
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.json'],
      modules: [
        path.join(__dirname, 'node_modules')
      ],
      alias: {
        '@': path.resolve(__dirname, 'src/'),
      }
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
          exclude: path.resolve(__dirname, './src/styles')
        },
        {
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
          include: path.resolve(__dirname, './src/styles')
        },
        {
          test: /\.(png|jpg|gif)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
              },
            },
          ],
        },
      ]
    },
    plugins: [new HtmlWebpackPlugin({
      template: 'index.html'
    })]
  };