import {
  GET_ITEM,
  SET_ITEM,
  STORAGE_ERROR,
} from './reducer'

export default storageKey => ({
  get() {
    try {
      const value = JSON.parse(localStorage.getItem(storageKey))
      const status = value !== null
        ? `Recovered selection from storage`
        : `Initialized with no selection in storage`

      return {
        type: GET_ITEM,
        payload: { ...value, status }
      }

    } catch(e) {

      return {
        type: STORAGE_ERROR,
        payload: { status: `Storage error: ${e.message}` }
      }

    }
  },

  set(v) {
    localStorage.setItem(storageKey, JSON.stringify(v))

    return {
      type: SET_ITEM,
      payload: { status: `👍 Saved selection` }
    }
  }
})
