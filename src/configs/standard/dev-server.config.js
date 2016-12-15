import merge from 'webpack-merge'

export const getDevServerConfig = (contentBase, publicPath) => ({
  publicPath: publicPath,
  contentBase: contentBase,
  historyApiFallback: true,
  headers: { 'Access-Control-Allow-Origin': '*' },
  quiet: false,
  noInfo: false,
  stats: {
    assets: false,
    colors: true,
    version: false,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false
  }
})

// TODO: throw Error if output not defined, or enforce in webpackservice config method
export default (config, settings) =>
  merge.smart(config, { devServer: getDevServerConfig(
    config.output.path,
    config.output.publicPath)
  })
