const webpack = require('webpack');
const path = require('path');
// vue.config.js
module.exports = {
  // 选项...
  devServer: {
	open:true,//自动打开浏览器
    port: 8089,//当前项目的启动端口
  },
  configureWebpack: {//引入jquery
    plugins: [
      new webpack.ProvidePlugin({
        $:"jquery",
        jQuery:"jquery",
        "windows.jQuery":"jquery",
        Popper:['popper.js','default']
      })
    ]
  },

}