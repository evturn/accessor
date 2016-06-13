import 'whatwg-fetch'
import { fromJS } from 'immutable'

const setInitialState = records => (
  fromJS({
    global: fromJS({
      records,
      loading: false,
      error: false,
      currentUser: false,
      userData: fromJS({
        repositories: false,
      })
    })
  })
)


const fetchJSON = url => (
  fetch(url)
    .then(x => x.json())
    .then(setInitialState)
)

export default fetchJSON
