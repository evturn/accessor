import * as Rx from 'rxjs'
import buildRecordsTree from 'utils/tree'
import storageActions from 'utils/storage.js'

import {
  NAVIGATE_TO_ROOT,
  SELECT_CARD_VIEW,
  SELECT_TREE_VIEW,
  LOAD_FROM_STORAGE,
  GET_STATE_FROM_STORAGE,
  SET_STATE_FROM_STORAGE,
  STORAGE_ERROR,
  POPULATE_RECORDS,
  TARGET_CHANGE,
  CREATE_RECORD,
  UPDATE_RECORD,
} from 'containers/constants'

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

const targetChange = payload => (
  Rx.Observable.of({ type: TARGET_CHANGE, payload })
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

const loadInitialState = _ => (
  (actions, store) => {
    store.dispatch(_ => loadFromStorage())

  return Rx.Observable.of(storageActions.get())
    .map(response => {
      if (response.error) {
        return storageError(response)
      } else {
        store.dispatch(_ => getStateFromStorage(response))
      }

      return response.data
    })
    .flatMap(buildRecordsTree)
    .flatMap(populateRecords)
  }
)

const recordSelected = id => (
  (actions, store) => {
    return Rx.Observable.of(store.getState().data)
      .map(x => ({
        target: !id
          ? false
          : x.filter(y => y.id === id)[0]
      }))
      .flatMap(targetChange)
  }
)

const goHome = target => (
  (actions, store) => (
    Rx.Observable.of(target)
      .flatMap(target => (
        !target
          ? Rx.Observable.empty()
          : navigateToRoot({ target: false })
      ))
  )
)

const setNextState = nextData => dispatch => {
  return Rx.Observable.of(storageActions.set(nextData))
  .map(x => {
    dispatch(_ => setStateFromStorage(x))

    return x.data
  })
}

const recordCreated = ({ parent, record }) => (
  (actions, store) => {
    return Rx.Observable.of(store.getState().data)
      .map(prevData => {
        return [{
          id: prevData.length + 1,
          title: record.title,
          more: record.more,
          parent: parent.id,
        }].concat(prevData)
      })
      .flatMap(x => setNextState(x)(store.dispatch))
      .flatMap(buildRecordsTree)
      .flatMap(createRecord)
  }
)

const recordUpdated = ({ record, title }) => (
  (actions, store) => {
    return Rx.Observable.of(store.getState().data)
      .flatMap(prevData => {
        return Rx.Observable.from(prevData)
          .reduce((acc, x) => {
            if (x.id === record.id) {
              acc = acc.concat([{ ...x, title }])
              return acc
            }

            return acc.concat([x])

          }, [])
      })
      .flatMap(x => setNextState(x)(store.dispatch))
      .flatMap(buildRecordsTree)
      .flatMap(updateRecord)
  }
)

const selectCardView = _ => (
  (actions, store) => (
    Rx.Observable.of({ type: SELECT_CARD_VIEW })
  )
)

const selectTreeView = _ => (
  (actions, store) => (
    Rx.Observable.of({
      type: SELECT_TREE_VIEW,
      target: false,
    })
  )
)



export {
  loadInitialState,
  recordSelected,
  goHome,
  recordCreated,
  recordUpdated,
  selectCardView,
  selectTreeView,
}
