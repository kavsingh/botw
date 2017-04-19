import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { fetchData, saveShrineQuestComplete } from './util/shrineQuest'
import App from './layouts/App'
import ShrineQuests from './containers/ShrineQuests'

render(
  <App>
    <ShrineQuests
      fetchData={fetchData}
      saveShrineQuestComplete={saveShrineQuestComplete}
    />
    <style jsx global>{`
      html { box-sizing: border-box; }
      html *, html *::before, html *::after { box-sizing: inherit; }
      html, body { margin: 0; padding: 0; }
      #app-mount { width: 100vw; height: 100vh; }
    `}</style>
  </App>,
  document.querySelector('#app-mount'),
)
