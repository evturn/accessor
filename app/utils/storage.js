import * as Rx from 'rxjs'

const STORAGE_KEY = '@@accessor'

const storage = {
  get: _ => {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY))

      return {
        data: data,
        error: false,
        message: data === null
          ? `Initialized with no selection in storage`
          : `Recovered selection from storage`
      }

    } catch(e) {

      return {
        error: true,
        message: `Storage error: ${e.message}`
      }

    }
  },

  set: data => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))

    return {
      data,
      error: false,
      message: `👍 Saved selection`
    }
  }
}


function get({ error, success }) {
  return Rx.Observable.of(storage.get())
    .map(response => {
      if (response.error) {
        return error(response)
      } else {
        success(response)
      }

      return response.data
    })
}

function set({ data, success }) {
  return Rx.Observable.of(storage.set(data))
    .map(response => {
      success(response)

      return response.data
    })
}



export { get, set }
