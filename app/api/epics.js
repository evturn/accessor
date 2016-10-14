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

  function authorize(action$) {
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
      .map(item => API.ref(`records/${API.currentUser().id}/${item.id}`).update(item))
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



export default combineEpics(...epics)