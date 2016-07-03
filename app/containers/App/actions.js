import * as Rx from 'rxjs'

import {
  NAVIGATE_TO_ROOT,
  SELECT_CARD_VIEW,
  SELECT_TREE_VIEW,
  LOAD_FROM_STORAGE,
  GET_STATE_FROM_STORAGE,
  SET_STATE_FROM_STORAGE,
  STORAGE_ERROR,
  POPULATE_RECORDS,
  CHANGE_TARGET,
  CREATE_RECORD,
  UPDATE_RECORD,
  REMOVE_RECORD,
} from 'containers/App/constants'

const getStateFromStorage = payload => (
  Rx.Observable.of({ type: GET_STATE_FROM_STORAGE, payload })
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

const loadFromStorage = _ => (
  Rx.Observable.of({ type: LOAD_FROM_STORAGE })
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
  getStateFromStorage,
  storageError,
  setStateFromStorage,
  setStateFromStorage,
  populateRecords,
  loadFromStorage,
  changeTarget,
  navigateToRoot,
  createRecord,
  updateRecord,
  selectTreeView,
  selectCardView,
  removeRecord,
}
