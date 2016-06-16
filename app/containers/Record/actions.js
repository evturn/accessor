import * as Rx from 'rxjs'
import request from 'utils/request'

import {
  LOAD_RECORDS,
  LOAD_RECORDS_SUCCESS,
  LOAD_RECORDS_ERROR,
  SET_RECORD_ACTIVE,
  SET_BRANCH_ACTIVE,
} from './constants'


const getRecords = _ => (
  (actions, store) => {
    store.dispatch(
      actions => Rx.Observable.of({ type: LOAD_RECORDS })
    )

  return Rx.Observable.fromPromise(request('/api'))
    .flatMap(records => {
      const records$ = Rx.Observable.from(records)

      const assignChildren = x => {
        if (x._children) {
          x._children = records
            .filter(y => y.parent === x.id)
            .map(kid => {
              assignChildren(kid)
              return kid
            })
        }

        return x
      }

      return records$
        .filter(x => !x.parent)
        .reduce((acc, x) => {
          acc.push(assignChildren(x))
          return acc
        }, [])
        .map(x => ({ records: x, flatRecords: records }))
    })
    .flatMap(({ records, flatRecords }) => {
      return Rx.Observable.of({
        type: LOAD_RECORDS_SUCCESS,
        records,
        flatRecords,
      })
    })
})


const setRecordActive = id => (
  (actions, store) => {
    store.dispatch(_ => Rx.Observable.of({type: SET_RECORD_ACTIVE, active: id}))
    const records$ = Rx.Observable.from(store.getState().global.flatRecords)

    return records$
      .filter(x => x.id === id)
      .map(active => {
        const arr = []

        const recurseGetParent = id => {
          const parent = store.getState().global.flatRecords
            .filter(x => x.id === id)[0]

          if (parent.parent) {
            recurseGetParent(parent.parent)
          }

          if (id) {
            arr.push(id)
          }
        }

        recurseGetParent(active.parent)

        return arr
      })
      .flatMap(x => Rx.Observable.of({type: SET_BRANCH_ACTIVE, branch: x}))

  }
)

export {
  getRecords,
  recordsLoaded,
  recordsLoadingError,
  setRecordActive,
}
