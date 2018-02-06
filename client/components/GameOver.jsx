import React, { Component } from 'react'

import {database, auth} from '../../fire'


export default class GameOver extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gameKey: this.props.gameKey
    }
  }
  componentDidMount(){

  }

  render(){
    return (
      <div>
        <div>
          <h3>Game Over!</h3>
        </div>
      </div>
    )
  }
}
