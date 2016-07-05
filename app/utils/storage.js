const STORAGE_KEY = '@@accessor'

// Uncomment the code below to overwrite storage state with seed data
//
// import newData from '../../internals/seed'
// localStorage.setItem(STORAGE_KEY, JSON.stringify(newData))

const get = _ => {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY))

    return {
      data,
      error: false,
      message: data === null
        ? `Initialized with no selection in storage`
        : `Recovered selection from storage`
    }
  } catch (e) {

    return {
      error: true,
      message: `Storage error: ${e.message}`
    }
  }
}

const set = data => {
  if (data === undefined) {
    return {
      error: true,
      message: `😮 Complete overwrite prevented!`
    }
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))

  return {
    data,
    error: false,
    message: `👍 Saved selection`
  }
}

export { get, set }
