import { Observable } from 'rxjs'
import { combineEpics } from 'redux-observable'
import * as Types from 'constants'
import * as Actions from 'actions'
import { apiDB } from 'api'
import { selectCurrentRecord } from './selectors'

function createRecord(action$, store) {
  return action$.ofType(Types.CREATE_RECORD)
    .switchMap(action => {
        const key = apiDB
          .ref(`records/${action.payload.key}`)
          .push()
          .key

        apiDB
          .ref(`records/${action.payload.key}`)
          .update({ [key]: { ...action.payload.data } })

      return Observable.empty()
    })

}

function locationChange(action$, store) {
  return action$.ofType(Types.LOCATION_WILL_CHANGE)
    .map(action => {
      const record = selectCurrentRecord(store.getState(), action.payload.id)
      return Actions.currentRecord(record)
    })
}

function listenForChanges(action$, store) {
  return action$.ofType(Types.LOGIN_SUCCESS)
    .switchMap(action => {
      apiDB
        .ref('records')
        .child(action.payload.user.uid)
        .on('value', x => {
          store.dispatch(Actions.updateSuccess(reduceRecords(x.val())))
        })
      return Observable.empty()
    })
}

function reduceRecords(xs) {
    return Object.keys(xs).reduce((acc, x) => {
      const record = xs[x]
      if (!record.id) {
        record.id = x
      }
      acc.push(record)
      return acc
    }, [])
  }

function renderLocation(action$) {
  return action$.ofType(Types.AUTH_STATE_CHANGE)
    .map(action => !!action.payload.user)
    .map(user => user ? '/' : '/login')
    .map(pathname => ({ pathname }))
    .map(Actions.locationChange)
}

export default combineEpics(locationChange, createRecord, listenForChanges)