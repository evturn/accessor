import { apiAuth, apiDB } from 'api'
import { Observable } from 'rxjs'
import { combineEpics } from 'redux-observable'
import * as Types from 'constants'
import * as Actions from 'actions'

function initAuth(action$) {
  return action$.ofType(Types.INIT_AUTH)
    .map(action => action.payload.user)
    .map(user => user !== null ? { id: user.uid, ...user.providerData[0] } : null)
    .map(Actions.authStateChange)
}

function authenticateUser(action$, store) {
  return action$.ofType(Types.AUTHENTICATING)
    .switchMap(action => {
      const { provider } = action.payload
      return Observable.fromPromise(
        apiAuth.signInWithPopup(provider)
        .then(x => x)
      )
      .map(Actions.loginSuccess)
      .catch(Actions.loginError)
    })
}

function unauthenticateUser(action$) {
  return action$.ofType(Types.LOGOUT)
    .switchMap(action => {
      return Observable.fromPromise(apiAuth.signOut().then(x => x))
      .map(Actions.logoutSuccess)
      .catch(Actions.logoutError)
    })
}

export default combineEpics(authenticateUser, unauthenticateUser, initAuth)