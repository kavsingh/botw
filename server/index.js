/* eslint-env node */

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const { IpFilter: ipFilter, IpDeniedError } = require('express-ipfilter')
const webpack = require('webpack')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const config = require('../webpack.config')
const shrines = require('./data/shrines.json')
const shrineQuests = require('./data/shrineQuests.json')
const {
  setShrineCompletion,
  setShrineQuestCompletion,
  readStats,
} = require('./stats')

const app = express()
const { output } = config
const whitelist = ['127.0.0.1/24', '192.168.0.1/24', '192.168.1.1/24']

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
app.use(ipFilter(whitelist, { mode: 'allow' }))

const errorResponse = (error, res) => {
  if (error instanceof IpDeniedError) {
    res.status(403).json({ message: error.toString() })
  } else {
    res.status(500).json({ message: error.toString() })
  }
}

app.get('/api/shrines', (req, res) => {
  try {
    res.json({
      items: Object.values(shrines).sort(({ id }) => id),
    })
  } catch (error) {
    errorResponse(error, res)
  }
})

app.get('/api/shrine-quests', (req, res) => {
  try {
    res.json({
      items: Object.values(shrineQuests).sort((a, b) => a.order - b.order),
    })
  } catch (error) {
    errorResponse(error, res)
  }
})

app.get('/api/stats', async (req, res) => {
  try {
    const stats = await readStats()
    res.json(stats)
  } catch (error) {
    errorResponse(error, res)
  }
})

app.get('/api/*', (req, res) => {
  try {
    res.status(404).json({})
  } catch (error) {
    errorResponse(error, res)
  }
})

app.post('/api/stats/shrines/complete', async (req, res) => {
  const { id, complete } = req.body

  try {
    const stats = await setShrineCompletion(id, complete)
    res.json(stats)
  } catch (error) {
    errorResponse(error, res)
  }
})

app.post('/api/stats/shrine-quests/complete', async (req, res) => {
  const { id, complete } = req.body

  try {
    const stats = await setShrineQuestCompletion(id, complete)
    res.json(stats)
  } catch (error) {
    errorResponse(error, res)
  }
})

app.get('*', (req, res) => {
  try {
    res.sendFile(path.resolve(__dirname, `${output.path}/index.html`))
  } catch (error) {
    errorResponse(error, res)
  }
})

const [host, port] = process.env.NODE_ENV === 'production'
  ? ['0.0.0.0', 8080]
  : ['localhost', 3000]

app.listen(port, host, err => {
  /* eslint-disable no-console */
  if (err) {
    console.log(err)
    return
  }

  console.log(`Listening at http://${host}:${port}`)
  /* eslint-enable no-console */
})
