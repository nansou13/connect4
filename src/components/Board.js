import React from 'react'
import PropTypes from 'prop-types'

import Cell from './Cells'

const Board = ({ matrice, handleClick }) => (
  <div id="board">
    {matrice.map((row, x) => {
      const cells = row.map((v, col) => (
        <Cell key={`${col}-${x}`} onClick={() => handleClick(col)} value={v} />
      ))
      return <div>{cells}</div>
    })}
  </div>
)

Board.propTypes = {
  matrice: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default Board
