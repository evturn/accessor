export default function buildRecordsTree(data) {
  function createBranch(record) {
    function addParentID(record, branch) {
      if (record.parent) {
        data
          .filter(x => x.id === record.parent)
          .map(x => addParentID(x, branch))
      }

      branch.push(record.id)
      return branch
    }

    return addParentID(record, [])
  }

  function createChildren(record) {
    function addChildren(record, children) {
      if (children.length) {
        record._children = children
        children.map(createChildren)
      }

      return record
    }

    return addChildren(record, data.filter(x => x.parent === record.id))
  }

  function recordReducer(acc, x) {
    if (!acc.branches) acc.branches = {}
    if (!acc.records) acc.records = []
    if (!x.parent) acc.records.push(createChildren(x))

    acc.branches[x.id] = createBranch(x)

    return acc
  }

  const { records, branches } = data.reduce(recordReducer, {})

  return {
    records,
    branches,
    flatRecords: data
  }
}