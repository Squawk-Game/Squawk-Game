import React, { Component } from 'react'
import {database} from '../../fire'
//you are here because you are a judge and want to add players to your new game
export default class AddGamePlayers extends Component {
  constructor(props) {
    super(props)
    this.state = {
        game: {},
        judge: this.props.location.state.judge
    }
  }

  componentDidMount () {
    let gamesRef = database.ref("games")
    let gameChildRef = gamesRef.child(`${this.state.judge.uid}/players`)
    gameChildRef.set({
      'player1':{
        uid: 'gobbledygook',
        audio: 'audio.file'
      }
    })
  }

  render(){
    return (
      <div>
        { console.log(this.state, this.props.location.state.judge) }
        <h3>Invite your fellow Squawkers!</h3>
      </div>
    )
  }
}
