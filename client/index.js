import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { configureStore } from './state'
import { initFetch } from './state/actions'
import App from './layouts/App'
import ConnectedShrines from './containers/Shrines'

const { store } = configureStore()

render(
  <Provider store={store}>
    <App>
      <ConnectedShrines />
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

initFetch()(store.dispatch)
