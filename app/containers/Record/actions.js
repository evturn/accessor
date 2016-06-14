import * as Rx from 'rxjs'

import {
  LOAD_RECORDS,
  LOAD_RECORDS_SUCCESS,
  LOAD_RECORDS_ERROR,
  SET_RECORD_ACTIVE,
} from './constants'


export function loadRecords() {
  return {
    type: LOAD_RECORDS,
  }
}

export function recordsLoaded(records) {
  return {
    type: LOAD_RECORDS_SUCCESS,
    records,
  }
}

export function recordsLoadingError(error) {
  return {
    type: LOAD_RECORDS_ERROR,
    error,
  }
}


const setRecordActive = id => (
  Rx.Observable.of({ id })
    .map(id => ({ type: SET_RECORD_ACTIVE, id }))
)

export {
  setRecordActive
}