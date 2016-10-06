export const selectCurrentRecord = (state, id) => {
 return !id ? false : state.byId[id]
}

export const selectComputedStyles = (state, ownProps) => {
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

export function getTasks(state) {
  return state.tasks
}

export function getTaskList(state) {
  return getTasks(state).list
}

export function getTaskFilter(state) {
  return getTasks(state).filter
}

export function getDeletedTask(state) {
  return getTasks(state).deleted
}