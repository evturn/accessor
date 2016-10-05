import { firebaseAuth } from 'api'
import { Observable } from 'rxjs'
import { combineEpics } from 'redux-observable'
import * as Types from '../../constants'
import * as Actions from './actions'

function authenticateUser(action$, store) {
  return action$.ofType(Types.AUTHENTICATING)
    .switchMap(action => {
      return Observable.fromPromise(
        firebaseAuth.signInWithPopup(action.payload.provider)
          .then(x => x)
      )
      .map(Actions.loginSuccess)
      .catch(Actions.loginError)
    })
}

function authStateChange(action$) {
  return action$.ofType(Types.INIT_AUTH)
    .map(action => {
      if (action.payload !== null) {
        const [ user ] = action.payload.providerData
        return Actions.authStateChange(user)
      }
    })
}

function unauthenticateUser(action$) {
  return action$.ofType(Types.LOGOUT)
    .switchMap(action => {
      return Observable.fromPromise(
        firebaseAuth.signOut()
          .then(Actions.logoutSuccess)
      )
    })
}

export default combineEpics(authenticateUser, authStateChange, unauthenticateUser)