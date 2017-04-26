import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { configureStore } from './state'
import ConnectedApp from './containers/App'

const { store, history } = configureStore()

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ConnectedApp />
    </ConnectedRouter>
  </Provider>,
  document.querySelector('#app-mount'),
)
