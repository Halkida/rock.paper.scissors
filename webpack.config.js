const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
          test: /\.s[ac]ss$/i,
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: {
                modules: true,
              }
            },
          { loader: 'sass-loader' }
          ]
        }
      ]
    },
    plugins: [new HtmlWebpackPlugin({
      template: 'index.html'
    })],
    devServer: {
      static: {
          directory: path.join(__dirname, 'public'),
      },
      watchFiles: ['src/**/*.tsx', 'src/**/*.scss'],
      compress: true,
      hot: true,
      port: 3000,
      historyApiFallback: true,
    }
  };