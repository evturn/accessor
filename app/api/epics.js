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
      .map(API.create)
      .map(Actions.createSuccess)
  },

  function updateItem(action$, store) {
    return action$.ofType(Types.UPDATE_ITEM)
      .pluck('payload', 'item')
      .map(({children, ...x}) => ({...x, ...store.getState().data.hashmap[x.id].unwrap()}))
      .map(API.update)
      .map(Actions.updateSuccess)
  },

  function deleteData(action$, store) {
    return action$.ofType(Types.DELETE_NODE)
      .pluck('payload', 'id')
      .map(x => store.getState().data.hashmap[x].getBranchIds())
      .map(API.remove)
      .map(Actions.deleteSuccess)
  },

  function closeModal(action$) {
    return action$.ofType(Types.CLOSE_MODAL)
      .delay(400)
      .map(Actions.unmountModal)
  },

]

export default combineEpics(...epics)