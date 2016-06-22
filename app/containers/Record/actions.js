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
  NAVIGATE_TO_ROOT,
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

const recordSelected = id => (
  (actions, store) => {
    return Rx.Observable.combineLatest(
      Rx.Observable.of(store.getState().global.flatRecords),
      Rx.Observable.of(store.getState().global.branches)
    )
    .map(([flatRecords, branches]) => ({
      type: SELECT_RECORD,
      selected: branches[id],
      target: !id ? false : flatRecords.filter(x => x.id === id)[0],
    }))
  }
)

const navigateToRoot = target => (
  (actions, store) => {
    return target
      ? Rx.Observable.of({
          type: NAVIGATE_TO_ROOT,
          target: false,
        })
      : Rx.Observable.empty()
  }
)

function buildRecordsTree(data) {

  function createBranch(record) {
    function addParentID(record, branch) {
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

  function createChildren(record) {
    function addChildren(record, children) {
      if (children.length) {
        record._children = children
        children.map(createChildren)
      }

      return record
    }

    return addChildren(record, data.filter(x => x.parent === record.id))
  }

  function recordReducer(acc, x) {
    if (!acc.branches) acc.branches = {}
    if (!acc.records) acc.records = []
    if (!x.parent) acc.records.push(createChildren(x))

    acc.branches[x.id] = createBranch(x)

    return acc
  }

  function updateRecordsState({ records, branches }) {
    return Rx.Observable.of({
        type: LOAD_RECORDS_SUCCESS,
        records,
        branches,
        flatRecords: data
      })
    }

  return Rx.Observable.from(data)
    .reduce(recordReducer, {})
    .flatMap(updateRecordsState)
}

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
  navigateToRoot,
}
