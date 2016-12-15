import webpack from 'webpack'
import merge from 'webpack-merge'

const optimizeConfig = {
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }}),
  ]
}

export default (config, settings) =>
  merge.smart(config, optimizeConfig)
