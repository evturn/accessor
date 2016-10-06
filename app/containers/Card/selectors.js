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