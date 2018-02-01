import { APP_LOAD, FINISH, DRAW, JOIN_MULTI, MULTIGAME_STARTED, EXIT_MULTI } from '../action-creator'

const defaultState = {
  appName: 'Connect 4 / GoJob',
  appLoaded: false,
  finish: false,
  multi: false,
  multiWaiting:false,
  multiplayerId:null
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
    case JOIN_MULTI:
      return {
        ...state,
        multi: true,
        multiWaiting: true
      }
    case EXIT_MULTI:
      return {
        ...state,
        multi: false,
        multiWaiting: false
      }
    case MULTIGAME_STARTED:
      return {
        ...state,
        multiWaiting: false,
        multiplayerId: action.payload.players.i
      }
    default:
      return state
  }
}
