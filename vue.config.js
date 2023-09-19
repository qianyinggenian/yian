'use strict';
const path = require('path');

// const webpack = require('webpack');

function resolve (dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: './',
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? '/yian/' : './',
  devServer: {},
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      title: '浅影歌年'
    }
  },
  configureWebpack: {
    externals: {
      jquery: '$',
      $: 'jquery',
      jQuery: 'jquery',
      'windows.jQuery': 'jquery',
      echarts: 'echarts'
    },
    plugins: [
      // new webpack.optimize.CommonsChunkPlugin('common.js'),
      // new webpack.ProvidePlugin({
      //   jQuery: 'jquery',
      //   $: 'jquery'
      // })
    ]
  },
  chainWebpack (config) {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/common/icons')) // 注意svg的存储地址
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/common/icons')) // 注意svg的存储地址
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end();
  }
};
