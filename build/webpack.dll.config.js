var path = require('path');
var Webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var DllPlugin = Webpack.DllPlugin;

var CONFIGURATION = require('./config/webpack.common.config');

//定义指定文件夹的路径
const ROOT_PATH = CONFIGURATION._PATH.ROOT_PATH;
const SRC_PATH = CONFIGURATION._PATH.SRC_PATH;
const DIST_PATH = CONFIGURATION._PATH.DIST_PATH;
const DLL_PATH = CONFIGURATION._PATH.DLL_PATH;
const NODE_MODULES_PATH = CONFIGURATION._PATH.NODE_MODULES_PATH;

module.exports = {
  context: ROOT_PATH,
  entry: {
    dll: [
      path.resolve(NODE_MODULES_PATH, 'vue/dist/vue.esm.js'),
      path.resolve(NODE_MODULES_PATH, 'vuex/dist/vuex.min.js'),
      path.resolve(NODE_MODULES_PATH, 'vue-router/dist/vue-router.min.js'),
      path.resolve(NODE_MODULES_PATH, 'axios/dist/axios.min.js'),
      path.resolve(NODE_MODULES_PATH, 'iview/dist/iview.min.js'),
    ]
  },
  output: {
    path: DLL_PATH,
    filename: '[name]_[chunkhash:8].js',
    library: '[name]_[chunkhash:8]',
    chunkFilename: '[name]_[chunkhash:8].js',
  },
  module: CONFIGURATION.module,
  resolve: CONFIGURATION.resolve,
  plugins: [
    new CleanPlugin([
      'dll',
      'manifest.json',
    ],{
      root: ROOT_PATH, //指定根目录
    }),
    new DllPlugin({
      path: 'manifest.json',
      name: '[name]_[chunkhash:8]',
      context: ROOT_PATH,
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        mangle:   true,
        warnings: false,
        compress: true,
        output: {
          beautify: false
        }
      }
    }),
  ],
};
