import path from 'path'
import { webpackService } from 'webpack-standards'
import standard from 'webpack-standards/configs/standard'

const config = webpackService
  .register(standard)
  .configure()
  .entry(path.resolve(__dirname, './src/index.tsx'))
  .output(path.resolve(__dirname, './dist'))
  .tsReactStandard()
  .get()

export default config
