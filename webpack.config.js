const path = require('path');

const root = __dirname;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({
  filename: 'bundle.css', // scss轉css後另存的目標檔名
});

module.exports = {
  // 入口文件
  entry: path.resolve(root, 'src/index.js'),
  // 來源檔案 src資料夾中的index.js
  // 出口文件
  output: {
    // filename: '[hash:8].bundle.min.js',
    filename: 'bundle.min.js',
    path: path.resolve(root, 'dist'),
  },
  // 打包後目標檔案在 dist資料夾中
  // loaders
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, // 針對所有.css 的檔案作預處理，這邊是用 regular express 的格式
        use: [
          'style-loader', // 這個會後執行 (順序很重要)
          'css-loader', // 這個會先執行
        ],
      },
      {
        test: /\.sass$/,
        use: extractPlugin.extract({
          // 利用 extractPlugin 實例裡的 extract 來建立 Loader
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 40000,
              name: 'images/[hash:8].[name].[ext]',
            },
          },
          'image-webpack-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 40000,
            name: 'font/[hash:8].[name].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React Demo',
      template: path.resolve(root, 'src/index.html'),
    }),
    extractPlugin,
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        drop_console: false,
      },
    }),
  ],
  resolve: {
    alias: {
      utils: path.join(__dirname, 'src/js/utils'),
      views: path.join(__dirname, 'src/js/views'),
      constants: path.join(__dirname, 'src/js/constants'),
      svg: path.join(__dirname, 'src/svg'),
    },
  },
};
