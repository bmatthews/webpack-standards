// Webpack configuration common to 'code' (i.e. non test code)
import path from 'path'
import styleLintPlugin from 'stylelint-webpack-plugin'

export default {
  module: {
    loaders: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap',
          'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: [
          'style-loader',
          'css-loader?modules&camelCase&sourceMap&importLoaders=1&localIdentName=[path][name]__[local]__[hash:base64:5]',
          'postcss-loader',
          'sass-loader'
        ]
      },
    ],
  },
  plugins: [
    new styleLintPlugin({
      configFile: path.resolve(__dirname, '../lint/.stylelintrc.json'),
      failOnError: false
    })
  ],
}
