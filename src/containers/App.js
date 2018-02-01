import React, { Component } from 'react'
import { connect } from 'react-redux'

import Board from '../containers/Board'
import Players from '../containers/Players'
import DialogInfo from '../components/DialogInfo'

import { store } from '../store'

import { APP_LOAD, PLAYER_RENAME, DIALOG_CLOSE } from '../action-creator'

import RaisedButton from 'material-ui/RaisedButton'

import { createBoard } from '../lib'

import '../styles/App.css'

const DEFAULT_VALUE = { row: 6, col: 7 }

const mapStateToProps = ({ common: { appLoaded }, dialog }) => ({
  appLoaded,
  dialog,
})

const mapDispatchToProps = dispatch => ({
  onLoad: matrice => dispatch({ type: APP_LOAD, payload: matrice }),
  renamePlayer: (id, name) => dispatch({ type: PLAYER_RENAME, id, name }),
})

class App extends Component {
  init() {
    this.props.onLoad(createBoard(DEFAULT_VALUE))
  }
  componentDidMount() {
    this.init()
  }

  render() {
    const { appLoaded, dialog } = this.props
    return (
      <div className="connect4">
        {appLoaded && (
          <div>
            <Board />
            <Players />
            <div className="restart">
              <RaisedButton label="Restart" onClick={() => this.init()} />
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
