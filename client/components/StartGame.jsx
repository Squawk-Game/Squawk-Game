import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {database, auth} from '../../fire'
import AddGamePlayers from './AddGamePlayers'
import Login from './Login'


export default class StartGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
       users: null
    }
  }
  componentDidMount(){
    // let gamesRef = database.ref('games')
    // gamesRef.on("value", function(snapshot) {
    //     console.log(snapshot.val()[1]);
    //   }, function (errorObject) {
    //     console.log("The read failed: " + errorObject.code);
    //   });
  }
  render(){
    return (
      <div>
        <h1>SQUAWK!</h1>
        {/* {this.state.me.name &&
          <Link to={'/addusers'}>START</Link>
        } */}
        {
          !this.state.users && <Login />
        }

        <br />
      </div>
    )
  }
}
