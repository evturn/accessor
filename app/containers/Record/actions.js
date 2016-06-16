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

const setKids = ({ _children }) => (
  _children.length
    ? _children.reduce(reduceToMap, [])
    : false
)


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
          const rec = assignChildren(x)
          acc.push(rec)
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



const getParent = record => (
  records$.filter(x => x.id === record.parent)
)



const setRecordActive = id => (
  (actions, store) => {
    store.dispatch(_ => Rx.Observable.of({type: SET_RECORD_ACTIVE, active: id}))
    const records$ = Rx.Observable.from(store.getState().global.flatRecords)

    const recurseGetParent = id => {
      if (id) {
        records$
          .filter(x => x.id === id)
          .map(x => recurseGetParent(x.parent))

        return id
      }

      return false
    }

    return records$
      .filter(x => x.id === id)
      .reduce((acc, x) => {
        if (x.parent) {
          const id = recurseGetParent(x.parent)
          if (id) {
            return acc.concat(id)
          }
        }
      }, [])
      .flatMap(x => Rx.Observable.of({type: SET_BRANCH_ACTIVE, branch: x}))

  }
)

export {
  getRecords,
  recordsLoaded,
  recordsLoadingError,
  setRecordActive,
}
