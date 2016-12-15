// Webpack configuration common to test and non-test code
import path from 'path'
import htmlPlugin from 'html-webpack-plugin'
import eslintFriendlyFormatter from 'eslint-friendly-formatter'

export default (port, htmlPluginConfig, babelPlugins) => ({
  entry: [],
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ["es2015", "stage-0", "react"],
        plugins: babelPlugins || [],
        babelrc: false
      }
    },
    {
      test: /\.json$/,
      loader: 'json-loader'
    },
    {
      test: /\.md/,
      loader: 'raw-loader'
    }],
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
    root: [
      path.resolve('./')
    ]
  },
  postcss: [
    require('autoprefixer')
  ],
  plugins: [
    new htmlPlugin(Object.assign(
      {},
      htmlPluginConfig,
      { template: htmlPluginConfig.template || require('html-webpack-template') }
    )),
  ],
  eslint: {
    configFile: path.resolve(__dirname, '../lint/.eslintrc.json'),
    formatter: eslintFriendlyFormatter
  }
})
