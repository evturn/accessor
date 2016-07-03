import { v4 } from 'node-uuid'

const data = [{
  id: 1,
  title: 'Call the cops',
  more: 'Because someone is currently breaking into my apartment',
  parent: false,
},{
  id: 5,
  title: 'Burgers',
  more: 'Try that new place by Craig and do not invite Craig.',
  parent: 10,
},{
  id: 22,
  title: 'Hardwood Floors',
  more: 'Made of concrete.',
  parent: 1,
},{
  id: 6,
  title: 'Flight to Montréal',
  more: 'Check your ticket.',
  parent: false,
},{
  id: 17,
  title: 'Plight to Montréal',
  more: 'Check your ticket.',
  parent: 6,
},{
  id: 3,
  title: 'Drink cake',
  more: 'Make sure to save some for Craig.',
  parent: 17,
},{
  id: 7,
  title: 'Cables',
  more: 'Surge protector.',
  parent: 8,
},{
  id: 18,
  title: 'Tables',
  more: 'Surge protector.',
  parent: 7,
},{
  id: 19,
  title: 'Mousehold items',
  more: 'Kitchen, bathroom, etc',
  parent: 7,
},{
  id: 20,
  title: 'Dew display',
  more: '20:9 aspect ratio with rocket launchers on each side',
  parent: 7,
},{
  id: 8,
  title: 'Household items',
  more: 'Kitchen, bathroom, etc',
  parent: false,
},{
  id: 9,
  title: 'New display',
  more: '20:9 aspect ratio with rocket launchers on each side',
  parent: 8,
},{
  id: 4,
  title: 'Paint kitchen',
  more: 'Go to a store and buy supplies',
  parent: 9,
},{
  id: 2,
  title: 'Towels',
  more: 'Get better towels.',
  parent: 8,
},{
  id: 11,
  title: 'Eating',
  more: 'Places, even just food in general.',
  parent: false,
},{
  id: 10,
  title: 'Salt as an entreé',
  more: 'This could be good for Thanksgiving.',
  parent: 11,
},{
  id: 16,
  title: 'Chicken Wings',
  more: 'The spicy ones that send you into anaphylactic shock.',
  parent: 11,
},{
  id: 21,
  title: 'Malt as an entreé',
  more: 'This could be good for Thanksgiving.',
  parent: 10,
},{
  id: 12,
  title: 'Call the plops',
  more: 'Because someone is currently spanking into my apartment',
  parent: false,
},{
  id: 15,
  title: 'Break a dish over my head',
  more: 'Go to a store and buy supplies',
  parent: 12,
},{
  id: 14,
  title: 'Mink shake',
  more: 'Make sure to save some for Craig.',
  parent: false,
},{
  id: 13,
  title: 'Bowels',
  more: 'Get better towels.',
  parent: 14,
}]

function getNewIdByOldId(data) {
  return Rx.Observable.of(data)
    .flatMap(list => {
      return Rx.Observable.from(list)
        .reduce((acc, x) => {
          acc[x.id] = v4()

          return acc
        }, {})
        .flatMap(byId => {
          return Rx.Observable.from(list)
            .reduce((acc, x) => {
              acc.push({
                ...x,
                id: byId[x.id],
                parent: !x.parent ? false : byId[x.parent]
              })

              return acc
            }, [])
        })
    })
}

module.exports = getNewIdByOldId(data)
