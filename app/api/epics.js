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
      .pluck('payload', 'user')
      .switchMap(user => !!user ? Observe$.of(user) : Observe$.empty())
      .pluck('uid')
      .map(id => ({ user: { id } }))
      .map(Actions.authStateChange)
  },

  function listenForChanges(action$) {
    return action$.ofType(Types.AUTH_STATE_CHANGE)
      .pluck('payload', 'user', 'id')
      .map(API.childRef)
      .switchMap(ref => Observe$.create(observer => ref.on('value', x => observer.next(x))))
      .map(x => x.val())
      .map(Actions.updateSuccess)
  },

  function login(action$) {
    return action$.ofType(Types.AUTHENTICATING)
      .pluck('payload', 'provider')
      .mergeMap(API.authProvider)
      .pluck('user')
      .map(Actions.initAuth)
      .catch(Actions.loginError)
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
          .map(Actions.OK200)
      })
  },

  function removeRecord(action$) {
    return action$.ofType(Types.REMOVE_RECORD)
      .map(action => action.payload)
      .map(Observe$.empty)
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