import React, { Component } from 'react'

import {database, auth} from '../../fire'


export default class StartNewRound extends Component {
  constructor(props) {
    super(props)

  }

  render(){
    return (
      <div>
        <div>
          <h1>GAME OVER START NEW ROUND LOGIC</h1>
        </div>
      </div>
    )
  }
}

// this will happen inside a set timeout for next round starting database.ref(`games/${this.props.gameKey}`).update({judgeState: 'GAME_CLOSED'})
