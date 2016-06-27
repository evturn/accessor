export const GET_ITEM = '@@storage/GET_ITEM'
export const SET_ITEM = '@@storage/SET_ITEM'
export const STORAGE_ERROR = '@@storage/STORAGE_ERROR'

const initialState = {
  data: false,
  status: false,
}

export const storageReducer = (state=initialState, action) => {
  switch (action.type) {
    case GET_ITEM:
    case SET_ITEM:
    case STORAGE_ERROR:
      return Object.assign({}, state, {
        data: action.data,
        status: action.status,
      })

    default:
      return state
  }
}
