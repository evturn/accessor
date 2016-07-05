import { v4 } from 'node-uuid'

import {
  RECEIVE_RECORDS,
  CREATE_RECORD,
  UPDATE_RECORD,
  REMOVE_RECORD,
} from 'containers/App/constants'

const data = (state=false, action) => {
  switch(action.type) {
    case CREATE_RECORD:
      return [{ ...action.record, id: v4(), }]
        .concat(action.data)

    case UPDATE_RECORD:
      return action.data
        .reduce((acc, x) => {
          if (x.id === action.record.id) {
            acc = acc.concat([{ ...action.record }])
            return acc
          }

          return acc.concat([x])
        }, [])

    case REMOVE_RECORD:
      return action.data
        .reduce((acc, x) => {
          if (!action.branches[x.id].includes(action.record.id)) {
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

export { data }
