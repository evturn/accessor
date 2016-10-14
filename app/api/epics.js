import { API } from 'api'
import { Observable as Observe$ } from 'rxjs/Observable'
import { combineEpics } from 'redux-observable'
import * as Types from 'api/constants'
import * as Actions from 'api/actions'

const epics = [

  function init(action$) {
    return action$.ofType(Types.INIT)
      .switchMapTo(Observe$.create(API.init))
      .delay(400)
      .map(Actions.initAuth)
  },

  function initAuth(action$) {
    return action$.ofType(Types.INIT_AUTH)
      .pluck('payload', 'user')
      .map(x => x ? Actions.authorize() : Actions.unauthorize())
  },

  function listenForChanges(action$) {
    return action$.ofType(Types.AUTHORIZE)
      .switchMapTo(Observe$.create(API.onceValue))
      .map(x => !!x.val())
      .map(x => x ? Actions.loadUser() : Actions.createUser())
  },

  function loadUser(action$) {
    return action$.ofType(Types.LOAD_USER)
      .map(API.rootRef)
      .switchMapTo(Observe$.create(API.onValue))
      .map(Actions.assembleData)
  },

  function assembleData(action$) {
    return action$.ofType(Types.ASSEMBLE_DATA)
      .pluck('payload', 'data')
      .switchMap(x => Observe$.of(x)
        .map(x => ({ _data: x, _items: withDependents(withChildren(x))}))
        .map(x => ({ _data: x._data, _items: getChildrenRecurse(x._items)}))
        .map(x => ({
          _data: x._data,
          _items: x._items,
          byId: x._data.reduce((acc, item) => {
            acc[item.id] = item
            return acc
          }, {}),
        }))
      )
      .map(Actions.assembled)
  },

  function providerSignIn(action$) {
    return action$.ofType(Types.PROVIDER_SIGN_IN)
      .pluck('payload', 'provider')
      .switchMap(x => Observe$.fromPromise(API.providerSignIn(x)))
      .map(x => !!x)
      .map(Actions.initAuth)
      .catch(Actions.loginError)
  },

  function providerSignOut(action$) {
    return action$.ofType(Types.PROVIDER_SIGN_OUT)
      .mergeMap(API.providerSignOut)
      .map(Actions.unauthorize)
      .catch(Actions.logoutError)
  },

  function createUser(action$) {
    return action$.ofType(Types.CREATE_USER)
      .map(Actions.updateSuccess)
  },

  function createRecord(action$, store) {
    return action$.ofType(Types.CREATE_RECORD)
      .pluck('payload', 'data')
      .map(x => ({data: x, ref: API.rootRef()}))
      .switchMap(({ data, ref }) => Observe$.of(ref.push().key)
        .map(key => ref.update({[key]: {...data, id: key, url: `/records/${key}`}}))
        .map(Actions.createSuccess)
      )
  },

  function updateItem(action$) {
    return action$.ofType(Types.UPDATE_ITEM)
      .pluck('payload', 'item')
      .switchMap(item => Observe$.of(item)
        .map(x => x.children.length ? x.children.map(x => x.id) : x.children)
        .map(children => ({...item, children}))
      )
      .map(item => API.ref(`records/${API.currentUser().id}/${item.index}`).update(item))
      .map(Actions.updateSuccess)
  },

  function deleteData(action$) {
    return action$.ofType(Types.DELETE_DATA)
      .pluck('payload', 'ids')
      .mergeMap(ids => ids.map(API.remove))
      .map(Actions.deleteSuccess)
  },

  function closeModal(action$) {
    return action$.ofType(Types.CLOSE_MODAL)
      .delay(400)
      .map(Actions.unmountModal)
  },

]

function withChildren(items) {
  return items.reduce((acc, x) => {
    x.children = items
      .filter(y => y.parent === x.id)
      .map(x => x.id)
    acc.push(x)
    return acc
  }, [])
}

function withDependents(items) {
  function getChildId(id, acc) {
    const item = items.filter(x => x.id === id)[0]
    if (item && item.children) {
      item.children.map(x => {
        acc.push(x)
        getChildId(x, acc)
      })
    }
    acc.push(id)
    return acc
  }

  return items.map(x => {
    return {
      ...x,
      dependents: getChildId(x.id, [])
    }
  })
}

function getChildrenRecurse(items) {

  function getChildren(item) {
    const children = items.filter(x => x.parent === item.id)
    item.children = children.length ? children.map(getChildren) : []
    return item
  }

  return items.reduce((acc, x) => {
    if (!x.parent) {
      acc.push(getChildren(x))
      return acc
    }
    return acc
  }, [])
}

export default combineEpics(...epics)