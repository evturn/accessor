import { API, Observe$ } from 'api'
import * as Types from 'api/constants'
import * as Actions from 'api/actions'
import { combineEpics } from 'redux-observable'

function initAuth(action$) {
  return action$.ofType(Types.INIT_AUTH)
    .map(action => action.payload.user)
    .map(user => !!user ? { id: user.uid, ...user.providerData[0] } : false)
    .map(user => ({ user: user || null, isAuthenticated: !!user }))
    .map(Actions.authStateChange)
}

function listenForChanges(action$) {
  return action$.ofType(Types.AUTH_STATE_CHANGE)
    .map(action => action.payload)
    .switchMap(({ user, isAuthenticated }) => Observe$.onlyIf(user.id, isAuthenticated))
    .switchMap(child => Observe$.create(observer => {
      API
        .childRef(child)
        .on('value', x => observer.next(Actions.updateSuccess(x.val())))
    }))
}

function createRecord(action$) {
  return action$.ofType(Types.CREATE_RECORD)
    .map(action => action.payload)
    .switchMap(({ ref, data }) => {
      const rootRef = API.rootRef(ref)
      return Observe$.of(rootRef)
        .map(ref => ref.push().key)
        .map(id => ({ ...data, id, url: `records/${id}` }))
        .map(x => ({ [x.id]: x }))
        .map(x => rootRef.update(x))
        .switchMap(Observe$.empty)
    })
}

function login(action$) {
  return action$.ofType(Types.AUTHENTICATING)
    .map(action => action.payload.provider)
    .switchMap(provider => Observe$.fromPromise(API.Auth.signInWithPopup(provider)))
    .map(x => x.user)
    .map(Actions.loginSuccess)
    .catch(Actions.loginError)
}

function loginSuccess(action$) {
  return action$.ofType(Types.LOGIN_SUCCESS)
    .map(action => action.payload.user)
    .map(Actions.initAuth)
}

function logout(action$) {
  return action$.ofType(Types.LOGOUT)
    .switchMap(action => Observe$.fromPromise(API.Auth.signOut())
      .map(Actions.logoutSuccess)
      .catch(Actions.logoutError)
    )
}

export default combineEpics(
  initAuth,
  login,
  loginSuccess,
  listenForChanges,
  logout,
  createRecord,
)