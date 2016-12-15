export const getDevServerConfig = (isDevelopment, contentBase, publicPath) => ({
  publicPath: publicPath,
  contentBase: contentBase,
  historyApiFallback: true,
  inline: !!isDevelopment,
  hot: !!isDevelopment,
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