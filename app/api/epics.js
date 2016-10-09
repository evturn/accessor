import { API } from 'api'
import { Observable as Observe$ } from 'rxjs/Observable'
import { combineEpics } from 'redux-observable'
import * as Types from 'api/constants'
import * as Actions from 'api/actions'

const epics = [

  function init(action$) {
    return action$.ofType(Types.INIT)
      .switchMapTo(Observe$.create(API.init))
      .map(Actions.initAuth)
  },

  function initAuth(action$) {
    return action$.ofType(Types.INIT_AUTH)
      .map(action => action.payload.user)
      .switchMap(user => Observe$.of(user)
        .pluck('providerData')
        .elementAt(0)
        .map(x => ({ ...x, id: user.uid }))
        .map(user => ({ user }))
        .map(Actions.authStateChange)
      )
  },

  function listenForChanges(action$) {
    return action$.ofType(Types.AUTH_STATE_CHANGE)
      .map(action => action.payload)
      .pluck('user', 'id')
      .map(API.childRef)
      .switchMap(ref => Observe$.create(observer => ref.on('value', x => observer.next(x))))
      .map(x => x.val())
      .map(Actions.updateSuccess)
  },

  function createRecord(action$) {
    return action$.ofType(Types.CREATE_RECORD)
      .map(action => action.payload)
      .switchMap(({ child, data }) => {
        const rootRef = API.childRef(child)
        return Observe$.of(rootRef)
          .map(ref => ref.push().key)
          .map(id => ({ ...data, id, url: `records/${id}` }))
          .map(x => ({ [x.id]: x }))
          .map(x => rootRef.update(x))
          .switchMap(Observe$.empty)
      })
  },

  function removeRecord(action$) {
    return action$.ofType(Types.REMOVE_RECORD)
      .map(action => action.payload)
      .map(Observe$.empty)
  },

  function login(action$) {
    return action$.ofType(Types.AUTHENTICATING)
      .map(action => action.payload.provider)
      .map(API.authProvider)
      .switchMap(provider => Observe$.fromPromise(provider))
      .map(x => x.user)
      .map(Actions.loginSuccess)
      .catch(Actions.loginError)
  },

  function loginSuccess(action$) {
    return action$.ofType(Types.LOGIN_SUCCESS)
      .map(action => action.payload.user)
      .map(Actions.initAuth)
  },

  function logout(action$) {
    return action$.ofType(Types.LOGOUT)
      .switchMap(action => Observe$.fromPromise(API.Auth.signOut())
        .map(Actions.logoutSuccess)
        .catch(Actions.logoutError)
      )
  }

]

export default combineEpics(...epics)