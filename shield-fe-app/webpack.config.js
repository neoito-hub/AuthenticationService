const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { DefinePlugin } = require('webpack')
// let envPath = `./environments/environment`;
// if (process.env.NODE_ENV) {
//   envPath += `.${process.env.NODE_ENV}`;
// }
// const env = require(envPath);
const env = process.env.NODE_ENV || 'dev'
const Dotenv = require('dotenv').config({
  path: `./.env.${env}`,
})

const config = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    hot: true,
    static: path.join(__dirname, 'dist', 'bootstrap.js'),
    port: 3000,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
  },
  target: 'web',
  output: {
    publicPath: '/',
    crossOriginLoading: 'anonymous',
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],
        },
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        use: {
          loader: 'url-loader',
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              // Prefer `dart-sass`
              implementation: require('sass'),
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      process: { env: JSON.stringify(Dotenv.parsed) },
    }),

    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
    }),
  ],
}

module.exports = config
