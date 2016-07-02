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

const recordSelected = id => (
  (actions, store) => (
    Rx.Observable.of(store.getState().data)
      .map(x => ({ target: !id ? false : x.filter(y => y.id === id)[0] }))
      .flatMap(recordActions.targetChange)
  )
)

const goHome = target => (
  (actions, store) => (
    Rx.Observable.of(target)
      .flatMap(target => {
        if (!target) {
          return Rx.Observable.empty()
        }

        return Rx.Observable.of({ target: false })
      })
      .flatMap(recordActions.navigateToRoot)
  )
)

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
  recordSelected,
  goHome,
  recordCreated,
  recordUpdated,
  selectCardView,
  selectTreeView,
}
