import React, { Component } from 'react'
// import {database}  from '../../fire'
import firebase, {firebaseui, auth, database} from '~/fire'
import {Link} from 'react-router-dom'

let uiConfig = {
  signInSuccessUrl: '/',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  //tosUrl: '<your-tos-url>'
};

let ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);


export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
        game: {},
        users: null,
        judge: null
    }
    this.handleStartGameClick = this.handleStartGameClick.bind(this)
    this.handleJoinGameClick = this.handleJoinGameClick.bind(this)
  }
  componentDidMount(){
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log('CURRENT USER OBJECT', user)
        this.setState({users: user.displayName})
        console.log(this.state)
      }
      else console.log('where is user??')
    })
  }
  handleStartGameClick () {
    //put the user on the game in firebase as a judge

    // ASYNC PROBLEMS IN UPDATING STATE IN PROGRESS
    let judgeUser = auth.currentUser
    this.setState(function(state, {judge: judgeUser}){
      console.log(this.state.judge)
      let gamesRef = database.ref('games')
      gamesRef.push({
        name: this.state.judge.uid,
        players: null,
        video: ''
      })
      return {}
    })
  }

  handleJoinGameClick () {
    //put the user on the game in firebase as a judge
  }

  render(){
    return (
      <div>
      {!this.state.users &&
         <div>
          <h3>Please Log In</h3>
          <div id="firebaseui-auth-container"></div>
        </div>
      }

      {this.state.users &&
       <div>
         <button id="startGame" onClick={this.handleStartGameClick}>Start Game</button>
         <button id="joinGame" onClick={this.handleJoinGameClick}>Join Game</button>
        </div>
      }
          {/* <Link to={'/'}>GET SQUAWKWARD</Link> */}


      </div>
    )
  }
}
