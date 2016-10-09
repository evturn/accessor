export default map => {
  const items = Object.keys(map).reduce((acc, key) => {
    acc.push({ ...map[key], id: key})
    return acc
  }, [])

  return {
    items,
    branches: getParentRecurse(),
    records: getChildrenRecurse(),
    byId: getById(),
  }

  function getChildrenRecurse() {
    return items.reduce((acc, x) => {
      if (!x.parent) {
        acc.push(getChildren(x))
        return acc
      }
      return acc
    }, [])
  }

  function getChildren(item) {
    const children = items.filter(x => x.parent === item.id)
    item.records = children.length ? children.map(getChildren) : []
    return item
  }

  function getParentRecurse() {
    return items.reduce((acc, x) => {
      acc[x.id] = getParent([x], x)
      return acc
    }, {})
  }

  function getParent(acc, item) {
    if (item.parent) {
      const parent = items.filter(x => x.id === item.parent)[0]
      acc.push(parent)
      getParent(acc, parent)
    }
    return acc
  }

  function getById() {
    return items.reduce((acc, item) => {
      acc[item.id] = {
        ...item,
        records: items.filter(x => x.parent === item.id),
        parent: items.filter(x => x.parent && x.id === item.parent)[0] || false,
      }
      return acc
    }, {})
  }
}






