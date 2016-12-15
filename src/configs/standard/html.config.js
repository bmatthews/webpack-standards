import path from 'path'
import merge from 'webpack-merge'
import htmlPlugin from 'html-webpack-plugin'

const defaultHtmlConfig = {
  title: 'App',
  appMountId: 'root',
  inject: false
}

const getHtmlConfig = settings => {
  const template = (settings && settings.template) || require('html-webpack-template')

  const htmlConfig = merge.smart(
    defaultHtmlConfig,
    settings,
    { template }
  )

  return {
    plugins: [
      new htmlPlugin(htmlConfig)
    ]
  }
}

export default (config, settings) =>
  merge.smart(config, getHtmlConfig(settings))
