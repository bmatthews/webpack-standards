import webpack from 'webpack'
import merge from 'webpack-merge'

const tsConfig = {
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      loader: 'ts-loader'
    }]
  },
  resolve: {
    extensions: ['.ts']
  }
}

export default (config, settings) =>
  merge.smart(config, tsConfig)
