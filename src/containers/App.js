import React, { Component } from 'react'
import { connect } from 'react-redux'

import SocketIO from '../containers/Socket'
import Board from '../containers/Board'
import Players from '../containers/Players'
import DialogInfo from '../components/DialogInfo'

import { playerQuitMulti } from '../socket'

import { store } from '../store'

import { APP_LOAD, PLAYER_RENAME, DIALOG_CLOSE, EXIT_MULTI } from '../action-creator'

import RaisedButton from 'material-ui/RaisedButton'

import { createBoard } from '../lib'

import '../styles/App.css'

const DEFAULT_VALUE = { row: 7, col: 6 }

const mapStateToProps = ({ common: { appLoaded, multiWaiting }, dialog }) => ({
  appLoaded,
  multiWaiting,
  dialog,
})

const mapDispatchToProps = dispatch => ({
  onLoad: matrice => dispatch({ type: APP_LOAD, payload: matrice }),
  renamePlayer: (id, name) => dispatch({ type: PLAYER_RENAME, id, name }),
  exitMulti: () => dispatch({ type: EXIT_MULTI }),
})

class App extends Component {
  init() {
    this.props.onLoad(createBoard(DEFAULT_VALUE))
  }
  componentDidMount() {
    this.init()
  }

  handleClickQuitMulti() {
    playerQuitMulti()
    this.props.exitMulti()
  }

  render() {
    const { appLoaded, dialog, multiWaiting } = this.props
    return (
      <div className="connect4">
        {appLoaded && (
          <div>
            <div id="overlay" style={{display: multiWaiting ? 'block' : 'none' }}><div className="info">PLEASE WAIT...<br /><span onClick={() => this.handleClickQuitMulti()}>Quit</span></div></div>
            <Board />
            <Players />
            <div className="restart">
              <SocketIO /><RaisedButton label="Restart" onClick={() => this.init()} />
            </div>
          </div>
        )}
        <DialogInfo
          values={dialog}
          restart={() => this.init()}
          handleClose={() => store.dispatch({ type: DIALOG_CLOSE })}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
