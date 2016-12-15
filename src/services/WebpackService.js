import merge from 'webpack-merge'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import { isFunction } from '../utils'
import standard from '../configs/standard'

class WebpackService {

  constructor() {
    this.builderFuncs = {}
    this.currentConfig = {}
  }

  builderGet() {
    return {
      ...this.builderFuncs,
      get: config => merge.smart(this.currentConfig, config)
    }
  }

  pipeline(name, builderFuncsPipeline) {
    this.addBuilderFunc(name, (enabledOrSettings, settings) => {
      // first parameter is predicate, so see if we should include the config
      if (isFunction(enabledOrSettings)) {
        if (!enabledOrSettings()) {
          return this.builderGet()
        }

        builderFuncsPipeline(this.builderFuncs, settings)
        return this.builderGet()
      }

      builderFuncsPipeline(this.builderFuncs, enabledOrSettings)
      return this.builderGet()
    })

    return this
  }

  addBuilderFunc(name, builderFunc) {
    if (!name) {
      throw new Error('Attempting to register a function with no associated name')
    }

    if (!builderFunc) {
      throw new Error(`Attempting to register a function '${name}' with no value`)
    }

    if (!isFunction(builderFunc)) {
      throw new Error(`Attempting to register '${name}' with an invalid function`)
    }

    if (this.builderFuncs[name]) {
      throw new Error(`${name} function already registered`)
    }

    this.builderFuncs[name] = builderFunc
  }

  register(nameOrArray, configurator) {
    if (Array.isArray(nameOrArray)) {
      this.registerArray(nameOrArray)
      return this
    }

    this.registerConfigurator(nameOrArray, configurator)
    return this
  }

  registerConfigurator(name, configurator) {
    this.addBuilderFunc(name, (enabledOrSettings, settings) => {
      // first parameter is predicate, so see if we should include the config
      if (isFunction(enabledOrSettings)) {
        if (!enabledOrSettings()) {
          return this.builderGet()
        }

        this.currentConfig = configurator(this.currentConfig, settings)
        return this.builderGet()
      }

      this.currentConfig = configurator(this.currentConfig, enabledOrSettings)
      return this.builderGet()
    })
  }

  registerArray(configurators) {
    configurators.forEach(c => {
      // Assume that c is a { name, config } object
      // or a { name, pipeline } object

      if (!c || !c.name) {
        throw new Error(`Array registration object does not have a name defined, use format { name: '', config: (config, settings) => config }`)
      }

      if (c.config && c.pipeline) {
        throw new Error(`${c.name} registers both a config and a pipeline, they are mutually exclusive`)
      }

      if (c.config) {
        this.registerConfigurator(c.name, c.config)
        return
      }

      if (c.pipeline) {
        this.pipeline(c.name, c.pipeline)
        return
      }

      throw new Error(`Configurator '${c.name}' does not define a config or pipeline value`)
    })
  }

  configure(config) {
    this.currentConfig = config || {}
    return this.builderGet()
  }

  with(nameOrArray, configurator) {
    this.register(nameOrArray, configurator)
    return {
      ...this.configure(),
      run: this.run
    }
  }

  run(webpackConfig, settings) {

    if (!webpackConfig) {
      throw new Error('You must specify a valid webpack configuration')
    }

    if (!webpackConfig.devServer) {
      throw new Error(`The specified webpack configuration does not contain a 'devServer' section`)
    }

    const runningPort = (settings && settings.port) || 8080

    new WebpackDevServer(webpack(webpackConfig), webpackConfig.devServer).listen(
      runningPort,
      '127.0.0.1',  // TODO: review localhost vs 127.0.0.1
      (err, result) => {
        if (err) {
          return console.log(err)
        }

        console.log(`Listening at http://127.0.0.1:${runningPort}/`)
      })
  }
}

// TODO: support array of environments
export const env = environments => () => {
  const currentEnvironment = process.env.NODE_ENV || 'development'
  return currentEnvironment === environments
}

export const not = predicate => () => !predicate()

export const webpackService = new WebpackService()

export const webpackServiceStandard = new WebpackService().with(standard)
