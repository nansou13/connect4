import React, { Component } from 'react'
import { connect } from 'react-redux'

import Cell from '../components/Cells'
import { playerPlay, updateBoardMulti } from '../socket'

import { getLastPions, checkWinner, checkDraw } from '../lib'

import { SWITCH_PLAYER, UPDATE_CASE, FINISH, DRAW } from '../action-creator'

const mapStateToProps = ({ board, common: { finish, appName, multiplayerId, multi }, players }) => ({
  board,
  finish,
  appName,
  multiplayerId,
  multi,
  players,
})

const mapDispatchToProps = dispatch => ({
  switchPlayer: () => dispatch({ type: SWITCH_PLAYER }),
  updateBoard: matrice => dispatch({ type: UPDATE_CASE, payload: matrice }),
  finishGame: players => dispatch({ type: FINISH, payload: { players } }),
  drawGame: () => dispatch({ type: DRAW }),
})

class Board extends Component {

  componentWillMount(){
    updateBoardMulti(this.updateCase)
  }

  constructor(...args) {
    super(...args)

    this.updateCase = (col, IA) => {
      const {
        board,
        finish,
        updateBoard,
        finishGame,
        drawGame,
        switchPlayer,
        players,
        multi,
      } = this.props

      const { current } = players

      if (!finish) {
        const row = getLastPions(board, col)
        const newBoard = [...board]

        if (row !== null) {
          newBoard[row][col] = current ? 2 : 1
          updateBoard(newBoard)
          if(!IA && multi){
            playerPlay({row,col})
          }

          if (checkWinner(board, row))
            finishGame(players)
          else if (checkDraw(board))
            drawGame()
          else
            switchPlayer()

        } else
            alert('full !')
      }
    }

    this.manageClick = (col) => {
      const { players: { current }, multiplayerId, multi } = this.props
      if(multi){
        if(current===multiplayerId)
          this.updateCase(col, false)
      }else{
        this.updateCase(col, false)
      }
    }
  }

  render() {
    const { appName, board, players: { list: players, current }, multi, multiplayerId } = this.props
    let h3Text = <h3>{`waiting ${players[current].name}...`}</h3>
    if(multi){
      if(current===multiplayerId){
        h3Text = <h3>{`waiting you...`}</h3>
      }else{
        h3Text = <h3>{`waiting ${players[current].name}...`}</h3>
      }
    }
    return (
      <div id="board">
        <h1>{appName}</h1>
        {h3Text}
        {board.map((row, x) => {
          const cells = row.map((v, col) => (
            <Cell
              key={`${col}-${x}`}
              onClick={() => this.manageClick(col)}
              value={v}
            />
          ))
          return <div>{cells}</div>
        })}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
