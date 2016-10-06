import fetch from 'isomorphic-fetch'
import { Observable } from 'rxjs'
import { combineEpics } from 'redux-observable'
import * as Types from 'constants'
import * as Actions from 'actions'

function fetchAll($action, store) {
  return $action.ofType(Types.FETCH_ALL)
    .switchMap(action => {
      const fetchPromise = fetch(`/api/${action.payload.user}`).then(x => x.json())
      return Observable.fromPromise(fetchPromise)
        .map(Actions.fetchSuccess)
        .catch(Actions.fetchError)
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

export default combineEpics(fetchAll, recordCreated, recordUpdated, recordRemoved)



