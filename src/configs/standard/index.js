import entryConfig from './entry.config'
import outputConfig from './output.config'
import esConfig from './es.config'
import esReactConfig from './es-react.config'
import tsConfig from './ts.config'
import tsReactConfig from './ts-react.config'
import sourceMapConfig from './source-map.config'
import devServerConfig from './dev-server.config'
import hmrConfig from './hmr.config'
import htmlConfig from './html.config'
import optimizeConfig from './optimize.config'
import { not, env } from '../../WebpackService'

const getPipeline = (builder, settings, isEs, isReact) =>
  builder
    .es(() => isEs)
    .esReact(() => isEs && isReact)
    .ts(() => !isEs)
    .tsReact(() => !isEs && isReact)
    .sourceMap(env('development'), 'cheap-module-source-map')
    .sourceMap(not(env('development')), 'inline-source-map')
    .devServer(env('development'))
    .hmr(env('development'), settings && settings.port)
    .html()
    .optimize(env('production'))

const esStandard = (builder, settings) =>
  getPipeline(builder, settings, true, false)

const esReactStandard = (builder, settings) =>
  getPipeline(builder, settings, true, true)

const tsStandard = (builder, settings) =>
  getPipeline(builder, settings, false, false)

const tsReactStandard = (builder, settings) =>
  getPipeline(builder, settings, false, true)

const standard = [
  { name: 'entry', config: entryConfig },
  { name: 'output', config: outputConfig },
  { name: 'es', config: esConfig },
  { name: 'esReact', config: esReactConfig },
  { name: 'ts', config: tsConfig },
  { name: 'tsReact', config: tsReactConfig },
  { name: 'sourceMap', config: sourceMapConfig },
  { name: 'devServer', config: devServerConfig },
  { name: 'hmr', config: hmrConfig },
  { name: 'html', config: htmlConfig },
  { name: 'optimize', config: optimizeConfig },
  { name: 'esStandard', pipeline: esStandard },
  { name: 'esReactStandard', pipeline: esReactStandard },
  { name: 'tsStandard', pipeline: tsStandard },
  { name: 'tsReactStandard', pipeline: tsReactStandard }
]

export default standard
