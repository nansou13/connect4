import io from 'socket.io-client'

import { MULTIGAME_STARTED } from './action-creator'

import { store } from './store'

export const socket = io('http://localhost:8000') // http://78.118.250.227:8000

export function sendMessage(id, value) {
  socket.emit(id, value)
}

export function startGame(){
  socket.on('gameStart', players => {
    store.dispatch({ type: MULTIGAME_STARTED, payload:{players} })
  })
}

export function playerPlay(position){
  socket.emit('playerPlay', position)
}

export function playerQuitMulti(){
  socket.emit('playerQuitMulti')
}

export function updateBoardMulti(callBack) {
  socket.on('updateBoard', (position) => {
    callBack(position.position.col, true)
  })
}
