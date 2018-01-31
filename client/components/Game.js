import React, { Component } from 'react'
import { database, auth } from '../../fire'
//you are here because you are a judge and want to add players to your new game
export default class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gameId: this.props.match.params.gameId,
      gameState: 'GAME_CREATED',
      playerRole: null,
      code: null,
      currentUserId: null
    }
  }

  componentDidMount() {
    let self = this
    Promise.all([
      database.ref(`games/${this.state.gameId}/judgeId`),
      auth.currentUser,
      database.ref(`games/${this.state.gameId}/code`)
    ]).then(function (gameUserCode) {
      gameUserCode[2].on("value", function (snapshot) {
        self.setState({ code: snapshot.val() })
      })
      gameUserCode[0].on("value", function (snapshot) {
        if (snapshot.val() === gameUserCode[1].uid) {
          self.setState({ playerRole: 'JUDGE' })
        } else {
          self.setState({ playerRole: 'PLAYER' })
        }
      })
      self.setState({ currentUserId: gameUserCode[1].uid })
    }).then(() => {
      database.ref(`users/-L48wvYYdVJktiz1heSj`).once('value', function(snapshot){
        console.log('!!! game.js user snapshot',snapshot.val())
      })
    })
}

  render() {
    console.log("state after setting it", this.state)
    return (
      <div>
        Hi
      </div>
    )
  }
}


