const path = require('path');
const webpack = require('webpack');
const helpers = require('./helpers');

module.exports = {
  entry: { server: './server.ts' },
  resolve: { extensions: ['.js', '.ts'] },
  target: 'node',
  mode: 'none',
  // this makes sure we include node_modules and other 3rd party libraries
  externals: [/node_modules/],
  output: {
    path: helpers.root('dist'),
    filename: '[name].js'
  },
  module: {
    rules: [{ test: /\.ts$/, loader: 'awesome-typescript-loader' }]
  },
  plugins: [
    // Temporary Fix for issue: https://github.com/angular/angular/issues/11580
    // for 'WARNING Critical dependency: the request of a dependency is an expression'
    new webpack.ContextReplacementPlugin(
      /(.+)?angular(\\|\/)core(.+)?/,
       helpers.root('src'), // location of your src
      {} // a map of your routes
    ),
    new webpack.ContextReplacementPlugin(
      /(.+)?express(\\|\/)(.+)?/,
       helpers.root('src'),
      {}
    )
  ]
};
