export function selectDataAsList(xs) {
  return Object.keys(xs).reduce((acc, x) => {
    const record = xs[x]
    if (!record.id) {
      record.id = x
    }
    acc.push(record)
    return acc
  }, [])
}

export function selectRecordsAsTree(data) {

  function assignChildrenToParent(record) {
    const children = data.filter(x => x.parent === record.id)
    if (children.length) {
      record._children = children.map(assignChildrenToParent)
    }
    return record
  }

  return data.reduce((acc, x) => {
    if (!x.parent) {
      acc.push(assignChildrenToParent(x))
      return acc
    }
    return acc
  }, [])
}

export function selectRecordsById(data) {
  return data.reduce((acc, x) => {
    acc[x.id] = x
    return acc
  }, {})
}

export function selectRecordsByBranches(data) {
  function getOwnAncestorIds(acc, item) {
    if (item.parent) {
      data
        .filter(x => x.id === item.parent)
        .map(x => getOwnAncestorIds(acc, x))
    }

    acc.push(item.id)
    return acc
  }

  return data.reduce((acc, x) => {
    acc[x.id] = getOwnAncestorIds([], x)
    return acc
  }, {})
}

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