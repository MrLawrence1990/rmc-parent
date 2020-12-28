/* eslint-disable no-console */
const fs = require('fs');

const webpackBaseConfig = require('./webpack.base.conf');

const isSubmodule = process.argv[6] === '--submodule';
const submodule = process.argv[7];
let submoduleConfig = null;
if (isSubmodule) { submoduleConfig = JSON.parse(fs.readFileSync(`src/views/${submodule}/package-info.json`).toString()); }

const webpackconfig = {
  chainWebpack: (config) => {
    config.plugins.delete('prefetch');
    config.plugins.delete('preload');
    if (isSubmodule) {
      // 构建子模块，不需要打包Html
      config.plugins.delete('html');
      config.plugins.delete('copy');
    }
  },
  publicPath: isSubmodule ? submoduleConfig.publicPath : '/', // 因为vue-cli需要进行特殊处理
  configureWebpack: (config) => {
    if (isSubmodule && !submoduleConfig) {
      console.error('缺失子模块打包配置参数！');
      process.exit(1);
    }
    if (isSubmodule) {
      // eslint-disable-next-line no-param-reassign
      delete config.optimization.splitChunks;
      webpackBaseConfig.entry = `./src/views/${submoduleConfig.moduleName}/entry.js`;
      webpackBaseConfig.output = {
        filename: `module-${submoduleConfig.moduleName}.js`,
        library: `submodule-${submoduleConfig.moduleName}`,
        libraryTarget: 'window',
      };
    }
    return webpackBaseConfig;
  },
};

if (isSubmodule) {
  webpackconfig.outputDir = `./src/views/${submoduleConfig.moduleName}/output`;
}

module.exports = webpackconfig;
