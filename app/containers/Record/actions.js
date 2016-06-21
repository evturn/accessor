import * as Rx from 'rxjs'
import request from 'utils/request'

import {
  LOAD_RECORDS,
  LOAD_RECORDS_SUCCESS,
  LOAD_RECORDS_ERROR,
  UPDATE_ACTIVE_BRANCH,
  MOVE_RECORD,
  SELECT_RECORD,
  LAST_TARGET,
} from './constants'

const getRecords = _ => (
  (actions, store) => {
    store.dispatch(
      _ => Rx.Observable.of({ type: LOAD_RECORDS })
    )

    return Rx.Observable.fromPromise(request('/api'))
      .flatMap(buildRecordsTree)
  }
)

function buildRecordsTree(data) {
  const { createBranch, createChildren } = recordTree(data)

  const recordReducer = (acc, x) => {
    if (!acc.branches) acc.branches = {}
    if (!acc.records) acc.records = []
    if (!x.parent) acc.records.push(createChildren(x))

    acc.branches[x.id] = createBranch(x)

    return acc
  }

  return Rx.Observable.from(data)
    .reduce(recordReducer, {})
    .flatMap(({ records, branches }) => (
      Rx.Observable.of({
        type: LOAD_RECORDS_SUCCESS,
        records,
        branches,
        flatRecords: data
      })
    ))
}

function recordTree(data) {

  const createBranch = record => {
    const addParentID = (record, branch) => {
      if (record.parent) {
        data
          .filter(x => x.id === record.parent)
          .map(x => addParentID(x, branch))
      }

      branch.push(record.id)
      return branch
    }

    return addParentID(record, [])
  }

  const createChildren = record => {
    const addChildren = (record, children) => {
      if (children.length) {
        record._children = children
        children.map(createChildren)
      }

      return record
    }

    return addChildren(record, data.filter(x => x.parent === record.id))
  }

  return { createBranch, createChildren }
}

const recordSelected = id => (
  (actions, store) => {
    return Rx.Observable.of(store.getState().global.branches)
      .map(x => ({
        type: SELECT_RECORD,
        selected: x[id],
        target: id,
      }))
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

export {
  getRecords,
  recordSelected,
  recordsLoaded,
  recordsLoadingError,
  setRecordActive,
  moveRecord,
}
