import { API } from 'api'
import { Observable } from 'rxjs'
import { combineEpics } from 'redux-observable'
import * as Types from 'api/constants'
import * as Actions from 'api/actions'

function initAuth(action$) {
  return action$.ofType(Types.INIT_AUTH)
    .map(action => action.payload.user)
    .map(user => !!user ? { id: user.uid, ...user.providerData[0] } : false)
    .map(user => ({ user: user || null, isAuthenticated: !!user }))
    .map(Actions.authStateChange)
}

function login(action$, store) {
  return action$.ofType(Types.AUTHENTICATING)
    .map(action => action.payload.provider)
    .switchMap(provider => Observable.fromPromise(API.Auth.signInWithPopup(provider).then(x => x.user)))
    .map(Actions.loginSuccess)
    .catch(Actions.loginError)
}

function loginSuccess(action$, store) {
  return action$.ofType(Types.LOGIN_SUCCESS)
    .map(action => action.payload.user)
    .map(Actions.initAuth)
}

function listenForChanges(action$, store) {
  return action$.ofType(Types.AUTH_STATE_CHANGE)
    .map(action => action.payload)
    .map(({ user, isAuthenticated }) => {
      if (isAuthenticated) {
        API.DB
        .ref('records')
        .child(user.id)
        .on('value', x => {
          store.dispatch(Actions.updateSuccess(x.val()))
        })
      }
    })
    .switchMap(Actions.nothing)
}

function logout(action$) {
  return action$.ofType(Types.LOGOUT)
    .switchMap(action => {
      return Observable.fromPromise(API.Auth.signOut().then(x => x))
      .map(Actions.logoutSuccess)
      .catch(Actions.logoutError)
    })
}

function createRecord(action$, store) {
  return action$.ofType(Types.CREATE_RECORD)
    .map(action => action.payload)
    .switchMap(({ path, data }) => {
      const ref = API.DB.ref(path)
      return Observable.of(ref)
        .map(ref => ref.push().key)
        .map(key => ({ [key]: { ...data } }))
        .map(child => ref.update(child))
        .switchMap(Actions.nothing)
    })
}

export default combineEpics(
  initAuth,
  login,
  loginSuccess,
  listenForChanges,
  logout,
  createRecord,
)

/////////////////////////////////////////////////////
// BELOW IS NOT IN USE
/////////////////////////////////////////////////////

function unwrapSnapshot(snapshot) {
  const attrs = snapshot.val()
  return {
    ...attrs,
    key: snapshot.key,
  }
}

function loadRecords(action$, store) {
  return action$.ofType(Types.LOAD_RECORDS)
    .switchMap(action => {
      const { path } = action.payload
      const ref = API.DB.ref(path)
      let initialized = false
      let list = []

      return Observable.create(observer => {
        ref.once('value', _ => {
          initialized = true
          observer.next(Actions.loadRecordsSuccess(list))
        })

        ref.on('child_added', snapshot => {
          if (initialized) {
            observer.next(Actions.onAdd(unwrapSnapshot(snapshot)))
          } else {
            list.push(unwrapSnapshot(snapshot))
          }
        })
      })
    })
}

function recordUpdated($action, store) {
  return $action.ofType(Types.UPDATE_RECORD)
    .map(action => {
      const records = store.getState().data
      const unchangedRecords = records.filter(x => x.id !== updatedRecord.id)
      const updatedRecord = action.payload.record
      const data = [updatedRecord].concat(unchangedRecords)
      return Actions.updateSuccess({ data })
    })
}

function recordRemoved($action, store) {
  return $action.ofType(Types.REMOVE_RECORD)
    .map(action => {
      const records = store.getState().data
      const branches = store.getState().branches
      const removedRecord = action.payload.record
      const data = records.filter(x => !branches[x.id].includes(removedRecord.id))
      return Actions.updateSuccess({ data })
    })
}

