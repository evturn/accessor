export const CALL_STORAGE_METHOD = '@@storage/CALL_STORAGE_METHOD'

function accessStorage(method) {
  return (...args) => ({
    type: CALL_STORAGE_METHOD,
    payload: { method, args }
  })
}

export const get = accessStorage('get')
export const set = accessStorage('set')

export const storageActions = { get, set }
