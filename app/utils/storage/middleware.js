import accessor from './accessor'
import { CALL_STORAGE_METHOD } from './actions'

export default function storageMiddleware(key) {
  const storage = accessor(key)

  const middleware = ({ dispatch, getState }) => (
    next => action => {
      if (action.type !== CALL_STORAGE_METHOD) {
        return next(action)
      }
      const { payload: { method, args } } = action

      dispatch(storage[method](...args))
    }
  )

  return middleware
}
