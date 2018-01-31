import React, { Component } from 'react'

import {database, auth} from '../../fire'
<<<<<<< HEAD
=======
import HostVideo from './HostVideo'
>>>>>>> 7bbd56551bb1dabdcd709fb0047a508176b4bab0


export default class WinnerPage extends Component {
  constructor(props) {
    super(props)

  }

  render(){
    return (
      <div>
        IN THE WINNER PAGE
<<<<<<< HEAD
=======
        <HostVideo /> {/* need to pass in video and audio props of winner */}
>>>>>>> 7bbd56551bb1dabdcd709fb0047a508176b4bab0
      </div>
    )
  }
}

// this will happen inside a set timeout for next round starting database.ref(`games/${this.props.gameKey}`).update({judgeState: 'GAME_CLOSED'})
