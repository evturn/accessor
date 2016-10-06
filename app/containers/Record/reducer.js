import * as Types from 'constants'

function locationReducer(state=false, action) {
  switch (action.type) {

    case Types.LOCATION_CHANGE:
      return !!action.payload.id

    default:
      return state
  }
}

function currentRecordReducer(state=false, action) {
  switch (action.type) {

    case Types.CURRENT_RECORD:
      return action.payload.record

    default:
      return state
  }
}

export default {
  notRoot: locationReducer,
  target: currentRecordReducer,
}