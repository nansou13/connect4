import { APP_LOAD, UPDATE_CASE, MULTIGAME_UPDATE_BOARD } from '../action-creator'

export default (state = [], action) => {
  switch (action.type) {
    case APP_LOAD:
    case UPDATE_CASE:
      return action.payload
    case MULTIGAME_UPDATE_BOARD:
      return action.payload.board
    default:
      return state
  }
}
