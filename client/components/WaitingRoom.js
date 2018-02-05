import React, { Component } from 'react'

import { database, auth } from '../../fire'


export default class WaitingRoom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playersInGame: null
    }
    this.handleClick = this.handleClick.bind(this)
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

  handleClick(event){
    event.preventDefault()
    database.ref(`games/${this.props.gameKey}`).update({judgeState: 'VIDEO_SENT'})
  }

  render() {
    if (!this.state.playersInGame) {
      //Put spinning wheel here
      return <h1>Loading Game...</h1>
    } else {
      let arrPlayers = []
      for (let key in this.state.playersInGame) {
        arrPlayers.push(this.state.playersInGame[key])
      }
      return (
        <div>
        <br />
        <br />
          <h3>Welcome To Game #{this.props.code}</h3>
          <h4>Judge: {arrPlayers[0]}</h4>
          <h5>Squawkers:</h5>
          {arrPlayers.slice(1).map(player => {
            return (
              <div key={player}>
                <li>{player}</li>

              </div>
            )
          })}
          {this.props.isJudge &&
            (
              <button className="btn waves-effect waves-orange white" onClick={this.handleClick} >
                Send Video
              </button>
            )
          }
        </div>
      )
    }
  }
}

