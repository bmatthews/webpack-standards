import path from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'
import { getLoaderFromRegex } from '../../utils'

const getHmrConfig = port => ({
  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://127.0.0.1:${port}`,
    'webpack/hot/only-dev-server',
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  devServer: {
    inline: true,
    hot: true,
  }
})

export default (config, settings) => {
  const port = (settings && settings.port) || 8080

  const mergedConfig = merge.smartStrategy({
    entry: 'prepend'
  })(config, getHmrConfig(port))

  const jsxLoader = getLoaderFromRegex(mergedConfig, /\.jsx$/)
  if (jsxLoader) {
    jsxLoader.query.plugins = [
      'react-hot-loader/babel'
    ]
  }

  return mergedConfig
}
