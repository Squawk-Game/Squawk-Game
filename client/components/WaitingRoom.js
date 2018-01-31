import React, { Component } from 'react'

import { database, auth } from '../../fire'


export default class WaitingRoom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playersInGame: null
    }
  }

  componentDidMount() {
    let self = this
    let gameRef = database.ref(`games/${this.props.gameKey}`)
    gameRef.on("value", function(snap) {
      self.setState({playersInGame: snap.val().players})
    })
    gameRef.on('child_changed', (snap) => {
      if (snap.key === 'players'){
        self.setState({playersInGame: snap.val()})
      }
    })
  }

  render() {

    let playersArr = []
    if (this.state.playersInGame) {
      for (let key in this.state.playersInGame) {
        playersArr.push(this.state.playersInGame[key])
      }
    }
    console.log("playersArr", playersArr)
    return (
      <div>
        <h2>Welcome To Game #{this.props.code}</h2>
        {playersArr &&
          playersArr.map(player => {
          return (
            <div key={player}>
            <li>
            {player}
            </li>
            </div>
          )
        })}
      </div>
    )
  }
}
