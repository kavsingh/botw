const path = require('path')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const HtmlHarddiskPlugin = require('html-webpack-harddisk-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { compact } = require('lodash/fp')

const fromRoot = path.resolve.bind(path, __dirname)
const isProduction = process.env.NODE_ENV === 'production'
const publicPath = '/'

module.exports = {
  entry: {
    app: [fromRoot('client/index.js')],
  },
  output: {
    filename: isProduction ? '[name].[chunkhash].js' : '[name].js',
    path: fromRoot('dist'),
    publicPath,
  },
  devtool: isProduction ? 'sourcemap' : 'cheap-eval-sourcemap',
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    inline: true,
    hot: true,
    historyApiFallback: { index: publicPath },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: fromRoot('node_modules'),
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.css$/,
        exclude: fromRoot('node_modules'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: 1,
                importLoaders: 1,
                sourceMap: isProduction,
                minimize: isProduction,
                localIdentName: isProduction
                  ? '[hash:base64:5]'
                  : '[name]_[local]_[hash:base64:5]',
              },
            },
            { loader: 'postcss-loader' },
          ],
        }),
      },
      {
        test: /\.css$/,
        exclude: fromRoot('client'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: isProduction,
                minimize: isProduction,
              },
            },
            { loader: 'postcss-loader' },
          ],
        }),
      },
      {
        test: /\.(jpg|png|gif|woff|woff2|ttf|eot)$/,
        use: [{ loader: 'file-loader' }],
      },
      {
        test: /\.svg$/,
        include: fromRoot('client'),
        use: [{ loader: 'svg-inline-loader' }],
      },
      {
        test: /\.svg$/,
        exclude: fromRoot('client'),
        use: [{ loader: 'file-loader' }],
      },
    ],
  },
  plugins: compact([
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new ExtractTextPlugin(isProduction
      ? '[name].[contenthash:20].css'
      : '[name].css'),
    new HtmlPlugin({
      title: 'Shrine Quests',
      template: fromRoot('client/index.html'),
      inject: 'body',
      alwaysWriteToDisk: true,
    }),
    new HtmlHarddiskPlugin(),
    isProduction && new webpack.optimize.OccurrenceOrderPlugin(true),
    isProduction && new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
    !isProduction && new webpack.HotModuleReplacementPlugin(),
  ]),
  resolve: {
    extensions: ['.js'],
    modules: [fromRoot('client'), 'node_modules'],
  },
}
