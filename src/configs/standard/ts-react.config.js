import merge from 'webpack-merge'

const tsReactConfig = {
  module: {
    rules: [{
      test: /\.tsx$/,
      exclude: /node_modules/,
      loader: 'awesome-typescript-loader'
    }]
  },
  resolve: {
    extensions: ['.tsx']
  }
}

export default (config) =>
  merge.smart(config, tsReactConfig)
