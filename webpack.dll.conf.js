var vendors = [
  'xlsx',
  'lodash',
  'vue/dist/vue.esm.js',
  'vue-router',
  'vuex',
  'element-ui',
  'echarts',
  'iview',
  'moment',
];
var webpack = require("webpack");
var path = require("path");
module.exports = {
  output: {
    path: path.join(__dirname, './static/js/lib'), // 打包后文件输出的位置
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  entry: {
    "lib": vendors,
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', '[name]-manifest.json'),
      name: '[name]_library',
      context: __dirname
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
};
