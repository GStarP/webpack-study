const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 踩坑: CleanWebpackPlugin 这里的引入和下面的使用都和官方指南不同!
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
      app: './src/index.js',
      // print: './src/print.js',
      another: './src/another.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      // 热替换和 [chunkhash] 的使用是冲突的!
      filename: '[name].[hash].bundle.js',
      chunkFilename: '[name].bundle.js'
    },
    module: {
      rules:[
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Caching'
      }),
      // 自动清理 dist 目录
      new CleanWebpackPlugin(),
      // 模块热替换插件
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ],
    // 使用 source map 追踪错误来源
    devtool: 'inline-source-map',
    // 使用 webpack-dev-server 实时重新加载
    devServer: {
      contentBase: './dist',
      hot: true
    },
    // 避免重复依赖插件,官方指南有坑!!!
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            name: 'commons',
            chunks: 'initial',
            minChunks: 2
          }
        }
      }
    }
};