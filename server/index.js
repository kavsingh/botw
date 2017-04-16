/* eslint-env node */

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const config = require('../webpack.config')
const shrineQuests = require('./data/shrineQuests.json')
const { setShrineQuestCompletion, readStats } = require('./stats')

const app = express()
const { output } = config

// Webpack
if (process.env.NODE_ENV === 'production') {
  app.use(output.publicPath, express.static(output.path))
} else {
  const compiler = webpack(config)

  app.use(devMiddleware(compiler, {
    noInfo: true,
    publicPath: output.publicPath,
    colors: true,
    progress: true,
  }))

  app.use(hotMiddleware(compiler))
}

app.use(bodyParser.json())

app.get('/api/shrine-quests', (req, res) => {
  res.json({
    items: Object.values(shrineQuests).sort((a, b) => a.order - b.order),
  })
})

app.get('/api/stats', async (req, res) => {
  const stats = await readStats()
  res.json(stats)
})

app.get('/api/*', (req, res) => {
  res.status(404).json({})
})

app.post('/api/stats/shrine-quests/complete', async (req, res) => {
  const { id, complete } = req.body

  try {
    const stats = await setShrineQuestCompletion(id, complete)
    res.json(stats)
  } catch (error) {
    console.warn(error)
    res.status(500).json({ message: error.toString() })
  }
})

app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, `${output.path}/index.html`)))

const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost'
const port = 3000

app.listen(port, host, err => {
  /* eslint-disable no-console */
  if (err) {
    console.log(err)
    return
  }

  console.log(`Listening at http://${host}:${port}`)
  /* eslint-enable no-console */
})
