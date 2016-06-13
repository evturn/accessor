import { createSelector } from 'reselect'

const selectHome = () => (state) => state.get('home')

const selectUsername = () => createSelector(
  selectHome(),
  (homeState) => homeState.get('username')
)

const selectFeatured = _ => state => state.get('featured')

const selectCollection = _ => (
  createSelector(
    selectFeatured(),
    featuredState => featuredState.get('records')
  )
)

export {
  selectFeatured,
  selectCollection,
  selectHome,
  selectUsername,
}
