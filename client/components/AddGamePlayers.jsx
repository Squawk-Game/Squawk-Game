import React, { Component } from 'react'
import {database} from '../../fire'
//you are here because you are a judge and want to add players to your new game
export default class AddGamePlayers extends Component {
  constructor(props) {
    super(props)
    this.state = {
        game: {},
        judge: this.props.location.state.judge,
        code: randomCode()
    }
  }

  componentDidMount () {
    let gamesRef = database.ref("games")
    let gamePlayersRef = gamesRef.child(`${this.state.judge.uid}/players`)
    gamesRef.child(this.state.judge.uid).update({
      ['code']: this.state.code
    })
    gamePlayersRef.set({
      'player1':{
        uid: 'gobbledygook',
        audio: 'audio.file'
      }
    })
   // this.setState({code: randomCode()})
  }

  render(){
    return (
      <div>
        <h3>Invite your fellow Squawkers!</h3>
        <p>Your code is: {this.state.code} <br />
        TELL YOUR FRIENDS TO ENTER IT!
        </p>
      </div>
    )
  }
}

function randomCode(){
  let code = Math.floor(Math.random() * 100000)
  while (code < 10000){
    code = Math.floor(Math.random() * 100000)
  }
  return code
}
