import path from 'path'
import firebase from 'firebase'
import recordsMiddleware from './records'

firebase.initializeApp({
  databaseURL: 'https://access-or.firebaseio.com/',
  serviceAccount: path.resolve(process.cwd(), 'config', 'host', 'firebase-credentials.json')
})

export default recordsMiddleware(firebase)