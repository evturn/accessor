import {
  LOAD_RECORDS_SUCCESS,
  LOAD_RECORDS,
  LOAD_RECORDS_ERROR,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
} from './constants'
import { fromJS } from 'immutable'

const initialState = fromJS({
  loading: false,
  error: false,
  records: false,
  currentUser: false,
  userData: fromJS({
    repositories: false,
  })
})

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_RECORDS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('records', false)

    case LOAD_RECORDS_SUCCESS:
      return state
        .set('loading', false)
        .set('records', action.records)

    case LOAD_RECORDS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false)

    case LOAD_REPOS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'repositories'], false)
    case LOAD_REPOS_SUCCESS:
      return state
        .setIn(['userData', 'repositories'], action.repos)
        .set('loading', false)
        .set('currentUser', action.username)
    case LOAD_REPOS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false)

    default:
      return state
  }
}

export default homeReducer
