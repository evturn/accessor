import {
  CHANGE_USERNAME,
} from './constants'

export function changeUsername(name) {
  return {
    type: CHANGE_USERNAME,
    name,
  }
}
