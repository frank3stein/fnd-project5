const path =  require('path');
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
    compress : true
  },
  devtool: 'inline-source-map',
  plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Development',
        template: './src/index.html' // Normally creates a generic HTML for js file. But with template we can feed in our own HTML.
      }),
      // new HtmlWebpackExternalsPlugin({
      //   externals: [
      //     {
      //       module:'jquery', //Example for CDN
      //       entry: 'https://unpkg.com/jquery@3.2.1/dist/jquery.min.js',
      //       // global:'jQuery'  //if you want to setup a global
      //     }
      //   ]
      // })
  ]
};