const webpack = require('webpack');

process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = function(config) {
  config.set({
    basePath : __dirname + '/',
    browsers: ['ChromeHeadless'],
    
    frameworks: ['mocha', 'jquery-3.2.1'],

    files: [
      { pattern: './spec/test.entry.js', watched: false, included: true, served: true }
    ],

    preprocessors: {
      // add webpack as preprocessor
      './spec/test.entry.js': ['webpack']
    },

    reporters: ['mocha'],

    webpack: {
      module: {
          loaders: [
              {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                  cacheDirectory: '/tmp/',
                  presets: ['react-app']
                }
              },
              {
                  test: /\.scss$/,
                  exclude: /[\/\\](node_modules|bower_components|public\/)[\/\\]/,
                  loaders: [
                      'style-loader?sourceMap',
                      'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]&sourceMap',
                      'postcss-loader',
                      'sass-loader'
                  ]
              },
              {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'url-loader',
                    options: {
                     limit: 10000
                    }
                }]
              }
          ]
      },
      plugins: [new webpack.ProvidePlugin({ $: "jquery" })],
      watch: true
  },
  webpackServer: {
      noInfo: true
  },
  mochaReporter: {
    output: 'minimal'
  },

    plugins: [
      require('karma-webpack'),
      require('karma-jquery'),
      require('karma-chrome-launcher'),
      require('karma-mocha'),
      require('karma-mocha-reporter'),
    ]
  });
};