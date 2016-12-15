import merge from 'webpack-merge'

const tsReactConfig = {
  module: {
    rules: [{
      test: /\.tsx$/,
      exclude: /node_modules/,
      loaders: ['babel-loader', 'ts-loader']
    }]
  },
  resolve: {
    extensions: ['.tsx']
  }
}

export default (config) =>
  merge.smart(config, tsReactConfig)
