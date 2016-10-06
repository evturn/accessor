import firebase from 'firebase'
import { Observable } from 'rxjs'
import * as Actions from 'actions'

export const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDCbHA8gEmuX4LmG7AZQ9QjDWt9hDCY5iU',
  authDomain: 'access-or.firebaseapp.com',
  databaseURL: 'https://access-or.firebaseio.com'
})

export const firebaseAuth = firebaseApp.auth()
export const firebaseDb = firebaseApp.database()

export function init(dispatch, renderApp) {
  Observable.create(observer => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(
      user => {
        if (user !== null) {
          dispatch(Actions.authStateChange(user))
        }
        observer.next()
        unsubscribe()
      },
      err => observer.error(err)
    )
  })
  .subscribe(x => renderApp())
}


export { FirebaseList } from './firebase-list'