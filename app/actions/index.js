import * as Rx from 'rxjs'

import {
  SWITCH_LAYOUT,
  CHANGE_TARGET,
  SET_STATE_FROM_STORAGE,
  STORAGE_ERROR,
  REQUEST_RECORDS,
  RECEIVE_RECORDS,
  CREATE_RECORD,
  UPDATE_RECORD,
  REMOVE_RECORD,
} from 'containers/App/constants'

const requestRecords = _ => ({ type: REQUEST_RECORDS })

const receiveRecords = ({ data, error, message }) => (
  Rx.Observable.of({
    type: RECEIVE_RECORDS,
    data,
    error,
    message,
  })
)

const storageError = ({ error, message }) => (
  Rx.Observable.of({
    type: STORAGE_ERROR,
    error,
    message,
  })
)

const navigateBackwards = id => (action, store) => {
  return Rx.Observable.of({
    type: CHANGE_TARGET,
    id: !id ? false : store.getState().byId[id]
  })
}

const changeTarget = id => (action, store) => {
  return Rx.Observable.of({
    type: CHANGE_TARGET,
    id: !id ? false : store.getState().byId[id]
  })
}

const navigateToRoot = target => (action, store) => {
  if (target === false) {
    return Rx.Observable.empty()
  }

  return Rx.Observable.of({
    type: CHANGE_TARGET,
    id: false,
  })
}

const selectTreeView = _ => ({
  type: SWITCH_LAYOUT,
  cardView: false,
  treeView: true,
})

const selectCardView = _ => ({
  type: SWITCH_LAYOUT,
  cardView: true,
  treeView: false,
})

const setStateFromStorage = ({ data, error, message }) => (
  Rx.Observable.of({
    type: SET_STATE_FROM_STORAGE,
    data,
    error,
    message,
  })
)

const createRecord = record => ({
  type: CREATE_RECORD,
  record,
})

const updateRecord = record => ({
  type: UPDATE_RECORD,
  record
})

const removeRecord = record => ({
  type: REMOVE_RECORD,
  record,
})

export {
  requestRecords,
  receiveRecords,
  storageError,
  setStateFromStorage,
  changeTarget,
  navigateToRoot,
  createRecord,
  updateRecord,
  selectTreeView,
  selectCardView,
  removeRecord,
  navigateBackwards,
}
