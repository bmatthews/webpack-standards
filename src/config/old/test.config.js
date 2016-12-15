import { merge } from '../utils'
import getBaseConfig from './base.config'
import getHmrConfig from './hmr.config'

// Webpack configuration for test code
const testConfig = {
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: [
          'css-loader/locals?modules&importLoaders=1' +
            '&localIdentName=[path][local]__[hash:base64:5]',
          'sass-loader'
        ],
      },
    ],
  }
}

const getTestConfig = (port, htmlPluginConfig) =>
  merge(
    getBaseConfig(
      port,
      htmlPluginConfig,
      ["react-hot-loader/babel", ["__coverage__", { "ignore": "**/*.spec.js" }]]),
    getHmrConfig(port),
    testConfig
  )

export default getTestConfig
