import * as Types from 'constants'

const navigationReducer = (state=false, action) => {
  switch (action.type) {

    case Types.LOCATION_WILL_CHANGE:
      return !!action.payload.id

    default:
      return state
  }
}

const currentRecordReducer = (state=false, action) => {
  switch (action.type) {

    case Types.CURRENT_RECORD:
      return action.payload.record

    default:
      return state
  }
}

export default {
  notRoot: navigationReducer,
  target: currentRecordReducer,
}