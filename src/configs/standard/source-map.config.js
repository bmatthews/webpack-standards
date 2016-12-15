import webpack from 'webpack'
import merge from 'webpack-merge'
import { isString } from '../../utils'

const getSourceMapConfig = value => ({
  devtool: value
})

export default (config, settings) => {
  if (!isString(settings)) {
    throw new Error(`The settings source map value is expected to be a string, e.g. 'inline-source-map'`)
  }

  return merge.smart(config, getSourceMapConfig(settings))
}
