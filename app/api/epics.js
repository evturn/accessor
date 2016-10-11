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

  function providerSignIn(action$) {
    return action$.ofType(Types.PROVIDER_SIGN_IN)
      .pluck('payload', 'provider')
      .mergeMap(API.providerSignIn)
      .pluck('user')
      .map(Actions.initAuth)
      .catch(Actions.loginError)
  },

  function providerSignOut(action$) {
    return action$.ofType(Types.PROVIDER_SIGN_OUT)
      .mergeMap(API.providerSignOut)
      .map(Actions.unauthorize)
      .catch(Actions.logoutError)
  },

  function listenForChanges(action$) {
    return action$.ofType(Types.AUTH_STATE_CHANGE)
      .pluck('payload', 'user', 'id')
      .map(x => API.ref('records').child(x))
      .switchMap(ref => Observe$.create(observer => ref.on('value', x => observer.next(x))))
      .map(x => x.val())
      .map(Actions.updateSuccess)
  },

  function createRecord(action$) {
    return action$.ofType(Types.CREATE_RECORD)
      .map(action => action.payload)
      .map(({ child, data }) => ({ data, ref: API.ref('records').child(child) }))
      .switchMap(({ ref, data }) => Observe$.of(ref.push().key)
        .map(x => ({...data, id: x, url: `records/${x}`}))
        .map(x => ref.update({ [x.id]: x }))
        .map(Actions.OK200)
      )
  },

  function removeRecord(action$) {
    return action$.ofType(Types.REMOVE_RECORD)
      .pluck('payload')
      .map(x => API.ref(`records/${x.child}`).child(x.id).remove())
      .map(Actions.OK200)
  }

]

export default combineEpics(...epics)