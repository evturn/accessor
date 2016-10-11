import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

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

  init(observer) {
    const unsubscribe = firebase.auth().onAuthStateChanged(
      x => {
        unsubscribe()
        observer.next(x)
      },
      e => observer.error(e)
    )
  },

  providerSignIn(provider) {
    const services = {
      twitter: new firebase.auth.TwitterAuthProvider(),
      github: new firebase.auth.GithubAuthProvider(),
    }
    return firebase.auth().signInWithPopup(services[provider])
  },

  auth() {
    return firebase.auth()
  },

  database() {
    return firebase.database()
  },

  ref(x) {
    return firebase.database().ref(x)
  },

  rootRef() {
    return firebase.database().ref('records')
  },

  childRef(x) {
    return firebase.database().ref('records').child(x)
  },

  pathRef(x) {
    return firebase.database().ref(`records/${x}`)
  },
}