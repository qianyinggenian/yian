'use strict';
const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: "./",
  devServer: { },
  chainWebpack(config) {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/common/icons'))       //注意svg的存储地址
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/common/icons'))        //注意svg的存储地址
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end();
  }
};
