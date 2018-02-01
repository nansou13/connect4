import React, { Component } from 'react'

import Board from '../components/Board'
import Players from '../components/Players'
import DialogInfo from '../components/DialogInfo'

import RaisedButton from 'material-ui/RaisedButton';

import {
  createBoard,
  getLastPions,
  checkWinner,
  checkDraw,
  getMessageDialog,
} from '../lib'

import '../styles/App.css'

class App extends Component {
  init() {
    const {size} = this.state

    const matrice = createBoard(size)
    this.setState({
      matrice,
      appLoaded: true,
      finish: false,
      current: 0,
      dialog: { open: false },
    })
  }

  openDialog(type, value) {
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
          const newArrayPlayer = [...players]
          newArrayPlayer[currentPlayer].win++

          this.setState({players:newArrayPlayer})

          this.openDialog('finish', players[currentPlayer].name)
        } else if (checkDraw(matrice)) {
          this.openDialog('draw')
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

    const newName = prompt("player's name ?", players[id].name || null)

    newArray[id].name = newName || players[id].name
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
      size: {
        row:5,
        col:6,
      }
    }
  }
  componentDidMount() {
    this.init()
  }

  inputChange(value,  type) {
    this.setState({size:{...this.state.size, [type]:value }}, this.init)
  }

  render() {
    const { appLoaded, matrice, players, current, dialog, size } = this.state

    return (
      <div className="connect4">
        {appLoaded && (
          <div>
            <h1>Connect 4 / GoJob</h1>
            <h3>{`waiting ${players[current].name}...`}</h3>
            <Board
              matrice={matrice}
              handleClick={col => this.updateCase(col)}
              size={size}
              handleInputChange={(type) => (e, value) => this.inputChange(value, type)}
            />

            <Players
              contents={players}
              handleClick={id => this.updateName(id)}
            />
            <div className="restart"><RaisedButton label="Restart" onClick={() => this.init()} /></div>
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
