import firebase from 'firebase'
import * as Actions from 'src/containers/Login/actions'

export const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDCbHA8gEmuX4LmG7AZQ9QjDWt9hDCY5iU',
  authDomain: 'access-or.firebaseapp.com',
  databaseURL: 'https://access-or.firebaseio.com'
})

export const firebaseAuth = firebaseApp.auth()
export const firebaseDb = firebaseApp.database()

export function initApp(dispatch) {
  return new Promise((resolve, reject) => {
    const unsub = firebaseAuth.onAuthStateChanged(
      user => {
        dispatch(Actions.authStateChange(user))
        unsub()
        resolve()
      },
      error => reject(error)
    )
  })
}

export { FirebaseList } from './firebase-list'