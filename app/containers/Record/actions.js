import * as Rx from 'rxjs'
import request from 'utils/request'

import {
  LOAD_RECORDS,
  LOAD_RECORDS_SUCCESS,
  LOAD_RECORDS_ERROR,
  UPDATE_ACTIVE_BRANCH,
  MOVE_RECORD,
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
    const flatRecords = store.getState().global.flatRecords

    const getNextActiveID = id => (
      Rx.Observable.of(store.getState().global.active)
        .map(active => {
          if (id === active) {
            return flatRecords
              .filter(x => x.id === id)
              .map(x => x.parent)[0]
          }

          return id
        })
    )

    const getParentByParentID = id => (
      flatRecords
        .filter(x => x.id === id)[0]
    )

    const getParentRecursive = (acc, active) => {
      const recurseGetParent = id => {
        const parent = getParentByParentID(id)

        if (parent && parent.parent) {
          recurseGetParent(parent.parent)
        }

        if (id) {
          acc.push(id)
        }
      }

      recurseGetParent(active.parent)
      return acc
    }

    return Rx.Observable.of(id)
      .flatMap(getNextActiveID)
      .flatMap(id => {
        return !id
          ? Rx.Observable.of({ active: false, branch: [] })
          : Rx.Observable.from(store.getState().global.flatRecords)
              .filter(x => x.id === id)
              .reduce(getParentRecursive, [])
              .map(branch => ({ active: id, branch }))
      })
      .flatMap(({ active, branch }) => (
        Rx.Observable.of({
          type: UPDATE_ACTIVE_BRANCH,
          active,
          branch
        })
      ))
  }
)

const moveRecord = id => (
  (actions, store) => {
    const flatRecords$ = Rx.Observable.from(store.getState().global.flatRecords)

    const source$ = flatRecords$
      .filter(x => x.id === id)

    return source$
      .flatMap(source => {
        return flatRecords$
          .filter(x => x.id === source.parent)
          .map(target => ({
            source,
            target
          }))
      })
      .flatMap(({ source, target }) => {
        return Rx.Observable.of({
          type: MOVE_RECORD,
          source,
          target,
        })
      })

  }
)

export {
  getRecords,
  recordsLoaded,
  recordsLoadingError,
  setRecordActive,
  moveRecord,
}
