const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

module.exports = {
  entry: './src/app',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [  'style-loader',
                { loader: 'css-loader', options: { importLoaders: 1 } },
                'postcss-loader' 
            ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env"] 
          }
        }
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src']
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    compress : true,
    // public: 'https://9bb32d69.ngrok.io'
    // headers: {
    // }
  },
  devtool: 'inline-source-map',
  plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Development',
        template: './src/index.html' // Normally creates a generic HTML for js file. But with template we can feed in our own HTML.
      }),
      new HtmlWebpackExternalsPlugin({
        externals: [
          {
            module:'vue', //Example for CDN
            entry: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.js',
            // global:'jQuery'  //if you want to setup a global
          },
          // {
          //   module:'googleMaps',
          //   entry: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAbnCoLwjzrj7G5TTcnoK8xLgVlYl2Y_p0&callback=initMap',
          //   global: 'google'
          // }
        ]
      })
  ] 
};