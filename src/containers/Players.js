import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { updateName } from '../lib'

import { PLAYER_RENAME } from '../action-creator'

const mapStateToProps = ({ players:{ list: players } }) => ({
  players,
})

const mapDispatchToProps = dispatch => ({
  renamePlayer: (id, name) =>
    dispatch({ type: PLAYER_RENAME, payload: { id, name } }),
})

const Players = ({ players, renamePlayer }) => {
  return (
    <div className="players">
      {
        players.map(({name, win}, i) => (
          <div className="player" key={i}>
            <span className={i ? 'case yellow' : 'case red'} />
            <span
              className="name"
              onClick={() => renamePlayer(i, updateName(players[i].name))}
            >
              <div>{name}</div>
              <div>{win}</div>
            </span>

            {!i && <span className="versus">VS</span>}
          </div>
        ))
      }
    </div>
  )
}

Players.propTypes = {
  players: PropTypes.array.isRequired,
  renamePlayer: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Players)
