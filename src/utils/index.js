export const isString = value =>
  value && {}.toString.call(value) === '[object String]'

export const isFunction = value =>
  value && {}.toString.call(value) === '[object Function]'

const regexEqual = (x, y) =>
  (x instanceof RegExp) && (y instanceof RegExp) &&
  (x.source === y.source) && (x.global === y.global) &&
  (x.ignoreCase === y.ignoreCase) && (x.multiline === y.multiline)

export const getLoaderFromRegex = (config, regex) => {
  if (!config) {
    return null
  }

  if (!config.module) {
    return null
  }

  if (!config.module.rules) {
    return null
  }

  if (!Array.isArray(config.module.rules) || config.module.rules.length === 0) {
    return null
  }

  const loaders = config.module.rules.filter(r => regexEqual(r.test, regex))
  if (!loaders || loaders.length === 0) {
    return null
  }

  if (loaders.length > 1) {
    throw new Error(`There are more than one loaders specified with regex '${regex}'`)
  }

  return loaders[0]
}
