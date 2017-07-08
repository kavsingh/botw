/* eslint-env node */

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const { IpFilter: ipFilter, IpDeniedError } = require('express-ipfilter')
const webpack = require('webpack')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const config = require('../webpack.config')
const api = require('../api')

const app = express()
const { output } = config
const whitelist = ['127.0.0.1/24', '192.168.0.1/24', '192.168.1.1/24']
const env = process.env

// Webpack
if (env.NODE_ENV === 'production' || env.ELECTRON) {
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

if (process.env.IP_RESTRICT) {
  app.use(ipFilter(whitelist, {
    mode: 'allow',
    logLevel: process.env.NODE_ENV === 'production' ? 'deny' : 'all',
  }))
}

const errorResponse = (error, res) => {
  if (error instanceof IpDeniedError) {
    res.status(403).json({ message: error.toString() })
  } else {
    res.status(500).json({ message: error.toString() })
  }
}

app.get('/api/shrines', (req, res) => {
  try {
    res.json(api.getShrines())
  } catch (error) {
    errorResponse(error, res)
  }
})

app.get('/api/shrine-quests', (req, res) => {
  try {
    res.json(api.getShrineQuests())
  } catch (error) {
    errorResponse(error, res)
  }
})

app.get('/api/stats', async (req, res) => {
  try {
    res.json(api.getStats())
  } catch (error) {
    errorResponse(error, res)
  }
})

app.post('/api/stats/shrines/complete', async (req, res) => {
  const { id, complete } = req.body

  try {
    const stats = await api.completeShrine(id, complete)
    res.json(stats)
  } catch (error) {
    errorResponse(error, res)
  }
})

app.post('/api/stats/shrine-quests/complete', async (req, res) => {
  const { id, complete } = req.body

  try {
    const stats = await api.completeShrineQuest(id, complete)
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

app.get('*', (req, res) => {
  try {
    res.sendFile(path.resolve(__dirname, `${output.path}/index.html`))
  } catch (error) {
    errorResponse(error, res)
  }
})

const [defaultHost, defaultPort] = process.env.NODE_ENV === 'production'
  ? ['0.0.0.0', 8080]
  : ['localhost', 3000]


let server

const start = ({ host = defaultHost, port = defaultPort } = {}) => {
  if (server) return server

  server = app.listen(port, host, err => {
    /* eslint-disable no-console */
    if (err) {
      console.log(err)
      return
    }

    console.log(`Listening at http://${host}:${port}`)
    /* eslint-enable no-console */
  })

  return server
}

const stop = () => {
  if (server) server.close()
  process.exit(0)
}

module.exports = { start, stop, defaultHost, defaultPort }
