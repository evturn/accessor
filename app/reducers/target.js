import {
  SWITCH_LAYOUT,
  CHANGE_TARGET,
  REMOVE_RECORD,
} from 'containers/App/constants'

const target = (state=false, action) => {
  switch(action.type) {
    case SWITCH_LAYOUT:
      return false

    case CHANGE_TARGET:
      return action.target

    case REMOVE_RECORD:
      return action.data
        .filter(x => x.id === action.record.parent)[0] || false

    default:
      return state
  }
}

export default target

export const getCurrentTarget = state => {
 return !state.target ? false : state.byId[state.target]
}

export const getComputedStyles = (state, ownProps) => {

  return function computeStyles(expand, css) {
    const current = state.target.id === ownProps.id
    const parent = state.target.id === ownProps.parent
    const root = state.target === false && ownProps.parent === false
    const children = ownProps.children

    return {
      derived: { current, parent, root, children, expand, },
      classes: {
        expand: current || expand && parent || expand && root
          ? `${css.more} ${css.open}` : css.shut,
        nested: current && children
          ? `${css.open} ${css.nest}` : '',
        title: root || parent
          ? `${css.title} ${css.open}` : current
            ? `${css.title} ${css.open} ${css.main}` : css.shut,
      }
    }
  }
}
