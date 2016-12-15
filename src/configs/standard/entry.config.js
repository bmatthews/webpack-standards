import merge from 'webpack-merge'
import { isString } from '../../utils'

export default (config, settings) => {
  if (isString(settings)) {
    return merge.smart(config, { entry: [ settings ] })
  }

  if (Array.isArray(settings)) {
    return merge.smart(config, { entry: settings })
  }

  throw new Error('Unexpected webpack entry value')
}
