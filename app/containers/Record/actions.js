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
    .flatMap(assembleRecords)
    .flatMap(({ records, flatRecords }) => {
      return createMap(flatRecords)
        .map(recordMap => ({
          records,
          flatRecords,
          recordMap
        }))
    })
    .flatMap(({ records, flatRecords, recordMap }) => {
      return Rx.Observable.of({
        type: LOAD_RECORDS_SUCCESS,
        records,
        flatRecords,
        recordMap
      })
    })
})


const setRecordActive = id => (
  (actions, store) => {
    const flatRecords = store.getState().global.flatRecords

    function getNextActiveID(id) {
      return Rx.Observable.of(store.getState().global.active)
        .map(active => {
          if (id === active) {
            return flatRecords
              .filter(x => x.id === id)
              .map(x => x.parent)[0]
          }

          return id
        })
    }

    function getParentRecursive(acc, active) {
      function recurseGetParent(id) {
        const parent = flatRecords
          .filter(x => x.id === id)[0]

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

    function popTargetFromParentChildren(parent) {
      return {
      ...parent,
      _children: parent._children
        .filter(x => x !== targetID)
        .map(x => x.id)
      }
    }

    function getMutualParent(target, parent) {
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

    function assignTargetToMutualParent({ target, mutualParent }) {
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

    function assembleFlatRecords(targets) {
      return flatRecords$
        .filter(x => {
          return targets.filter(y => x.id === y.id)[0]
            ? false
            : true
        })
        .reduce((acc, x) => acc.concat([x]), targets)
    }

    return flatRecords$
      .filter(x => x.id === parentID)
      .map(popTargetFromParentChildren)
      .flatMap(parent => {
        return flatRecords$
          .filter(x => x.id === targetID)
          .flatMap(target => getMutualParent(target, parent))
      })
      .map(assignTargetToMutualParent)
      .flatMap(assembleFlatRecords)
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

function createMap(flatRecords) {
  return Rx.Observable.from(flatRecords)
    .reduce((acc, x) => {

      function assignChildren(x) {
        const kids = flatRecords
          .filter(y => y.parent === x.id)

        if (kids.length) {
          kids.map(assignChildren)

          x._children = kids.reduce((acc, x) => {
            acc[x.id] = x
            return acc
          }, {})
        } else {
          x._children = false
        }

        return x

      }

    if (!x.parent && !acc[x.id]) {
      acc[x.id] = assignChildren(x)
    }

    return acc
  }, {})
}

function assembleRecords(flatRecords) {
  const flatRecords$ = Rx.Observable.from(flatRecords)

  function assignChildren(x) {
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

export {
  getRecords,
  recordsLoaded,
  recordsLoadingError,
  setRecordActive,
  moveRecord,
}
