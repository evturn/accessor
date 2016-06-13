/* eslint consistent-return:0 */

const express = require('express')
const logger = require('./logger')
const ngrok = require('ngrok')

const frontend = require('./middlewares/frontendMiddleware')
const __DEV__ = process.env.NODE_ENV !== 'production'
const seedData = require('./middlewares/seed')
const app = express()

app.get('/api', (req, res) => {
  res.json(seedData)
})

const webpackConfig = __DEV__
  ? require('../internals/webpack/webpack.dev.babel')
  : require('../internals/webpack/webpack.prod.babel')

app.use(frontend(webpackConfig))

const port = process.env.PORT || 3000

app.listen(port, e => {
  if (e) {
    return logger.error(e)
  }

  if (__DEV__) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr)
      }

      logger.appStarted(port, url)
    })
  } else {
    logger.appStarted(port)
  }
})
