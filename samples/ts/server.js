import path from 'path'
import { webpackService } from '../../src'
import standard from '../../src/configs/standard'
var TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
const { CheckerPlugin } = require('awesome-typescript-loader')

const config = webpackService
  .register(standard)
  .configure()
  .entry(path.resolve(__dirname, './src/index.tsx'))
  .output(path.resolve(__dirname, './src'))
  .esReactStandard()
  .get({
    module: {
      rules: [{
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      }]
    },
    resolve: {
      extensions: ['.ts', '.tsx'],
      plugins: [
        new TsConfigPathsPlugin()
      ]
    },
    plugins: [
      new CheckerPlugin()
    ],
    performance: {
      hints: false
    }
  })

console.log(config.module)

webpackService.run(config)
