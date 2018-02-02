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
    , 5000)
  }
  render(){
    console.log('!!',this.state.timing)
    return (
      <div>
      {
        this.state.timing &&
        <div>
          <iframe src="https://giphy.com/embed/l4pTiBbkdDYmsZ7Gw" width="320" height="480" frameBorder="0"  allowFullScreen></iframe><p><a href="https://giphy.com/gifs/l4pTiBbkdDYmsZ7Gw"></a></p>
        </div>
      }
      {
        !this.state.timing &&
        <div>
        <h1>SQUAWK!</h1>
        <Login />
        <br />
        </div>
      }
      </div>
    )
  }
}
