import { createSelector } from 'reselect'

const selectGlobal = _ => state => state.get('global')

const selectRecords = _ => (
  createSelector(
    selectGlobal(),
    globalState => globalState.get('records')
  )
)

const selectOhFuck = e => (
  `¡Shit! 😱 ${e && e.message ? e.message : e} 😱 ¡Shit!`
)

const selectTippyTop = (prevProps, props) => {
  if (!prevProps || !props) {
    return true
  }

  if (prevProps.location.pathname !== props.location.pathname) {
    return [0, 0]
  }

  return true
}

const selectCurrentUser = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('currentUser')
)

const selectLoading = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('loading')
)

const selectError = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('Error')
)

const selectRepos = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['userData', 'repositories'])
)

const selectLocationState = () => {
  let prevRoutingState

  return state => {
    const routingState = state.route // or state.route

    if (!routingState === prevRoutingState) {
      prevRoutingState = routingState

    }

    return prevRoutingState
  }
}

export {
  selectGlobal,
  selectCurrentUser,
  selectLoading,
  selectError,
  selectRepos,
  selectLocationState,
  selectTippyTop,
  selectOhFuck,
  selectRecords,
}
