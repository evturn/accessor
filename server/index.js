import 'babel-polyfill'
import express from 'express'
import bodyParser from 'body-parser'
import setup from './middleware'
import log from './logger'

const app = express()

app.use(bodyParser.json())

setup(app)

app.set('port', process.env.PORT || 3000)

app.listen(3000, err => err
  ? log.serverStartError(err)
  : log.serverStarted(app.get('port'), process.env.NODE_ENV)
)