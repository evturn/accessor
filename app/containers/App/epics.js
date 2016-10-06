import fetch from 'isomorphic-fetch'
import { Observable } from 'rxjs'
import { combineEpics } from 'redux-observable'
import { firebaseDb } from 'api'
import { Record } from 'immutable'
import * as Types from 'constants'
import * as Actions from 'actions'

function renderLocation(action$) {
  return action$.ofType(Types.AUTH_STATE_CHANGE)
    .map(action => !!action.payload.user)
    .map(user => user ? '/' : '/login')
    .map(pathname => ({ pathname, search: '', hash: '' }))
    .map(Actions.locationChange)
}


function unwrapSnapshot(snapshot) {
  const RecordItem = new Record({
    completed: false,
    key: null,
    title: null
  })
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
      const ref = firebaseDb.ref(path)
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

function recordCreated($action, store) {
  return $action.ofType(Types.CREATE_RECORD)
    .switchMap(action => {
      const { record } = action.payload
      const fetchPromise = fetch(
        `/api/${record.user}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ record })
      }).then(x => x.json())

      return Observable.fromPromise(fetchPromise)
        .map(Actions.updateSuccess)
        .catch(Actions.fetchError)
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

export default combineEpics(renderLocation, recordCreated, recordUpdated, recordRemoved, loadRecords)



