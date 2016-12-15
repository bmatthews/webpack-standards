import merge from 'webpack-merge'
import { isString } from '../../utils'

export default (config, settings) => {
  if (isString(settings)) {
    return merge.smart(config, { output: {
      path: settings,
      filename: '[name].js',
      publicPath: '/'
    }})
  }

  return merge.smart(config, { output: settings })
}
