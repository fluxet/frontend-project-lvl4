// @ts-check

const webpack = require('webpack');
// const Dotenv = require('dotenv-webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV || 'development';

module.exports = (env) => {
  const envKeys = {
    'process.env': JSON.stringify(process.env),
  };

  return {
    mode,
    entry: {
      main: './src/index.js',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    output: {
      path: path.join(__dirname, 'dist', 'public'),
      publicPath: '/assets/',
    },
    devServer: {
      compress: true,
      port: 8080,
      host: '0.0.0.0',
      publicPath: '/assets/',
      historyApiFallback: true,
    },
    devtool: 'source-map',
    plugins: [
      new MiniCssExtractPlugin(),
      new webpack.DefinePlugin(envKeys),
      // new Dotenv(),
    ],
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            { loader: 'css-loader' },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader' },
          ],
        },
      ],
    },
  };
};
