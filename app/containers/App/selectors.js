export function getAuth(state) {
  return state.auth
}

export function isAuthenticated(state) {
  return getAuth(state).authenticated
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