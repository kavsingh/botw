import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { fetchData, saveShrineQuestComplete } from './util/shrineQuests'
import App from './containers/App'

render(
  <div style={{ width: '100%', height: '100%' }}>
    <App
      fetchData={fetchData}
      saveShrineQuestComplete={saveShrineQuestComplete}
    />
    <style jsx global>{`
      html { box-sizing: border-box; }
      html *, html *::before, html *::after { box-sizing: inherit; }
      html, body { margin: 0; padding: 0; }
      #app-mount { width: 100vw; height: 100vh; }
    `}</style>
  </div>,
  document.querySelector('#app-mount'),
)
