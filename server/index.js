import 'babel-polyfill'
import path from 'path'
import express from 'express'
import firebase from 'firebase'
import configEnv from './middleware/config-env'
import GetRecords from './middleware/records'
import log from './logger'

const app = express()

const sendFile = configEnv(app)

firebase.initializeApp({
  databaseURL: 'https://access-or.firebaseio.com/',
  serviceAccount: path.resolve(process.cwd(), 'config', 'host', 'firebase-credentials.json')
})

app.get('/api/:user', GetRecords(firebase))

app.get('*', sendFile)
app.set('port', process.env.PORT || 3000)

app.listen(3000, err => err
  ? log.serverStartError(err)
  : log.serverStarted(app.get('port'), process.env.NODE_ENV)
)