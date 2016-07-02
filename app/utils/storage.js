const STORAGE_KEY = '@@accessor'

const get = _ => {
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
}

const set = data => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))

  return {
    data,
    error: false,
    message: `👍 Saved selection`
  }
}

export default { get, set }
