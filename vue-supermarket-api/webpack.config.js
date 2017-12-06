var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    library: 'vue-supermarket-api',
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['env']
        }
      }
    ]
  },
  // we expect all package.json dependencies to be installed in the hosting
  // environment/app
  externals: [
    'axios',
    'lodash.merge',
    'lodash.uniq'
  ],
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
