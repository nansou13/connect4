import React from 'react'
import PropTypes from 'prop-types'

import Cell from './Cells'
import Slider from 'material-ui/Slider';

const SlideSize = {
  col:{ min:4, max:15, step:1 },
  row:{ min:4, max:15, step:1 },
}

const Board = ({ matrice, handleClick, size, handleInputChange }) => (
  <div id="board">
    <div>
      <div className="boardContent">
        {matrice.map((row, x) => {
          const cells = row.map((v, col) => (
            <Cell key={col} onClick={() => handleClick(col)} value={v} />
          ))
          return <div key={x}>{cells}</div>
        })}
      </div>
      <div className="slideRow"><Slider style={{height: 240}} axis="y-reverse" {...SlideSize.row} value={size.row} onChange={handleInputChange('row')} /></div>
    </div>
    <div className="slideCol"><Slider {...SlideSize.col} value={size.col} onChange={handleInputChange('col')} /></div>
  </div>

)

Board.propTypes = {
  matrice: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default Board
