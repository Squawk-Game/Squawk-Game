import React, { Component } from 'react'

import {database, auth} from '../../fire'


export default class WinnerPage extends Component {
  constructor(props) {
    super(props)

  }

  render(){
    return (
      <div>
        IN THE WINNER PAGE
      </div>
    )
  }
}

// this will happen inside a set timeout for next round starting database.ref(`games/${this.props.gameKey}`).update({judgeState: 'GAME_CLOSED'})
