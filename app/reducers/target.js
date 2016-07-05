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

export const getComputedStyles = (state, ownProps) => {
  const isTarget = state.target.id === ownProps.id
  const parentIsTarget = state.target.id === ownProps.parent
  const atRoot = state.target === false && ownProps.parent === false
  const hasChildren = ownProps.children

  return (isExpanded, css) => {
    return {
      derived: {
        current: isTarget,
        parent: parentIsTarget,
        root: atRoot,
        children: hasChildren,
        expand: isExpanded
      },
      classes: {
        expand: isTarget || isExpanded && parentIsTarget || isExpanded && atRoot
          ? `${css.more} ${css.open}`
          : css.shut,

        nested: isTarget && hasChildren
          ? `${css.open} ${css.nest}`
          : '',

        title: atRoot || parentIsTarget
          ? `${css.title} ${css.open}`
          : isTarget
            ? `${css.title} ${css.open} ${css.main}`
            : css.shut,
      }
    }
  }
}
