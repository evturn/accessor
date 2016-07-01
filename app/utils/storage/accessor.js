import {
  GET_ITEM,
  SET_ITEM,
  STORAGE_ERROR,
} from './reducer'

const getItem = data => ({
  type: GET_ITEM,
  data,
  status: data === null
    ? `Initialized with no selection in storage`
    : `Recovered selection from storage`
})

const setItem = data => ({
  type: SET_ITEM,
  data,
  status: `👍 Saved selection`
})

const error = e => ({
  type: STORAGE_ERROR,
  data: null,
  status: `Storage error: ${e.message}`
})

export default function accessor(storageKey) {
  const get = _ => {
    try {
      return getItem(JSON.parse(localStorage.getItem(storageKey)))
    } catch(e) {
      return error(e)
    }
  }

  const set = data => {
    localStorage.setItem(storageKey, JSON.stringify(data))
    return setItem(data)
  }

  return { get, set }
}
