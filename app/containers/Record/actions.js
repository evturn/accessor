import * as Rx from 'rxjs'
import buildRecordsTree from 'utils/tree'
import seedStorage from 'utils/seed'

import {
  GET_ITEM,
  storageActions
} from 'utils/storage'

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
  SEED_STORAGE,
  SEED,
} from './constants'

const loadInitialState = _ => (
  Rx.Observable.of(storageActions.get())
)

const loadingRecords = _ => (
  Rx.Observable.of({ type: LOAD_RECORDS })
)

const seedRecords = _ => dispatch => (
  seedStorage(x => Rx.Observable.of({ type: SEED_STORAGE, ...x }))
)

const getRecords = _ => (
  (actions, store) => {
    store.dispatch(loadingRecords)

    SEED
      ? store.dispatch(seedRecords())
      : null

    store.dispatch(loadInitialState)

    return Rx.Observable.of(actions.ofType(GET_ITEM))
      .mapTo(store.getState().storage.data)
      .map(buildRecordsTree)
      .flatMap(({ flatRecords, records, branches }) => {
        return Rx.Observable.of({
          type: LOAD_RECORDS_SUCCESS,
          flatRecords,
          records,
          branches,
          status: store.getState().storage.status,
        })
      })
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
      .map(buildRecordsTree)
      .flatMap(({ records, branches, flatRecords }) => {

        store.dispatch(
          _ => Rx.Observable.of(storageActions.set(flatRecords))
        )

        return Rx.Observable.of({
          type: RECORD_HAS_CHANGED,
          records, branches, flatRecords,
          status: store.getState().storage.status
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
      .map(buildRecordsTree)
      .flatMap(({ records, branches, flatRecords }) => {

        store.dispatch(
          _ => Rx.Observable.of(storageActions.set(flatRecords))
        )

        return Rx.Observable.of({
          type: RECORD_HAS_UPDATES,
          records, branches, flatRecords,
          status: store.getState().storage.status
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



export {
  getRecords,
  recordSelected,
  navigateToRoot,
  recordHasChanged,
  recordHasUpdates,
  selectCardView,
  selectTreeView,
}
