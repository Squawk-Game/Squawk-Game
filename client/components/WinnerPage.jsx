import React, { Component } from 'react'

import {database, auth} from '../../fire'
import DumbVideo from './DumbVideo'


export default class WinnerPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      audio: null,
      video: null
    }
  }

  componentDidMount() {
    Promise.all([
      database.ref(`games/${this.props.gameKey}`)
    ])
  }

  render(){
    return (
      <div>
        IN THE WINNER PAGE
        <DumbVideo audio={this.state.audio} video={this.state.video}/> {/* need to pass in video and audio props of winner */}
      </div>
    )
  }
}

// this will happen inside a set timeout for next round starting database.ref(`games/${this.props.gameKey}`).update({judgeState: 'GAME_CLOSED'})
