import * as Rx from 'rxjs'
import buildRecordsTree from 'utils/tree'
import { v4 } from 'node-uuid'

import * as recordActions from 'containers/App/actions'
import * as storageActions from 'utils/storage.js'

const loadInitialState = _ => (
  (actions, store) => {
    store.dispatch(_ => recordActions.loadFromStorage())

  return storageActions.get({
      error: recordActions.storageError,
      success: x => store.dispatch(_ => recordActions.getStateFromStorage(x))
    })
    .flatMap(buildRecordsTree)
    .flatMap(recordActions.populateRecords)
  }
)

const changeTarget = id => (
  (actions, store) => (
    Rx.Observable.of(store.getState().data)
      .map(x => ({ target: !id ? false : x.filter(y => y.id === id)[0] }))
      .flatMap(recordActions.changeTarget)
  )
)

const navigateToRoot = target => (
  (actions, store) => (
    Rx.Observable.of(target)
      .filter(target => target !== false)
      .flatMap(recordActions.navigateToRoot)
  )
)

const createRecord = record => (
  (actions, store) => {
    return Rx.Observable.of(store.getState().data)
      .map(prevData => {
        return [{
          ...record,
          id: v4(),
        }].concat(prevData)
      })
      .flatMap(x => {
        return storageActions.set({
          data: x,
          success: x => store.dispatch(_ => recordActions.setStateFromStorage(x))
        })
      })
      .flatMap(buildRecordsTree)
      .flatMap(recordActions.createRecord)
  }
)

const updateRecord = record => (
  (actions, store) => {
    return Rx.Observable.of(store.getState().data)
      .flatMap(prevData => {
        return Rx.Observable.from(prevData)
          .reduce((acc, x) => {
            if (x.id === record.id) {
              acc = acc.concat([{ ...record }])
              return acc
            }

            return acc.concat([x])

          }, [])
      })
      .flatMap(x => {
        return storageActions.set({
          data: x,
          success: x => store.dispatch(_ => recordActions.setStateFromStorage(x))
        })
      })
      .flatMap(buildRecordsTree)
      .flatMap(recordActions.updateRecord)
  }
)

const selectCardView = _ => (
  (actions, store) => recordActions.selectCardView()
)

const selectTreeView = _ => (
  (actions, store) => recordActions.selectTreeView()
)

const removeRecord = record => (
  (actions, store) => {
    return Rx.Observable.of(store.getState().data)
      .flatMap(list => {
        return Rx.Observable.from(list)
          .reduce((acc, x) => {
            if (!store.getState().branches[x.id].includes(record.id)) {
              acc.push(x)
              return acc
            }

          return acc
        }, [])
      })
      .flatMap(x => {
        return storageActions.set({
          data: x,
          success: x => store.dispatch(_ => recordActions.setStateFromStorage(x))
        })
      })
      .flatMap(buildRecordsTree)
      .flatMap(x => {
        return recordActions.removeRecord({
          ...x,
          target: store.getState().data.filter(x => x.id === record.parent)[0] || false,
        })
      })

  }
)

export {
  loadInitialState,
  changeTarget,
  createRecord,
  updateRecord,
  navigateToRoot,
  selectCardView,
  selectTreeView,
  removeRecord,
}
