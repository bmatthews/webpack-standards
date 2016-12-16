import config from './config'
import { webpackService } from '../../src'

console.log(config.module)

webpackService.run(config)
