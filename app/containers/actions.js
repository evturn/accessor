import * as Rx from 'rxjs'
import buildRecordsTree from 'utils/tree'

import * as recordActions from 'containers/App/actions'
import * as storageActions from 'utils/storage.js'

const loadInitialState = _ => (
  (actions, store) => {
    store.dispatch(_ => recordActions.loadFromStorage())

  return Rx.Observable.of(storageActions.get())
    .map(response => {
      if (response.error) {
        return recordActions.storageError(response)
      } else {
        store.dispatch(_ => recordActions.getStateFromStorage(response))
      }

      return response.data
    })
    .flatMap(buildRecordsTree)
    .flatMap(recordActions.populateRecords)
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
      .flatMap(recordActions.targetChange)
  }
)

const goHome = target => (
  (actions, store) => (
    Rx.Observable.of(target)
      .flatMap(target => (
        !target
          ? Rx.Observable.empty()
          : recordActions.navigateToRoot({ target: false })
      ))
  )
)

const setNextState = nextData => dispatch => {
  return Rx.Observable.of(storageActions.set(nextData))
  .map(x => {
    dispatch(_ => recordActions.setStateFromStorage(x))

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
      .flatMap(x => setNextState(x)(store.dispatch))
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
