import {
  CHANGE_USERNAME,
} from './constants'
import { fromJS } from 'immutable'

const initialState = fromJS({
  username: '',
})

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USERNAME:
      return state
        .set('username', action.name.replace(/@/gi, ''))
    default:
      return state
  }
}

export default homeReducer
