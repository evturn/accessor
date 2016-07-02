import * as Rx from 'rxjs'

export default function buildRecordsTree(data) {
  return Rx.Observable.of(data)
    .flatMap(list => {
      return Rx.Observable.combineLatest(
        nestAllChildrenRecurse(list),
        mapRecordsToOwnParents(list)
      )
    })
    .map(([ records, branches ]) => ({ records, branches }))
}

function nestAllChildrenRecurse(list) {
  return Rx.Observable.from(list)
    .reduce((acc, x) => {

      function assignChildrenToParent(item) {
        const items = list.filter(x => x.parent === item.id)

        if (items.length) {
          items.map(assignChildrenToParent)
        }

        return items.length
          ? { ...item, _children: items }
          : { ...item }
      }

      if (!x.parent) {
        acc = acc.concat([assignChildrenToParent(x)])
      }

      return acc
    }, [])
}

function mapRecordsToOwnParents(list) {
  return Rx.Observable.from(list)
    .reduce((acc, x) => {

      function getOwnAncestorIds(acc, item) {
        if (item.parent) {
          list
            .filter(x => x.id === item.parent)
            .map(x => getOwnAncestorIds(acc, x))
        }

        acc.push(item.id)
        return acc
      }

      acc[x.id] = getOwnAncestorIds([], x)

      return acc
    }, {})
}
