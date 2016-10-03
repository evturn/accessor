import 'babel-polyfill'
import express from 'express'
import configEnv from './middleware/config-env'
import log from './logger'

const app = express()

const sendFile = configEnv(app)

app.get('*', sendFile)
app.set('port', process.env.PORT || 3000)

app.listen(3000, err => err
  ? log.serverStartError(err)
  : log.serverStarted(app.get('port'), process.env.NODE_ENV)
)