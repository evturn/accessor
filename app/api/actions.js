export const authenticating = payload => {
  return {type: 'AUTHENTICATING', payload}
}

export const authChange = payload => {
  return {type: 'AUTH_CHANGE', payload}
}

export const authError = payload => {
  return {type: 'AUTH_ERROR', payload}
}

export const styleUpdate = payload => {
  return {type: 'STYLE_UPDATE', payload}
}

export const locationChange = payload => {
  return {type: 'LOCATION_CHANGE', payload}
}

export const selectDashboardOption = option => {
  return {type: 'SELECT_DASHBOARD_OPTION', payload: { option }}
}