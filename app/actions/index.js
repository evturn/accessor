import * as Rx from 'rxjs'

import {
  NAVIGATE_TO_ROOT,
  SELECT_CARD_VIEW,
  SELECT_TREE_VIEW,
  SET_STATE_FROM_STORAGE,
  STORAGE_ERROR,
  POPULATE_RECORDS,
  CHANGE_TARGET,
  REQUEST_RECORDS,
  RECEIVE_RECORDS,
  CREATE_RECORD,
  UPDATE_RECORD,
  REMOVE_RECORD,
} from 'containers/App/constants'

const requestRecords = _ => (
  { type: REQUEST_RECORDS }
)

const receiveRecords = payload => (
  Rx.Observable.of({ type: RECEIVE_RECORDS, payload })
)

const storageError = payload => (
  Rx.Observable.of({ type: STORAGE_ERROR, payload })
)

const setStateFromStorage = payload => (
  Rx.Observable.of({ type: SET_STATE_FROM_STORAGE, payload })
)

const populateRecords = payload => (
  Rx.Observable.of({ type: POPULATE_RECORDS, payload })
)

const changeTarget = payload => (
  Rx.Observable.of({ type: CHANGE_TARGET, payload })
)

const navigateToRoot = payload => (
  Rx.Observable.of({ type: NAVIGATE_TO_ROOT, payload })
)

const createRecord = payload => (
  Rx.Observable.of({ type: CREATE_RECORD, payload })
)

const updateRecord = payload => (
  Rx.Observable.of({ type: UPDATE_RECORD, payload })
)

const selectTreeView = _ => (
  Rx.Observable.of({ type: SELECT_TREE_VIEW })
)

const selectCardView = _ => (
  Rx.Observable.of({ type: SELECT_CARD_VIEW })
)

const removeRecord = payload => (
  Rx.Observable.of({ type: REMOVE_RECORD, payload })
)

export {
  requestRecords,
  receiveRecords,
  storageError,
  setStateFromStorage,
  populateRecords,
  changeTarget,
  navigateToRoot,
  createRecord,
  updateRecord,
  selectTreeView,
  selectCardView,
  removeRecord,
}
