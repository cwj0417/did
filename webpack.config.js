const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const WebpackBar = require('webpackbar');
module.exports = {
  mode:'development',
  entry: {
    opts:'./app/opts/src/index.ts',
    popup:'./app/popup/src/index.ts'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.vue', '.json','.ts','.tsx'],
    alias: {
      'vue': '@vue/runtime-dom'
    }
  },
  devServer: {
    port: 8081,
    host: '0.0.0.0',
    compress: true,
    hot: true,
    overlay: true,
    proxy: [{
      context: ['/api/'],
      target: 'http://47.99.88.244:6062',
      changeOrigin: true,
      secure: false,
      onProxyRes(proxyRes, req, res) { //
        // console.log(proxyRes)
        const proxyHost = proxyRes.req.getHeader('host');
        const proxyPath = proxyRes.req.path;
        // console.log(host, path)
        console.log(`Proxy ${req.get('host')}${req.path} -> ${proxyHost}${proxyPath}`);
      },
    }],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.(ts|tsx)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      },
      {
        loader: 'thread-loader',
        options: {
          workers: 2 // 进程2个
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
   plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve('./index.html'),
      filename: './opts.html',
      chunks:['opts']
    }),
    new HtmlWebPackPlugin({
      template: path.resolve('./index.html'),
      filename: './popup.html',
      chunks:['popup']
    }),
    new VueLoaderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new WebpackBar(),
    ],
};