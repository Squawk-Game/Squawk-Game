import React, { Component } from 'react'

import {database, auth} from '../../fire'
import DumbVideo from './DumbVideo'


export default class WinnerPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      audio: null,
      video: null,
      redirect: false
    }
  }

  componentDidMount() {
    let self = this
    Promise.all([
      database.ref(`games/${this.props.gameKey}/video`),
      //audio needs to be the player's id bc that's the name of their video
      database.ref(`games/${this.props.gameKey}/winningAudio`)
    ]).then((refs) => {
      let videoRef = refs[0]
      let winningAudioRef = refs[1]
      videoRef.on('value', (snap) => {
        self.setState({ video: snap.val() })
      })
      winningAudioRef.on('value', (snap) => {
        self.setState({ audio: snap.val() })
      })
    })
  }

  render(){
    return (
      <div>
        <div>
          <h1>CONGRATS WINNER _______ !</h1>
          <DumbVideo audio={this.state.audio} video={this.state.video} loops={12} gameKey={this.props.gameKey} /> {/* need to pass in video and audio props of winner */}
        </div>
      </div>
    )
  }
}

// this will happen inside a set timeout for next round starting database.ref(`games/${this.props.gameKey}`).update({judgeState: 'GAME_CLOSED'})
