import React, { Component } from 'react'
// import {database}  from '../../fire'
import firebase, {firebaseui, auth, database} from '~/fire'
import {Link} from 'react-router-dom'
import Redirect, {browserHistory} from 'react-router-dom'
import history from '../history'

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
ui.start('#firebaseui-auth-container', uiConfig);

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
        game: {},
        currentUser: '',
        judge: null
    }
    this.handleStartGameClick = this.handleStartGameClick.bind(this)
    this.handleJoinGameClick = this.handleJoinGameClick.bind(this)
  }

  componentDidMount(){
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({currentUser: user})
        this.setState({users: user})
        let query = database.ref("users").orderByKey();
        let unique = true

        query.once("value").then(function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            //console.log(unique)
            var key = childSnapshot.key;
            var childData = childSnapshot.val();
           // console.log(key, childData.userUid, user.uid)
            if (childData.userUid === user.uid) {unique = false}
          })
          if (unique === true){
            //console.log('it is unique!!')
            database.ref('users').push({
                  name: user.displayName,
                  email: user.email,
                  userUid: user.uid
                })
          }
        })
      }
      else { console.log('where is user??') }

    })
  }

  handleStartGameClick () {
    let judgeUser = auth.currentUser

    this.setState({judge: {name: judgeUser.displayName, uid: judgeUser.uid}}, () => {
      let gamesRef = database.ref('games')

      let query = gamesRef.orderByKey();
      let unique = true

      query.once("value").then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          var key = childSnapshot.key;
          var childData = childSnapshot.val();
          console.log(key, childData)
          if (childData.name === this.state.judge.uid) {unique = false}
        })
        if (unique === true){
          console.log('it is unique!!')
          gamesRef.set({[this.state.judge.uid]: {
            name: this.state.judge.uid,
            judge: this.state.judge,
            players: '',
            video: ''
          }})
        }
      })
      history.push('/addusers', {judge: this.state.judge}) //once you've added the game to firebase, navigate to add users
      return {}
      }
    )
    document.getElementById('startGame').disabled = true
  }

  handleJoinGameClick () {
    //put the user on the game in firebase as a judge
    let playerUser = this.state.currentUser
    history.push('/joingame')
  }

  handleSignOutClick() {
    auth.signOut().then(() => {
      console.log('signed out')
    })
    .catch(error => {
      console.error(error)
    })
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
         <button id="signout" onClick={this.handleSignOutClick}>Sign Out</button>
        </div>
      }
          {/* <Link to={'/'}>GET SQUAWKWARD</Link> */}


      </div>
    )
  }
}
