import React, { Component } from 'react'
import {database} from '../../fire'
//you are here because you are a judge and want to add players to your new game
export default class Invite extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event){
    event.preventDefault()
    database.ref(`games/${this.props.gameKey}`).update({judgeState: 'WAITING_TO_START'})
  }

  render(){
    return (
      <div>
        <button onClick={this.handleClick}>Sent invites</button>
      </div>
    )
  }
}
