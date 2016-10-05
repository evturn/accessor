import * as Types from '../../constants'
export { locationChange, createRecord } from 'containers/Record/actions'
export const changeLayout = layout => ({
  type: Types.CHANGE_LAYOUT
})

export const logout = _ => ({
  type: Types.LOGOUT
})