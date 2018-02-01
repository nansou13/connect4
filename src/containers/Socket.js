import React, {Component} from 'react'
import { connect } from 'react-redux'

import { sendMessage, startGame } from '../socket'

import RaisedButton from 'material-ui/RaisedButton'

import { JOIN_MULTI } from '../action-creator'

const mapStateToProps = ({ players:{ list: players }, common:{multi} }) => ({
  players,
  multi,
})

const mapDispatchToProps = dispatch => ({
  joinMulti: () =>
    dispatch({ type: JOIN_MULTI }),
})

class SocketIO extends Component {
  constructor(...args) {
    super(...args)

    this.multiplayer = () => {
      this.props.joinMulti()
      sendMessage('multi')
    }

  }
  componentWillMount() {
    startGame()
  }

  render() {
    const { multi } = this.props

    return (<RaisedButton primary={true} disabled={multi} label="Multi" onClick={() => this.multiplayer()} />)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SocketIO)
