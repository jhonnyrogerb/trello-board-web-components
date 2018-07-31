'use strict';
var path = require('path');

var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')

var ENV = process.env.npm_lifecycle_event;
var isProd = ENV === 'build';

module.exports = {
  entry: {
    App: ['app/app.ts'],
    cardComponent: ['app/components/card/card.component.ts'],
    cardEditComponent: ['app/components/card-edit/card-edit.component.ts'],
    listComponent: ['app/components/list/list.component.ts'],
    boardComponent: ['app/components/board/board.component.ts']
  },

  context: path.join(process.cwd(), 'src'),

  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: 'app/[name].[hash].js',
    libraryTarget: 'var',
    library: '[name]'
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
      {
        enforce: 'pre',
        test: /\.ts$/,
        loader: 'tslint-loader',
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader',
        }),
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader',
        }),
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: "html-loader?exportAsEs6Default"
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?.*$|$)/,
        loader: 'file'
      }
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      chunksSortMode: 'dependency',
      inject: true,
    }),

    new ExtractTextPlugin({
      filename: 'dist/[name].bundle.css',
      allChunks: true,
      //disable: !isProd
    }),

    new CopyWebpackPlugin([{ from: 'public' }]),

    new CopyWebpackPlugin([{ from: 'assets', to: 'assets' }])
    //new UglifyJsPlugin()

  ],

  resolve: {
    modules: ['node_modules', path.resolve(process.cwd(), 'src')],
    extensions: ['.js', '.ts', 'scss'],
  },

  devServer: {
    contentBase: path.join(process.cwd(), 'dist'),
    clientLogLevel: 'info',
    port: 8080,
    inline: true,
    historyApiFallback: false,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 500,
    },
  },

  devtool: 'source-map',
};
