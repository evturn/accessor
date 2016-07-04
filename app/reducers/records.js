import { v4 } from 'node-uuid'

import {
  RECEIVE_RECORDS,
  CREATE_RECORD,
  UPDATE_RECORD,
  REMOVE_RECORD,
  SET_STATE_FROM_STORAGE,
} from 'containers/App/constants'


const data = (state=false, action) => {
  switch(action.type) {
    case CREATE_RECORD:
      return [{ ...action.record, id: v4(), }]
        .concat(state.data)

    case UPDATE_RECORD:
      return state.data
        .reduce((acc, x) => {
          if (x.id === action.record.id) {
            acc = acc.concat([{ ...action.record }])
            return acc
          }

          return acc.concat([x])
        }, [])

    case REMOVE_RECORD:
      return state.data
        .reduce((acc, x) => {
          if (!state.branches[x.id].includes(action.record.id)) {
            acc.push(x)
            return acc
          }

        return acc
      }, [])

    case RECEIVE_RECORDS:
      return action.data

    default:
      return state
  }
}

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

export { records, data }
