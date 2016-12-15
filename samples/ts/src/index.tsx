import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
const { AppContainer } = require('react-hot-loader')

declare var module: { hot: any };

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('root')
  )
}

render()

if (module.hot) {
  module.hot.accept('./App', render)
}
