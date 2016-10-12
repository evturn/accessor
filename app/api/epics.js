import { API } from 'api'
import { Observable as Observe$ } from 'rxjs/Observable'
import { combineEpics } from 'redux-observable'
import * as Types from 'api/constants'
import * as Actions from 'api/actions'

const epics = [

  function init(action$) {
    return action$.ofType(Types.INIT)
      .switchMapTo(Observe$.create(API.init))
      .map(Actions.initAuth)
  },

  function initAuth(action$) {
    return action$.ofType(Types.INIT_AUTH)
      .pluck('payload', 'user')
      .switchMap(user => !!user ? Observe$.of(user) : Observe$.empty())
      .pluck('uid')
      .map(id => ({ user: { id } }))
      .map(Actions.authStateChange)
  },

  function providerSignIn(action$) {
    return action$.ofType(Types.PROVIDER_SIGN_IN)
      .pluck('payload', 'provider')
      .mergeMap(API.providerSignIn)
      .pluck('user')
      .map(Actions.initAuth)
      .catch(Actions.loginError)
  },

  function providerSignOut(action$) {
    return action$.ofType(Types.PROVIDER_SIGN_OUT)
      .mergeMap(API.providerSignOut)
      .map(Actions.unauthorize)
      .catch(Actions.logoutError)
  },

  function listenForChanges(action$) {
    return action$.ofType(Types.AUTH_STATE_CHANGE)
      .switchMapTo(Observe$.create(API.onceValue))
      .map(x => !!x.val())
      .map(x => x ? Actions.loadUser() : Actions.createUser())
  },

  function loadUser(action$) {
    return action$.ofType(Types.LOAD_USER)
      .map(API.rootRef)
      .switchMapTo(Observe$.create(API.onValue))
      .map(x => x.val())
      .map(Actions.assembleData)
  },

  function createUser(action$) {
    return action$.ofType(Types.CREATE_USER)
      .map(Actions.updateSuccess)
  },

  function assembleData(action$) {
    return action$.ofType(Types.ASSEMBLE_DATA)
      .pluck('payload', 'data')
      .switchMap(x => Observe$.of(x)
        .map(mapDataToList)
        .map(x => ({
          items: getChildrenRecurse(x).map(getDependentsRecurse),
          branches: getParentRecurse(x),
          byId: getById(x),
        }))
      )
      .map(Actions.updateSuccess)
  },

  function createRecord(action$) {
    return action$.ofType(Types.CREATE_RECORD)
      .pluck('payload', 'data')
      .map(x => ({data: x, ref: API.rootRef()}))
      .switchMap(({ data, ref }) => Observe$.of(ref.push().key)
        .map(key => ref.update({[key]: {...data, id: key, url: `records/${key}`}}))
        .map(Actions.OK200)
      )
  },

  function removeRecord(action$) {
    return action$.ofType(Types.REMOVE_RECORD)
      .pluck('payload')
      .map(x => API.ref(`records/${x.child}`).child(x.id).remove())
      .map(Actions.OK200)
  }

]


function mapDataToList(x) {
  return Object.keys(x).reduce((acc, key) => {
    acc.push({ ...x[key], id: key})
    return acc
  }, [])
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

function getDependentsRecurse(item) {

  function getChildId(item, acc) {
    if (item.children.length) {
      item.children.map(x => getChildId(x, acc))
    }
    acc.push(item.id)
    return acc
  }

  item.dependents = getChildId(item, [])
  return item
}

function getParentRecurse(items) {

  function getParent(acc, item) {
    if (item.parent) {
      const parent = items.filter(x => x.id === item.parent)[0]
      acc.push(parent)
      getParent(acc, parent)
    }
    return acc
  }
  return items.reduce((acc, x) => {
    acc[x.id] = getParent([x], x)
    return acc
  }, {})
}

function getById(items) {
  return items.reduce((acc, item) => {
    acc[item.id] = {
      ...item,
      children: items.filter(x => x.parent === item.id),
      parent: items.filter(x => x.parent && x.id === item.parent)[0] || false,
    }
    return acc
  }, {})
}

export default combineEpics(...epics)