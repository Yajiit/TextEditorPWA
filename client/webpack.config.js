const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// COMPLETED: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './client/index.html',
        filename: 'index.html',
      }),
      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'A text editor for notes and code snippets.',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#1e88e5',
        icons: [
          {
            src: path.resolve('client/assets/icons/icon_96x96.png'),
            sizes: [72, 96, 128, 144, 192, 256, 384, 512],
          },
        ],
      }),
      new InjectManifest({
        swSrc: './client/src-sw.js',
        swDest: 'sw.js',
      }),
    ],
    module: {
      rules: [
        
      ],
    },
  };
};
