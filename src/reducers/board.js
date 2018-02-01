import { APP_LOAD, UPDATE_CASE } from '../action-creator'

export default (state = [], action) => {
  switch (action.type) {
    case APP_LOAD:
    case UPDATE_CASE:
      return action.payload
    default:
      return state
  }
}
