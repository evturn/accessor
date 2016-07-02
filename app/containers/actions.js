import * as Rx from 'rxjs'
import buildRecordsTree from 'utils/tree'

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

const createRecord = ({ parent, record }) => (
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

const updateRecord = ({ record, title }) => (
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

export {
  loadInitialState,
  changeTarget,
  createRecord,
  updateRecord,
  navigateToRoot,
  selectCardView,
  selectTreeView,
}
