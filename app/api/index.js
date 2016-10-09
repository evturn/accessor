import firebase from 'firebase'

export const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBZ8bmsRvWKN8QcV4Al6cVux_b7BmCAoUg',
  authDomain: 'accessor-io.firebaseapp.com',
  databaseURL: 'https://accessor-io.firebaseio.com',
  storageBucket: "accessor-io.appspot.com",
  messagingSenderId: "149184924674",
})

export const API = {
  Auth: firebase.auth(),
  DB: firebase.database(),

  auth() {
    return firebase.auth()
  },

  database() {
    return firebase.database()
  },

  rootRef() {
    return firebase.database().ref('records')
  },

  childRef(x) {
    return firebase.database().ref('records').child(x)
  },

  pathRef(x) {
    return firebase.database().ref(`records/${x}`)
  }
}