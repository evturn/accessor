import { combineReducers } from 'redux'
import { combineDelegators } from 'redux-observable'
import { Observable } from 'rxjs'

import buildRecordsTree from 'utils/tree'

import recordReducer from './records'

import * as recordActions from '../actions'
import * as storageActions from 'utils/storage.js'


import {
  REQUEST_RECORDS,
  RECEIVE_RECORDS,
} from 'containers/App/constants'


const fetchRecordsManager = (action$, store) => (
  action$.ofType(REQUEST_RECORDS)
    .switchMap(action => {
      return Observable.of(storageActions.get())
        .flatMap(x => {
          if (x.error) {
            return recordActions.storageError(x)
          }

          return buildRecordsTree(x.data)
            .map(({ records, branches }) => ({
              type: RECEIVE_RECORDS,
              payload : {
                records,
                branches,
                data: x.data,
                loading: false
              }
            }))
        })
      })
)

export const rootReducer = recordReducer

export const rootManager = combineDelegators(
  fetchRecordsManager,
)
