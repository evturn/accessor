import { combineReducers } from 'redux'

import {
  CREATE_RECORD,
  UPDATE_RECORD,
  REMOVE_RECORD,
  SET_STATE_FROM_STORAGE,
} from 'containers/App/constants'

const initialState = {
  data: false,
  error: false,
  message: false,
}

const records = (state=[], action) => {
  switch(action.type) {
    case RECEIVE_RECORDS:

      function assignChildrenToParent(item) {
        const items = action.data
          .filter(x => x.parent === item.id)

        return items.length
          ? { ...item, _children: items.map(assignChildrenToParent) }
          : { ...item }
      }

      return action.data
        .reduce((acc, x) => {
          if (!x.parent) {
            acc.push(assignChildrenToParent(x))

            return acc
          }

          return acc
        }, [])

    default:
      return state
  }
}

export default records
