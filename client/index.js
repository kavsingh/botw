import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { configureStore } from './state'
import App from './layouts/App'
import ConnectedShrineQuests from './containers/ShrineQuests'

const { store } = configureStore()

render(
  <Provider store={store}>
    <App>
      <ConnectedShrineQuests />
      <style jsx global>{`
        html { box-sizing: border-box; }
        html *, html *::before, html *::after { box-sizing: inherit; }
        html, body { margin: 0; padding: 0; }
        #app-mount { width: 100vw; height: 100vh; }
      `}</style>
    </App>
  </Provider>,
  document.querySelector('#app-mount'),
)
