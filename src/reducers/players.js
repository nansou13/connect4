import {
  APP_LOAD,
  SWITCH_PLAYER,
  PLAYER_RENAME,
  FINISH,
} from '../action-creator'

import { getRandomInt } from '../lib'

const defaultState = {
  list: [
    { id: 0, name: 'Player1', win: 0 },
    { id: 1, name: 'Player2', win: 0 },
  ],
  current: 0,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case APP_LOAD:
      return {
        ...state,
        current: getRandomInt(2),
      }
    case SWITCH_PLAYER:
      return {
        ...state,
        current: state.current ? 0 : 1,
      }
    case PLAYER_RENAME:
      const newArray = state.list.map(
        players =>
          players.id === action.payload.id
            ? { ...players, ...action.payload }
            : players
      )
      return {
        ...state,
        list: newArray,
      }
    case FINISH:
      const { current } = action.payload.players
      const newArrayFinish = state.list.map(
        players =>
          players.id === current
            ? { ...players, win: players.win + 1 }
            : players
      )
      return {
        ...state,
        list: newArrayFinish,
      }
    default:
      return state
  }
}
