import * as Rx from 'rxjs'

export default function buildRecordsTree(data) {
  return Rx.Observable.of(data)
    .flatMap(list => {
      return Rx.Observable.combineLatest(
        Rx.Observable.from(list)
          .reduce((acc, x) => {

            function nest(item) {
              const items = list.filter(x => x.parent === item.id)

              if (items.length) {
                items.map(nest)
              }

              return items.length
                ? { ...item, _children: items }
                : { ...item }
            }

            if (!x.parent) {
              acc = acc.concat([nest(x)])
            }

            return acc
          }, []),

        Rx.Observable.from(list)
          .reduce((acc, x) => {

            function branch(acc, item) {
              if (item.parent) {
                list
                  .filter(x => x.id === item.parent)
                  .map(x => branch(acc, x))
              }

              acc.push(item.id)
              return acc
            }

            acc[x.id] = branch([], x)

            return acc

          }, {})
      )
    })
    .map(([ records, branches ]) => ({ records, branches }))
}
