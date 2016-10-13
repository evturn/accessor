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
  init(observer) {
    const unsubscribe = firebase.auth().onAuthStateChanged(
      x => {
        unsubscribe()
        observer.next(!!x)
      },
      e => observer.error(e)
    )
  },

  onceValue(observer) {
    const key = firebase.auth().currentUser.uid
    firebase.database()
      .ref(`records/${key}`)
      .once('value')
      .then(x => observer.next(x))
  },

  onValue(observer) {
    const key = firebase.auth().currentUser.uid
    firebase.database()
      .ref(`records/${key}`)
      .on('value', x => observer.next(x))
  },

  currentUser() {
    const user = firebase.auth().currentUser
    return !!user
      ? {...user.providerData[0], id: user.uid, records: `records/${user.uid}`}
      : false
  },

  remove(id) {
    const user = firebase.auth().currentUser
    return firebase.database().ref(`records/${user.uid}`).child(id).remove()
  },

  ref(x) {
    return firebase.database().ref(x)
  },

  rootRef() {
    const key = firebase.auth().currentUser.uid
    return firebase.database().ref(`records/${key}`)
  },

  providerSignIn(provider) {
    const services = {
      twitter: new firebase.auth.TwitterAuthProvider(),
      github: new firebase.auth.GithubAuthProvider(),
    }
    return firebase.auth().signInWithPopup(services[provider])
  },

  providerSignOut() {
    return firebase.auth().signOut()
  },
}