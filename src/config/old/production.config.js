import webpack from 'webpack'

const productionConfig = {
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }}),
  ],
  eslint: {
    failOnError: true,
    failOnWarning: true
  }
}

const getConfig = (port, htmlPluginConfig) =>
  merge(
    getBaseConfig(port, htmlPluginConfig, []),
    codeConfig,
    productionConfig
  )

export default getConfig
