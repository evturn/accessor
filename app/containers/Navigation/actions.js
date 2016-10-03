import * as Types from '../../constants'

export const fetchAll = _ => ({
  type: Types.FETCH_ALL
})

export const fetchSuccess = data => ({
  type: Types.FETCH_SUCCESS,
  payload: data
})

export const fetchError = e => ({
  type: Types.FETCH_ERROR,
  payload: { error: e.message }
})

export const updateSuccess = data => ({
  type: Types.UPDATE_SUCCESS,
  payload: data
})