import merge from 'webpack-merge'

const tsReactConfig = {
  module: {
    rules: [{
      test: /\.tsx$/,
      exclude: /node_modules/,
      loaders: ['babel-loader?' + JSON.stringify({
        presets: [["es2015", { "modules": false }], "stage-0", "react"],
        babelrc: false
      }), 'awesome-typescript-loader']
    }]
  },
  resolve: {
    extensions: ['.tsx']
  }
}

export default (config) =>
  merge.smart(config, tsReactConfig)
