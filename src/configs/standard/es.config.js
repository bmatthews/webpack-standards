import merge from 'webpack-merge'

const esConfig = {
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: [["es2015", { "modules": false }], "stage-0"],
        babelrc: false
      }
    }]
  },
  resolve: {
    extensions: ['.js']
  }
}

export default (config, settings) =>
  merge.smart(config, esConfig)
