import React from 'react'
import PropTypes from 'prop-types'

const Players = ({ contents, handleClick }) => {
  const playersDisplay = contents.map((player, i) => (
    <div className="player" key={i}>
      <span className={i ? 'case yellow' : 'case red'} />
      <span className="name" onClick={() => handleClick(i)}>
        <div>{player.name}</div><div>{player.win}</div>
      </span>

      {!i && <span className="versus">VS</span>}
    </div>
  ))
  return <div className="players">{playersDisplay}</div>
}

Players.propTypes = {
  contents: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default Players
