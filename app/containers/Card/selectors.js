export function selectLayout(state) {
  return {
    card: !state.card,
    tree: !state.tree,
  }
}

export function selectRecordsAsTree(state) {
  const data = state.data

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