import { combineReducers } from 'redux'
import { combineDelegators } from 'redux-observable'
import { Observable } from 'rxjs'

import * as storage from 'utils/storage'
import * as recordActions from '../actions'
import {
  REQUEST_RECORDS,
  CREATE_RECORD,
  UPDATE_RECORD,
  REMOVE_RECORD,
  SET_STATE_FROM_STORAGE,
} from 'containers/App/constants'

import { records, data } from './records'
// import { loading, error, message } from './loading'
import { target, loading, cardView, treeView } from './target'
import { byId, branches } from './byId'

const saveData = action => {
  return Observable.of(storage.set(action.data))
    .flatMap(recordActions.setStateFromStorage)
}

const fetchRecordsManager = (action$, store) => (
  action$.ofType(REQUEST_RECORDS)
    .switchMap(action => {
      return Observable.of(storage.get())
        .flatMap(x => {
          if (x.error) {
            return recordActions.storageError(x)
          }

          return recordActions.receiveRecords(x)
        })
      })
)

const createRecordManager = (action$, store) => (
  action$.ofType(CREATE_RECORD).switchMap(saveData)
)

const updateRecordManager = (action$, store) => (
  action$.ofType(UPDATE_RECORD).switchMap(saveData)
)

const removeRecordManager = (action$, store) => (
  action$.ofType(REMOVE_RECORD).switchMap(saveData)
)


export const rootReducer = combineReducers({
  records,
  data,
  branches,
  target,
  cardView,
  treeView,
  message: _ => 'Sup',
  error: _ => false,
  loading: _ => false,
  byId,
})

export const rootManager = combineDelegators(
  fetchRecordsManager,
  createRecordManager,
  updateRecordManager,
  removeRecordManager,
)
