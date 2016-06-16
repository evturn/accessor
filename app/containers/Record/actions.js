import * as Rx from 'rxjs'
import request from 'utils/request'

import {
  LOAD_RECORDS,
  LOAD_RECORDS_SUCCESS,
  LOAD_RECORDS_ERROR,
  SET_RECORD_ACTIVE,
  SET_BRANCH_ACTIVE,
} from './constants'


const reduceToMap = (acc, x) => (
  acc = acc.concat(x)
)

const filterKids = x => (
  x2 => x2.parent === x.id
)

const setKids = ({ children }) => (
  children.length
    ? children.reduce(reduceToMap, [])
    : false
)

const getRecords = _ => (
  (actions, store) => {
    store.dispatch(
      actions => Rx.Observable.of({ type: LOAD_RECORDS })
    )

  return Rx.Observable.fromPromise(request('/api'))
    .map(records => {
      return records.filter(x => !x.parent)
        .map(x => ({ ...x, children: records.filter(filterKids(x))}))
        .map(x => ({ ...x, children: setKids(x) }))
        .reduce(reduceToMap, [])
    })
    .flatMap(records => {
      return Rx.Observable.of({
        type: LOAD_RECORDS_SUCCESS,
        records,
      })
    })
})

const setRecordActive = (e, id) => (
  (actions, store) => {
    e.stopPropagation()
    const records$ = Rx.Observable.from(store.getState().global.records)

    const active$ = records$
      .filter(x => x.id === id)

    const branch$ = active$
      .flatMap(active => {
        return records$.reduce((acc, x, i, arr) => {
          if (i === 0) {
            acc.push(active)
          } else {
            if (x.parent) {
              const parent = arr.filter(rec => rec.id === x.parent)
              acc.concat(parent)
            }
          }
          return acc

        }, [])
      })


    return Rx.Observable
    .combineLatest(
      active$,
      branch$
    )
    .flatMap(([ active, branch]) => {
      return Rx.Observable.merge(
        Rx.Observable.of({ type: SET_RECORD_ACTIVE, active: active.id }),
        Rx.Observable.of({ type: SET_BRANCH_ACTIVE, branch })
      )
    })
  }
)

export {
  getRecords,
  recordsLoaded,
  recordsLoadingError,
  setRecordActive,
}