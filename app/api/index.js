import firebase from 'firebase'

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

export const currentUser = _ => firebase.auth().currentUser

export const userRef = _ => firebase.database()
  .ref(`users/${firebaseAuth().currentUser.uid}`)

export const recordsRef = _ => firebase.database()
  .ref(`records/${firebaseAuth().currentUser.uid}`)