import merge from 'webpack-merge'
import { isString } from '../../utils'

export default (config, settings) =>
  merge.smart(config, { performance: settings })
