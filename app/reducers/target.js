import {
  STORAGE_ERROR,
  REQUEST_RECORDS,
  RECEIVE_RECORDS,
  SWITCH_LAYOUT,
  CHANGE_TARGET,
  REMOVE_RECORD,
} from 'containers/App/constants'

const loading = (state=false, action) => {
  switch (action.type) {
    case REQUEST_RECORDS:
      return true

    case STORAGE_ERROR:
    case RECEIVE_RECORDS:
      return false

    default:
      return state
  }
}

const cardView = (state=true, action) => {
  switch (action.type) {
    case SWITCH_LAYOUT:
      return action.cardView

    default:
      return state
  }
}

const treeView = (state=false, action) => {
  switch (action.type) {
    case SWITCH_LAYOUT:
      return action.treeView

    default:
      return state
  }
}

const target = (state=false, action) => {
  switch(action.type) {
    case SWITCH_LAYOUT:
      return false

    case CHANGE_TARGET:
      return action.id

    case REMOVE_RECORD:
      return state.data
        .filter(x => x.id === action.record.parent)[0] || false

    default:
      return state
  }
}

export {
  treeView,
  cardView,
  target,
  loading
}

export const selectTarget = state => state.target

export const selectView = state => ({
  cardView: state.cardView,
  treeView: state.treeView,
})
