import React, { Component } from 'react'
import {database} from '../../fire'
//you are here because you are a judge and want to add players to your new game
export default class AddGamePlayers extends Component {
  constructor(props) {
    super(props)
    this.state = {
        game: {}
    }
  }
  render(){
    return (
      <div>
        { console.log(this.state) }
      </div>
    )
  }
}
