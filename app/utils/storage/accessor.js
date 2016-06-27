import {
  GET_ITEM,
  SET_ITEM,
  STORAGE_ERROR,
} from './reducer'

export default function(storageKey) {
  const get = (type=GET_ITEM, status ) => {
    try {
      const data = JSON.parse(localStorage.getItem(storageKey))

      return {
        type,
        data,
        status: data === null
          ? `Initialized with no selection in storage`
          : status
            ? status
            : `Recovered selection from storage`
      }

    } catch(e) {

      return {
        type: STORAGE_ERROR,
        status: `Storage error: ${e.message}`
      }

    }
  }

  const set = v => {
    localStorage.setItem(storageKey, JSON.stringify(v))

    return get(SET_ITEM, `👍 Saved selection`)
  }

  return { get, set }
}