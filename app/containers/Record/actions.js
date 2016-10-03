import * as Types from '../../constants'

export const locationChange = id => ({
  type: Types.LOCATION_CHANGE,
  payload: { id }
})

export const currentRecord = record => ({
  type: Types.CURRENT_RECORD,
  payload: { record }
})

export const createRecord = record => ({
  type: Types.CREATE_RECORD,
  payload: { record }
})

export const updateRecord = record => ({
  type: Types.UPDATE_RECORD,
  payload: { record }
})

export const removeRecord = record => ({
  type: Types.REMOVE_RECORD,
  payload: { record }
})