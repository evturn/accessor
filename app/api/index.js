import firebase from 'firebase'
import * as Auth from './auth'
import * as Database from './database'

firebase.initializeApp({
  apiKey: 'AIzaSyBZ8bmsRvWKN8QcV4Al6cVux_b7BmCAoUg',
  authDomain: 'accessor-io.firebaseapp.com',
  databaseURL: 'https://accessor-io.firebaseio.com',
  storageBucket: "accessor-io.appspot.com",
  messagingSenderId: "149184924674",
})

export const firebaseAuth = firebase.auth
export const firebaseDatabase = firebase.database
export const firebaseStorage = firebase.storage
export { Database, Auth }
