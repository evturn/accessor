import { v4 } from 'node-uuid'

import {
  RECEIVE_RECORDS,
  SET_STATE_FROM_STORAGE,
} from 'containers/App/constants'

const records = (state=false, action) => {
  switch(action.type) {
    case SET_STATE_FROM_STORAGE:
    case RECEIVE_RECORDS:
      return nestRecords(action.data)

    default:
      return state
  }
}

function nestRecords(data) {

  function assignChildrenToParent(item) {
    const items = data
        .filter(x => x.parent === item.id)

      return items.length
        ? { ...item, _children: items.map(assignChildrenToParent) }
        : { ...item }
  }

  return data
    .reduce((acc, x) => {
      if (!x.parent) {
        acc.push(assignChildrenToParent(x))

        return acc
      }

      return acc
    }, [])
}

export { records, nestRecords }
