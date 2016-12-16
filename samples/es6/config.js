import path from 'path'
import { webpackService } from '../../src'
import standard from '../../src/configs/standard'

const port = 7000

const config = webpackService
  .register(standard)
  .configure()
  .entry(path.resolve(__dirname, './src/index.jsx'))
  .output(path.resolve(__dirname, './dist'))
  .esReactStandard({ port })
  .get()

export default config
