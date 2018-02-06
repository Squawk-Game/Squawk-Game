import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {database, auth} from '../../fire'
import AddGamePlayers from './AddGamePlayers'
import Login from './Login'
import { setTimeout } from 'timers';


export default class StartGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
       users: null,
       gif: '~/public/giphy.mp4',
       timing: 2
    }
  }
  componentDidMount(){
    setTimeout(() => {
      if(this.state.timing === 2 ) this.setState({timing: 1})
      if(this.state.timing === 1) this.setState({timing: 0})
    }
    , 3000)

  }
  render(){
    return (
      <div>
      {
        this.state.timing &&
        <div className="startgame" id="chicken">
          <iframe src="https://giphy.com/embed/l4pTiBbkdDYmsZ7Gw" width="480" height="720" frameBorder="0"  allowFullScreen></iframe>
        </div>
      }
      {
        !this.state.timing &&
        <div className="startgame">
          <br />
          <Login />
          <br />
        </div>
      }
      </div>
    )
  }
}
