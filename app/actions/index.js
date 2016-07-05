import * as Rx from 'rxjs'

import {
  SWITCH_LAYOUT,
  CHANGE_TARGET,
  SAVE_RECORD,
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
    target: !id ? false : store.getState().byId[id]
  })
}

const changeTarget = id => (action, store) => {
  return Rx.Observable.of({
    type: CHANGE_TARGET,
    target: !id ? false : store.getState().byId[id]
  })
}

const navigateToRoot = target => (action, store) => {
  if (target === false) {
    return Rx.Observable.empty()
  }

  return Rx.Observable.of({
    type: CHANGE_TARGET,
    target: false,
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

const saveRecord = ({ data, error, message }) => {
  return Rx.Observable.of({
    type: SAVE_RECORD,
    error,
    message,
    data,
  })
}

const createRecord = record => (action, store) => {
  return Rx.Observable.of({
    type: CREATE_RECORD,
    record,
    data: store.getState().data
  })
}

const updateRecord = record => (action, store) => {
  return Rx.Observable.of({
    type: UPDATE_RECORD,
    record,
    data: store.getState().data
  })
}

const removeRecord = record => (action, store) => {
  return Rx.Observable.of({
    type: REMOVE_RECORD,
    record,
    data: store.getState().data,
    branches: store.getState().branches,
  })
}

export {
  requestRecords,
  receiveRecords,
  storageError,
  changeTarget,
  navigateToRoot,
  createRecord,
  updateRecord,
  removeRecord,
  saveRecord,
  selectTreeView,
  selectCardView,
  navigateBackwards,
}
