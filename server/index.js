import 'babel-polyfill'
import express from 'express'
import bodyParser from 'body-parser'
import configEnv from './middleware/config-env'
import Records from './middleware'
import log from './logger'

const app = express()

app.use(bodyParser.json())
const sendFile = configEnv(app)

app.get('/api/:user',   Records.get)
app.post('/api/:user',  Records.create)
app.put('/api/:user',   Records.update)
app.delete('/api/:user', Records.remove)

app.get('*', sendFile)
app.set('port', process.env.PORT || 3000)

app.listen(3000, err => err
  ? log.serverStartError(err)
  : log.serverStarted(app.get('port'), process.env.NODE_ENV)
)