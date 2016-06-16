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
    .map(records => {
      const recs = records.filter(x => !x.parent)
        .map(x => ({ ...x, _children: records.filter(filterKids(x))}))
        .map(x => ({ ...x, _children: setKids(x) }))
        .reduce(reduceToMap, [])

      return {
        records: recs,
        flatRecords: records,
      }
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
