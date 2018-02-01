import React, { Component } from 'react'
import { connect } from 'react-redux'

import Cell from '../components/Cells'

import { getLastPions, checkWinner, checkDraw } from '../lib'

import { SWITCH_PLAYER, UPDATE_CASE, FINISH, DRAW } from '../action-creator'

const mapStateToProps = ({ board, common: { finish, appName }, players }) => ({
  board,
  finish,
  appName,
  players,
})

const mapDispatchToProps = dispatch => ({
  switchPlayer: () => dispatch({ type: SWITCH_PLAYER }),
  updateBoard: matrice => dispatch({ type: UPDATE_CASE, payload: matrice }),
  finishGame: players => dispatch({ type: FINISH, payload: { players } }),
  drawGame: () => dispatch({ type: DRAW }),
})

class Board extends Component {
  constructor(...args) {
    super(...args)

    this.updateCase = col => {
      const {
        board,
        finish,
        updateBoard,
        finishGame,
        drawGame,
        switchPlayer,
        players,
      } = this.props

      const { current } = players

      if (!finish) {
        const row = getLastPions(board, col)
        const newBoard = [...board]

        if (row !== null) {
          newBoard[row][col] = current ? 2 : 1
          updateBoard(newBoard)

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
  }

  render() {
    const { appName, board, players: { list: players, current } } = this.props
    return (
      <div id="board">
        <h1>{appName}</h1>
        <h3>{`waiting ${players[current].name}...`}</h3>
        {board.map((row, x) => {
          const cells = row.map((v, col) => (
            <Cell
              key={`${col}-${x}`}
              onClick={() => this.updateCase(col)}
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
