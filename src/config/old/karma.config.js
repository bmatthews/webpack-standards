const specHelper = '__tests__/specHelper.js'
const testGlob = '**/*.spec.js'

const dontWatch = pattern => ({
  pattern,
  included: true,
  served: true,
  watched: false
})

export const getKarmaConfig = (config, webpackConfig) => ({
  autoWatch: false,
  browsers: ['Chrome'],
  colors: true,
  concurrency: Infinity,
  coverageReporter: {
    reporters: [
      { type: 'lcov', dir: './coverage/', subdir: '.' },
      { type: 'json', dir: './coverage/', subdir: '.' },
      { type: 'text-summary' }
    ]
  },
  files: [/*specHelper,*/ testGlob].map(dontWatch),
  exclude: [`node_modules/${testGlob}`],
  frameworks: ['mocha', 'chai-as-promised', 'chai'],
  logLevel: config.LOG_INFO,
  port: 9876,
  preprocessors: {
    // [specHelper]: ['webpack', 'sourcemap'],
    [testGlob]: ['webpack', 'sourcemap'],
  },
  reporters: ['mocha', 'coverage'],
  singleRun: true,
  webpack: webpackConfig,
  webpackMiddleware: { noInfo: true },
})
