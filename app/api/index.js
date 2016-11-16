import firebase from 'firebase'
import * as Auth from 'api/auth'

export const initApp = observer => {
  Auth.onAuthStateChanged(observer)
}

export const signInWithProvider = service => {
  Auth.signInWithPopup(service)
}

export const signOut = _ => {
  Auth.signOut()
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