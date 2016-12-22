import config from './config'
import { webpackService } from 'webpack-standards'

console.log(config.module)

webpackService.run(config)
