import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import assemble from './assemble'

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

  create(item) {
    const ref = firebase.database().ref(`records/${firebase.auth().currentUser.uid}`)
    const id = ref.push().key
    return ref.update({[id]: {...item, id, url: `/records/${id}`}})
  },

  update(item) {
    return firebase.database().ref(`records/${firebase.auth().currentUser.uid}`)
      .update({[item.id]: item})
  },

  remove(nodes) {
    console.log(nodes)
    const ref = firebase.database().ref(`records/${firebase.auth().currentUser.uid}`)
    return nodes.map(x => ref.child(x).remove())
  },

  onValue(observer) {
    firebase.database()
      .ref(`records`)
      .child(firebase.auth().currentUser.uid)
      .on('value', x => observer.next(assemble(x.val())))
  },

  onceValue(observer) {
    firebase.database()
      .ref(`records`)
      .child(firebase.auth().currentUser.uid)
      .once('value')
      .then(x => observer.next(x))
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
  }
}