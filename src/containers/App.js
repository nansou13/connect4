// TODO PROPTYPE
// TODO SOCKETIO
// TODO css ANIMATE
import React, { Component } from 'react'
import classNames from 'classnames'

import '../App.css'

const DEFAULT_VALUE = { row: 6, col: 7 }

const Case = ({ value, onClick }) => (
  <div className="block" onClick={onClick}>
    <div
      className={classNames(
        'circle',
        { red: value === 1 },
        { yellow: value === 2 }
      )}
    />
  </div>
)

class App extends Component {
  init(size = DEFAULT_VALUE) {

    const { col, row } = size
    const matrice = []

    for (let x = 0; x < row; x++) {
      matrice[x] = []
      for (let y = 0; y < col; y++) {
        matrice[x][y] = 0
      }
    }
    this.setState({ matrice, appLoaded: true, current: 0 })
  }

  switchPlayer() {
    const { current } = this.state

    const nextPlayer = current ? 0 : 1
    this.setState({ current: nextPlayer })
  }

  constructor(...args) {
    super(...args)

    this.state = {
      appLoaded: false,
      players: [{ name: 'Player1', win: 0 }, { name: 'Player2', win: 0 }],
      current: 0,
      action: [],
      matrice: [],
    }
  }
  componentDidMount() {
    this.init()
  }

  getLastPions(col) {
    const { matrice } = this.state
    for (let x = 0; x < matrice.length; x++) {
      if (matrice[x][col] > 0) {
        const xPos = x - 1
        return xPos >= 0 ? xPos : null
      }
    }
    return matrice.length - 1
  }

  updateCase(col) {
    const { current: currentPlayer } = this.state
    const newMatrice = this.state.matrice
    const row = this.getLastPions(col)

    if (row !== null) {
      newMatrice[row][col] = currentPlayer ? 2 : 1
      this.setState({ matrice: newMatrice })

      if (this.checkWinner(row)) {
        alert('WIN')
      } else {
        this.switchPlayer()
      }
    } else {
      alert('full !')
    }
  }

  checkLine([a, b, c, d]) {
    return a !== 0 && a === b && a === c && a === d
  }

  checkWinner(rSelected) {
    const { matrice } = this.state
    const nbPerLine = 4
    const rowMax = matrice.length - nbPerLine
    const colMax = matrice[0].length - nbPerLine
    let row,
      col = 0

    // right
    for (row = 0; row < matrice.length; row++) {
      for (col = 0; col <= colMax; col++) {
        if (this.checkLine(matrice[row].slice(col, col + nbPerLine)))
          return matrice[row][col]
      }
    }

    //Check Down only if 4 from bottom
    if (rSelected <= matrice.length - 4) {
      for (row = 0; row <= rowMax; row++) {
        for (col = 0; col < matrice[0].length; col++) {
          if (
            this.checkLine([
              matrice[row][col],
              matrice[row + 1][col],
              matrice[row + 2][col],
              matrice[row + 3][col],
            ])
          )
            return matrice[row][col]
        }
      }


      // down-right
      for (row = 0; row <= rowMax; row++) {
        for (col = 0; col <= colMax; col++) {
          if (
            this.checkLine([
              matrice[row][col],
              matrice[row + 1][col + 1],
              matrice[row + 2][col + 2],
              matrice[row + 3][col + 3],
            ])
          )
            return matrice[row][col]
        }
      }

      // down-left
      for (row = 0; row <= rowMax; row++) {
        for (col = nbPerLine - 1; col < matrice.length; col++) {
          if (
            this.checkLine([
              matrice[row][col],
              matrice[row + 1][col - 1],
              matrice[row + 2][col - 2],
              matrice[row + 3][col - 3],
            ])
          )
            return matrice[row][col]
        }
      }
    }

    return false
  }

  updateName(id) {
    const { players } = this.state
    const newArray = players

    newArray[id].name = prompt("player1's name ?", players[id].name)
    this.setState({ players: newArray })
  }

  displayLineBoard(array, row) {
    const cases = array.map((v, col) => (
      <Case
        key={`${col}-${row}`}
        onClick={() => this.updateCase(col)}
        value={v}
      />
    ))
    return <div>{cases}</div>
  }

  render() {
    const { appLoaded, matrice, players, current } = this.state

    return (
      <div className="connect4">
        {appLoaded && (
          <div>
            <h1>{`waiting ${players[current].name}...`}</h1>
            <div id="board">
              {matrice.map((line, i) => this.displayLineBoard(line, i))}
            </div>
            <div>
              red : <br />
              <span onClick={() => this.updateName(0)}>
                {players[0].name}
              </span>{' '}
              <br />
              Action : <br />
            </div>

            <div>
              yellow : <br />
              <span onClick={() => this.updateName(1)}>
                {players[1].name}
              </span>{' '}
              <br />
              Action : <br />
            </div>
            <div onClick={() => this.init()}>Restart</div>
          </div>
        )}
      </div>
    )
  }
}

export default App
