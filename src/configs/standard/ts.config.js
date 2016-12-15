import webpack from 'webpack'
import merge from 'webpack-merge'

const tsConfig = {
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      loaders: ['babel-loader', 'ts-loader']
    }]
  },
  resolve: {
    extensions: ['.ts']
  }
}

// TODO: remove jsx option and move to ts-react
// TODO: sort out source map plugin when using ts

export default (config, settings) =>
  merge.smart(config, tsConfig)
