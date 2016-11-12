import firebase from 'firebase'

firebase.initializeApp({
  apiKey: 'AIzaSyBZ8bmsRvWKN8QcV4Al6cVux_b7BmCAoUg',
  authDomain: 'accessor-io.firebaseapp.com',
  databaseURL: 'https://accessor-io.firebaseio.com',
  storageBucket: "accessor-io.appspot.com",
  messagingSenderId: "149184924674",
})

export const initApp = observer => {
  return firebase.auth()
    .onAuthStateChanged(observer)
}

export const signOut = _ => {
  return firebase.auth().signOut()
}

export const signIn = provider => {
  const services = {
    twitter: new firebase.auth.TwitterAuthProvider(),
    github: new firebase.auth.GithubAuthProvider(),
  }
  firebase.auth()
    .signInWithPopup(services[provider])
}

export const fetchData = observer => {
  return firebase
    .database()
    .ref(`records`)
    .child(firebase.auth().currentUser.uid)
    .once('value')
    .then(x => x.val())
    .then(convertMapToList)
    .then(x => observer.next(x))
    .catch(e => observer.error(e))
}

function convertMapToList(data) {
  return Object.keys(data)
    .reduce((acc, x) => acc.concat(data[x]), [])
}