import React, { Component } from 'react'

import Board from '../components/Board'
import Players from '../components/Players'
import DialogInfo from '../components/DialogInfo'

import {
  createBoard,
  getLastPions,
  checkWinner,
  checkDraw,
  getMessageDialog,
} from '../lib'

import '../App.css'

const DEFAULT_VALUE = { row: 7, col: 6 }

class App extends Component {
  init(size = DEFAULT_VALUE) {
    const matrice = createBoard(size)
    this.setState({
      matrice,
      appLoaded: true,
      finish: false,
      current: 0,
      dialog: { open: false },
    })
  }

  over(type, value) {
    const message = getMessageDialog(type, value)
    this.setState({ dialog: { open: true, message }, finish: true })
  }

  switchPlayer() {
    const { current } = this.state
    this.setState({ current: current ? 0 : 1 })
  }

  updateCase(col) {
    const { current: currentPlayer, matrice, finish, players } = this.state
    if (!finish) {
      const newMatrice = [...matrice]
      const row = getLastPions(matrice, col)

      if (row !== null) {
        newMatrice[row][col] = currentPlayer ? 2 : 1
        this.setState({ matrice: newMatrice })

        if (checkWinner(matrice, row)) {
          this.over('finish', players[currentPlayer].name)
        } else if (checkDraw(matrice)) {
          this.over('draw')
        } else {
          this.switchPlayer()
        }
      } else {
        alert('full !')
      }
    }
  }

  updateName(id) {
    const { players } = this.state
    const newArray = [...players]

    newArray[id].name = prompt("player1's name ?", players[id].name)
    this.setState({ players: newArray })
  }

  constructor() {
    super()

    this.state = {
      appLoaded: false,
      finish: false,
      players: [{ name: 'Player1', win: 0 }, { name: 'Player2', win: 0 }],
      current: 0,
      matrice: [],
      dialog: {
        open: false,
        message: '',
      },
    }
  }
  componentDidMount() {
    this.init()
  }

  render() {
    const { appLoaded, matrice, players, current, dialog } = this.state

    return (
      <div className="connect4">
        {appLoaded && (
          <div>
            <h1>Connect 4 / GoJob</h1>
            <h3>{`waiting ${players[current].name}...`}</h3>
            <Board
              matrice={matrice}
              handleClick={col => this.updateCase(col)}
            />
            <Players
              contents={players}
              handleClick={id => this.updateName(id)}
            />
            <div className="restart" onClick={() => this.init()}>
              Restart
            </div>
          </div>
        )}
        <DialogInfo
          values={dialog}
          restart={() => this.init()}
          handleClose={() => this.setState({ dialog: { open: false } })}
        />
      </div>
    )
  }
}

export default App
