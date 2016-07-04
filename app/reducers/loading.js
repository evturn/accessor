import {
  REQUEST_RECORDS,
  RECEIVE_RECORDS,
  STORAGE_ERROR,
} from 'containers/App/constants'


const loadingReducer = (state, action) => {
  switch(action.type) {
    case REQUEST_RECORDS:
      return true

    case STORAGE_ERROR:
    case RECEIVE_RECORDS:
      return false

    default:
      return state
  }
}

export default loadingReducer

export const selectLoading = state => state.loading

/*

const mapStateToProps = state => ({
  loading: selectLoading(state)
})

*/
