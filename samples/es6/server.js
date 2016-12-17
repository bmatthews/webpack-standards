import path from 'path'
import config from './config'
import { webpackService } from '../../src'

console.log(config)

webpackService.output(config, path.resolve(__dirname, './config-output.json'))
webpackService.run(config)
