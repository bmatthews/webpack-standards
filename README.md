Build standardised webpack 2.x configurations

# Getting Started

```
mkdir my-app
cd my-app
npm init
npm i react react-dom babel-polyfill --save
npm i babel-cli babel-register cross-env --save-dev
npm i webpack-standards --save-dev
```

Create a `server.js` folder in the root of your project:

```javascript
import path from 'path'
import { webpackServiceStandard as webpackService } from 'webpack-standards'

const config = webpackService
  .entry(path.resolve(__dirname, './src/index.jsx'))
  .output(path.resolve(__dirname, './dist'))
  .esReactStandard()
  .get()

webpackService.run(config)
```

Here we're creating a React application in es6, and our starting code is in the `src/index.js` file:

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './App'

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
```

This entry file references our root `./App` component `App.jsx` in the same `src` folder:

```javascript
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'

class App extends Component {
  render() {
    return (
      <div>
        <p>My App</p>
      </div>
    )
  }
}

export default App
```

That's it for your application, now we update your `package.json` to include `start` and `build` scripts:

```
"scripts": {
  "start": "babel-node --presets es2015,stage-0,react server.js",
  "build": "cross-env NODE_ENV=production webpack"
  ...
}
```

Because we installed the `babel-cli` and `babel-register` packages, we can write our `server.js` file in es6 and use `babel-node` from the command line. We can also use `cross-env` to set the `NODE_ENV` environment variable to production for our build.

