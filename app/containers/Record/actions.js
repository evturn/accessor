import * as Rx from 'rxjs'

import {
  LOAD_RECORDS,
  LOAD_RECORDS_SUCCESS,
  LOAD_RECORDS_ERROR,
  SELECT_RECORD,
  NAVIGATE_TO_ROOT,
  RECORD_HAS_CHANGED,
  RECORD_HAS_UPDATES,
  SELECT_CARD_VIEW,
  SELECT_TREE_VIEW,
  SUBSCRIBE_STORAGE,
} from './constants'
import {
  GET_ITEM,
  storageActions
} from 'utils/storage'

const getRecords = _ => (
  (actions, store) => {
    store.dispatch(_ =>
      Rx.Observable.of(storageActions.get())
    )

    return Rx.Observable.of(actions.ofType(GET_ITEM))
      .mapTo({
        type: LOAD_RECORDS_SUCCESS,
        ...store.getState().storage
      })
      .startWith({ type: LOAD_RECORDS })
  }
)

const recordSelected = id => (
  (actions, store) => {
    return Rx.Observable.combineLatest(
      Rx.Observable.of(store.getState().global.flatRecords),
      Rx.Observable.of(store.getState().global.branches)
    )
    .map(([flatRecords, branches]) => ({
      type: SELECT_RECORD,
      target: !id ? false : flatRecords.filter(x => x.id === id)[0],
    }))
  }
)

const navigateToRoot = target => (
  (actions, store) => (
    target
      ? Rx.Observable.of({
          type: NAVIGATE_TO_ROOT,
          target: false,
        })
      : Rx.Observable.empty()
  )
)

const recordHasChanged = ({ parent, record }) => (
  (actions, store) => {

    function addNewRecord(flatRecords) {
      return [{
        id: flatRecords.length + 1,
        title: record.title,
        more: record.more,
        parent: parent.id,
      }].concat(flatRecords)
    }


    return Rx.Observable.of(store.getState().global.flatRecords)
      .map(x => x.map(({ _children, ...rest }) => ({ ...rest })))
      .map(addNewRecord)
      .flatMap(buildRecordsTree)
      .flatMap(({ records, branches, flatRecords }) => {

        store.dispatch(
          _ => Rx.Observable.of(storageActions.set({ records, branches, flatRecords }))
        )

        return Rx.Observable.of({
          type: RECORD_HAS_CHANGED,
          records,
          branches,
          flatRecords,
        })
      })
  }
)

const recordHasUpdates = ({ record, title }) => (
  (actions, store) => {

    function updateRecord(flatRecords) {
      return flatRecords.map(y => {
        return y.id === record.id
          ? { ...y, title }
          : y
      })
    }

    return Rx.Observable.of(store.getState().global.flatRecords)
      .map(x => x.map(({ _children, ...rest }) => ({ ...rest })))
      .map(updateRecord)
      .flatMap(buildRecordsTree)
      .flatMap(({ records, branches, flatRecords }) => {

        store.dispatch(
          _ => Rx.Observable.of(storageActions.set({ records, branches, flatRecords }))
        )

        return Rx.Observable.of({
          type: RECORD_HAS_UPDATES,
          records,
          branches,
          flatRecords,
        })
      })
  }
)

const selectCardView = _ => (
  (actions, store) => (
    Rx.Observable.of({ type: SELECT_CARD_VIEW })
  )
)

const selectTreeView = _ => (
  (actions, store) => (
    Rx.Observable.of({ type: SELECT_TREE_VIEW })
  )
)

function buildRecordsTree(data) {

  function createBranch(record) {
    function addParentID(record, branch) {
      if (record.parent) {
        data
          .filter(x => x.id === record.parent)
          .map(x => addParentID(x, branch))
      }

      branch.push(record.id)
      return branch
    }

    return addParentID(record, [])
  }

  function createChildren(record) {
    function addChildren(record, children) {
      if (children.length) {
        record._children = children
        children.map(createChildren)
      }

      return record
    }

    return addChildren(record, data.filter(x => x.parent === record.id))
  }

  function recordReducer(acc, x) {
    if (!acc.branches) acc.branches = {}
    if (!acc.records) acc.records = []
    if (!x.parent) acc.records.push(createChildren(x))

    acc.branches[x.id] = createBranch(x)

    return acc
  }

  return Rx.Observable.from(data)
    .reduce(recordReducer, {})
    .map(({ records, branches }) => ({
      records,
      branches,
      flatRecords: data
    }))
}

export {
  getRecords,
  recordSelected,
  navigateToRoot,
  recordHasChanged,
  recordHasUpdates,
  selectCardView,
  selectTreeView,
}
