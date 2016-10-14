import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

export const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBZ8bmsRvWKN8QcV4Al6cVux_b7BmCAoUg',
  authDomain: 'accessor-io.firebaseapp.com',
  databaseURL: 'https://accessor-io.firebaseio.com',
  storageBucket: "accessor-io.appspot.com",
  messagingSenderId: "149184924674",
})

export const API = {
  init(observer) {
    const unsubscribe = firebase.auth().onAuthStateChanged(
      x => {
        unsubscribe()
        observer.next(!!x)
      },
      e => observer.error(e)
    )
  },

  onceValue(observer) {
    firebase.database()
      .ref(`records`)
      .child(firebase.auth().currentUser.uid)
      .once('value')
      .then(x => observer.next(x))
  },

  onValue(observer) {
    firebase.database()
      .ref(`records`)
      .child(firebase.auth().currentUser.uid)
      .on('value', x => {
        const byId = x.val()
        const _items = populateChildrenRecurse(withChildren(convertMapToList(byId)))
        observer.next({ _items, byId })
      })
  },

  update(item) {
    return firebase.database()
      .ref(`records`)
      .child(`${firebase.auth().currentUser.uid}/${item.id}`)
      .update({...item, children: item.children.map(x => x.id)})
  },

  currentUser() {
    const user = firebase.auth().currentUser
    return !!user
      ? {...user.providerData[0], id: user.uid, records: `records/${user.uid}`}
      : false
  },

  remove(id) {
    const user = firebase.auth().currentUser
    return firebase.database()
      .ref(`records/${user.uid}`)
      .child(id)
      .remove()
  },

  ref(x) {
    return firebase.database().ref(x)
  },

  rootRef() {
    const key = firebase.auth().currentUser.uid
    return firebase.database().ref(`records/${key}`)
  },

  providerSignIn(provider) {
    const services = {
      twitter: new firebase.auth.TwitterAuthProvider(),
      github: new firebase.auth.GithubAuthProvider(),
    }
    return firebase.auth().signInWithPopup(services[provider])
  },

  providerSignOut() {
    return firebase.auth().signOut()
  },
}

function convertMapToList(obj) {
  return Object.keys(obj).reduce((acc, x) => acc.concat(obj[x]), [])
}

function withChildren(items) {
  return items.reduce((acc, x) => {
    x.children = items
      .filter(y => y.parent === x.id)
      .map(x => x.id)
    return acc.concat(x)
  }, [])
  .reduce((acc, x) => acc.concat({...x, dependents: getChildIds([], x.id)}), [])

  function getChildIds(acc, id) {
    items
      .filter(x => x.id === id)
      .filter(x => x.children)
      .map(x => x.children)
      .reduce(getChildIds, acc)
    return acc.concat(id)
  }
}

function populateChildrenRecurse(items) {
  return items.reduce((acc, x) => !x.parent ? acc.concat(getChildren(x)) : acc, [])

  function getChildren(item) {
    const children = items.filter(x => x.parent === item.id)
    item.children = children.length ? children.map(getChildren) : []
    return item
  }
}