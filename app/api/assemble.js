class Tree {
  constructor(props) {
    this.value = {
      back: props.back,
      title: props.title,
      url: props.url,
      id: props.id,
      parent: props.parent,
    }
    this.id = props.id
    this.parent = props.parent
    this.branchIds = props.branchIds
    this.addChild = ::this.addChild
    this.traverseDF = ::this.traverseDF
    this.unwrap = ::this.unwrap
  }

  addChild(value) {
    if (!this.children) {
      this.children = []
    }
    const recurse = child => {
      const tree = new Tree(child)
      this.children.push(tree)
      if (tree.children) {
        tree.children.map(x => tree.addChild(x))
      }
    }
    recurse(value)
  }


  traverseDF(cb) {
    function recurse(currentNode) {
      if (currentNode.children) {
        currentNode.children.map(x => x.traverseDF(cb))
      }
      cb(currentNode)
    }
    recurse(this)
  }

  unwrap() {
    return {
      ...this.value,
      branchIds: this.branchIds,
      children: this.children ? this.children.map(x => x.unwrap()) : [],
    }
  }
}

function assembleData(data) {
  const list = Object.keys(data).reduce(convertMapToList(data), [])
  const nodes = list
    .map(x => getOwnBranchIds(list, x))
    .map(x => getOwnChildren(list, x))
  const subtrees = nodes.filter(x => !x.parent)
  const hashmap = nodes.reduce(mapById, {})
  return {
    list,
    nodes,
    hashmap,
    subtrees,
  }
}

function convertMapToList(data) {
  return (acc, x) => acc.concat(data[x])
}

function getOwnBranchIds(list, item) {
  const finder = (id, arr) => {
    arr.push(id)
    const found = list.filter(x => x.parent === id)
    if (found.length) {
      found.map(x => finder(x.id, arr))
    }
    return arr
  }
  return {...item, branchIds: finder(item.id, [])}
}

function getOwnChildren(list, item) {
  const tree = new Tree(item)
  list
    .filter(y => y.parent === tree.id)
    .map(x => tree.addChild(x))
  return tree
}

function mapById(acc, x) {
  acc[x.id] = x
  return acc
}

export default assembleData

