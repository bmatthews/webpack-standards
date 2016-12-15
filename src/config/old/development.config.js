import { merge } from '../utils'
import getBaseConfig from './base.config'
import getHmrConfig from './hmr.config'
import codeConfig from './code.config'

const getConfig = (port, htmlPluginConfig) =>
  merge(
    getBaseConfig(port, htmlPluginConfig, ["react-hot-loader/babel"]),
    codeConfig,
    getHmrConfig(port)
  )

export default getConfig
