import * as Rx from 'rxjs'
import request from 'utils/request'

import {
  LOAD_RECORDS,
  LOAD_RECORDS_SUCCESS,
  LOAD_RECORDS_ERROR,
  UPDATE_ACTIVE_BRANCH,
  MOVE_RECORD,
} from './constants'

const assembleRecords = flatRecords => {
  const flatRecords$ = Rx.Observable.from(flatRecords)

  const assignChildren = x => {
    if (x._children) {
      x._children = flatRecords
        .filter(y => y.parent === x.id)
        .map(kid => {
          assignChildren(kid)
          return kid
        })
    }

    return x
  }

  return flatRecords$
    .filter(x => !x.parent)
    .reduce((acc, x) => {
      acc.push(assignChildren(x))
      return acc
    }, [])
    .map(x => ({ records: x, flatRecords }))
}

const getRecords = _ => (
  (actions, store) => {
    store.dispatch(
      actions => Rx.Observable.of({ type: LOAD_RECORDS })
    )

  return Rx.Observable.fromPromise(request('/api'))
    .flatMap(assembleRecords)
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

const moveRecord = ({ targetID, parentID }) => (
  (actions, store) => {
    const flatRecords$ = Rx.Observable.from(store.getState().global.flatRecords)

    const getMutualParent = (target, parent) => {
      return parent.parent
        ? flatRecords$
          .filter(x => x.id === parent.parent)
          .map(mutualParent => ({
            target,
            parent,
            mutualParent
          }))
        : Rx.Observable.of({
            target,
            parent
          })
    }

    const assignTargetToMutualParent = ({ target, mutualParent }) => {
      if (mutualParent) {
        return [{
          ...mutualParent,
          _children: mutualParent._children.push(target.id)
        },{
          ...target,
          parent: mutualParent.id
        }]
      } else {
        return [{
          ...target,
          parent: false
        }]
      }
    }

    const targets$ = flatRecords$
      .filter(x => x.id === parentID)
      .flatMap(parent => {
        return flatRecords$
          .filter(x => x.id === targetID)
          .flatMap(target => getMutualParent(target, parent))
      })

  return targets$
    .flatMap(({ target, parent, mutualParent }) => {
      const newSources = assignTargetToMutualParent({ target, parent, mutualParent })
        .concat(([{
          ...parent,
          _children: parent._children
            .filter(x => x !== target.id)
            .map(x => x.id)
        }]))

      return flatRecords$
        .filter(x => {
          return newSources.filter(source => x.id === source.id)[0]
            ? false
            : true
        })
        .reduce((acc, x) => {
          acc.push(x)
          return acc
        }, newSources)

    })
    .flatMap(assembleRecords)
    .flatMap(({ records, flatRecords }) => {
      return Rx.Observable.of({
        type: MOVE_RECORD,
        records,
        flatRecords,
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
