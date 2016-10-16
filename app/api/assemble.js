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
    this.getBranchIds = ::this.getBranchIds
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

  getBranchIds() {
    this.nodeIds = []
    if (this.children) {
      this.traverseDF(x => this.nodeIds.push(x.value.id))
    }
    return this.nodeIds.concat(this.id)
  }

  unwrap() {
    return {
      ...this.value,
      branch: this.getBranchIds(),
      children: this.children ? this.children.map(x => x.unwrap()) : [],
    }
  }
}

function assembleData(data) {
  const list = Object.keys(data).reduce(convertMapToList(data), [])
  const nodes = list.map(x => getOwnChildren(list, x))
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