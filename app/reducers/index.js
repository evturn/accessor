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

import byId from './byId'
import target, * as fromTarget from './target'
import { records } from './records'
import { data } from './data'
import { loading } from './loading'
import { message} from './message'
import { error } from './error'
import { cardView } from './cardView'
import { treeView } from './treeView'
import { branches } from './branches'

const saveData = data => {
  return Observable.of(storage.set(data))
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
  action$.ofType(CREATE_RECORD)
    .switchMap(action => saveData(store.getState().data))
)

const updateRecordManager = (action$, store) => (
  action$.ofType(UPDATE_RECORD)
    .switchMap(action => saveData(store.getState().data))
)

const removeRecordManager = (action$, store) => (
  action$.ofType(REMOVE_RECORD)
    .switchMap(action => saveData(store.getState().data))
)

export const getComputedStyles = fromTarget.getComputedStyles

export const rootReducer = combineReducers({
  records,
  data,
  branches,
  target,
  cardView,
  treeView,
  message,
  error,
  loading,
  byId,
})

export const rootManager = combineDelegators(
  fetchRecordsManager,
  createRecordManager,
  updateRecordManager,
  removeRecordManager,
)
