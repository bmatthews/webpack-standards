import path from 'path'
import { webpackServiceStandard as webpackService } from './src/services/WebpackService'

const config = webpackService
  .entry(path.resolve(__dirname, './public/index.jsx'))
  .output(path.resolve(__dirname, './public'))
  .esReactStandard()
  .get()

console.log(config)

// webpackService.output(config, path.resolve(__dirname, './config-output.json'))
webpackService.run(config)
