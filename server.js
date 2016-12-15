import path from 'path'
import { webpackServiceStandard as webpackService } from './src/WebpackService'

const config = webpackService
  .entry(path.resolve(__dirname, './public/index.jsx'))
  .output(path.resolve(__dirname, './public'))
  .esReactStandard()
  .get()

console.log(config)

webpackService.run(config)
