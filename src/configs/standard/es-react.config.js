import merge from 'webpack-merge'

const esReactConfig = {
  module: {
    rules: [{
      test: /\.jsx$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: [["es2015", { "modules": false }], "stage-0", "react"],
        babelrc: false
      }
    }]
  },
  resolve: {
    extensions: ['.jsx']
  }
}

export default (config) =>
  merge.smart(config, esReactConfig)
