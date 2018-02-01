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
    gameRef.once("value")
      .then(function (snap) {
        self.setState({ playersInGame: snap.val().players })
      })
      .then(function () {
        gameRef.on('child_changed', (snap) => {
          if (snap.key === 'players') {
            self.setState({ playersInGame: snap.val() })
          }
        })
      })
  }

  render() {
    if (!this.state.playersInGame) {
      //Put spinning wheel here
      return <h1>Loading Game...</h1>
    } else {
      let arrPlayers = []
      for (let key in this.state.playersInGame) {
        arrPlayers.unshift(this.state.playersInGame[key])
      }
      return (
        <div>
          <h1>Welcome To Game #{this.props.code}</h1>
          <h2>Judge: {arrPlayers[0]}</h2>
          <h3>Squawkers:</h3>
          {arrPlayers.slice(1).map(player => {
            return (
              <div key={player}>
                <li>{player}</li>

              </div>
            )
          })}
          {this.props.isJudge &&
            (
              <button>
                Send Video
              </button>
            )
          }
        </div>
      )
    }
  }
}

