import { combineReducers } from 'redux'
import { combineDelegators } from 'redux-observable'
import { Observable } from 'rxjs'

import * as storage from 'utils/storage'
import * as actions from '../actions'
import {
  REQUEST_RECORDS,
  CREATE_RECORD,
  UPDATE_RECORD,
  REMOVE_RECORD,
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

const fetchRecordsManager = (action$, store) => (
  action$.ofType(REQUEST_RECORDS)
    .switchMap(action => {
      return Observable.of(storage.get())
        .flatMap(x => {
          if (x.error) {
            return actions.storageError(x)
          }

          return actions.receiveRecords(x)
        })
      })
)

const createEffectsManager = actionType => (
  (action$, store) => (
    action$.ofType(actionType)
      .switchMap(action => {
        return Observable.of(storage.set(store.getState().data))
          .flatMap(actions.saveRecord)
      })
  )
)

const createRecordManager = createEffectsManager(CREATE_RECORD)
const updateRecordManager = createEffectsManager(UPDATE_RECORD)
const removeRecordManager = createEffectsManager(REMOVE_RECORD)

export const getCurrentTarget = fromTarget.getCurrentTarget
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
