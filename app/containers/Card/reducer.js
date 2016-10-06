import { selectRecordsAsTree, selectRecordsById, selectRecordsByBranches } from './selectors'
import * as Types from 'constants'

const initialData = { items: [], records: [], byId: {}, branches: {} }
const dataReducer = (state=initialData, action) => {
  switch (action.type) {

    case Types.LOAD_RECORDS_SUCCESS:
    case Types.UPDATE_SUCCESS:
      const { data } = action.payload

      return Object.assign({}, state, {
        items: data,
        records: selectRecordsAsTree(data),
        byId: selectRecordsById(data),
        branches: selectRecordsByBranches(data),
      })

    default:
      return state
  }
}

const initialLayout= { card: true, tree: false }
const layoutReducer = (state=initialLayout, action) => {
  switch(action.type) {

    case Types.CHANGE_LAYOUT:
      return { card: !state.card, tree: !state.tree }

    default:
      return state
  }
}

export default {
  data: dataReducer,
  layout: layoutReducer,
}