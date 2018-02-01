import { combineReducers } from 'redux'

import common from './common'
import board from './board'
import players from './players'
import dialog from './dialog'

const reducer = combineReducers({
  common,
  board,
  players,
  dialog,
})

export default reducer
