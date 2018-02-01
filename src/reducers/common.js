import { APP_LOAD, FINISH, DRAW } from '../action-creator'

const defaultState = {
  appName: 'Connect 4 / GoJob',
  appLoaded: false,
  finish: false,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case APP_LOAD:
      return {
        ...state,
        appLoaded: true,
        finish: false,
      }
    case DRAW:
    case FINISH:
      return {
        ...state,
        finish: true,
      }
    default:
      return state
  }
}
