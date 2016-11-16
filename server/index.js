import 'babel-polyfill'
import express from 'express'
import bodyParser from 'body-parser'
import setup from './middleware'
import log from './logger'

const app = express()

setup(app)

app.listen(3000, e => e
  ? log.serverStartError(e)
  : log.serverStarted(3000, process.env.NODE_ENV)
)