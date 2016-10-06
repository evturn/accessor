import { Observable } from 'rxjs'
import { combineEpics } from 'redux-observable'
import * as Types from 'constants'
import * as Actions from 'actions'
import { selectCurrentRecord } from './selectors'

function locationChange($action, store) {
  return $action.ofType(Types.LOCATION_CHANGE)
    .map(action => {
      const record = selectCurrentRecord(store.getState(), action.payload.id)
      return Actions.currentRecord(record)
    })
}

export default combineEpics(locationChange)