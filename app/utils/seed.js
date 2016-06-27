import seedData from '../../internals/seed'
import buildRecordsTree from './tree'
import { STORAGE_KEY } from 'containers/Record/constants'

function seedStorage(action) {
  setStorage(STORAGE_KEY, serializeState(JSON.stringify, buildRecordsTree))
  return action({ status: `👍 Seed storage with selection` })
}

function serializeState(stringify, transform) {
  return data => (
    stringify(transform(data))
  )
}

function setStorage(key, value) {
  return storage => (
    storage.setItem(key, value)
  )
}

export default seedStorage