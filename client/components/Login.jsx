import React, { Component } from 'react'
// import {database}  from '../../fire'
import firebase, { firebaseui, auth, database } from '~/fire'
import { Link } from 'react-router-dom'
import Redirect, { browserHistory } from 'react-router-dom'
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
      judge: null,
      userPushKey: null
    }
    this.handleStartGameClick = this.handleStartGameClick.bind(this)
    this.handleJoinGameClick = this.handleJoinGameClick.bind(this)
  }

  componentDidMount() {
    let userPush
    auth.onAuthStateChanged(currentUser => {
      //console.log('I AM THE CURRENT USER', currentUser)

      if (currentUser) {
        //console.log('I AM THE CURRENT USER IN IF STATEMENT', currentUser)
        this.setState({ user: currentUser }, () => {
          let query = database.ref("users").orderByKey();
          let unique = true
          //Promise.all([auth.currentUser]).then((user) => {
          //user = user[0]
          //if (this.state.user){

          //user is not being registered on the state properly
          //console.log()
          let user = this.state.user
          query.once("value").then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
              var key = childSnapshot.key;
              var childData = childSnapshot.val();
              if (childData.hasOwnProperty(user.uid)) {
                unique = false
              }
            })
            if (unique === true) {
              console.log('it is unique!!')
              userPush = database.ref('users').push({
                [user.uid]: {
                  id: user.uid,
                  name: user.displayName,
                  email: user.email,
                  inGame: false,
                  gameId: '',
                  state: 'LOGGED_IN'
                }
              })
              database.ref(`users/${userPush.key}/${user.uid}`).update({ pushKey: userPush.key })
            }
          }).then( () => {
            //when you log in for the first time, it sets your push on the state
            //we need to find a way to grab it also on log in.... haven't been able to
            console.log('USER PUSH', userPush)
            if (userPush) this.setState({userPushKey: userPush.key})
          })
        })
      }
      else {
        this.setState({ user: null })
      }
    })
  }

  handleStartGameClick() {
    let self = this
    let judgeUser = auth.currentUser
    let userInGameRef = database.ref(`users/${judgeUser.uid}/inGame`)
    let userRef = database.ref(`users/${this.state.userPushKey}/${judgeUser.uid}`)
    let key
    userInGameRef.once("value", function (snapshot) {
      if (snapshot.val() === true) {
        //If user is already in game, redirect them to Sorry component
        console.log("Sorry, you're already in a game")
      } else {
        //Make game bojects in FB and then redirect to game/:gameId
        console.log("Jumping to else in StartGameClick")
        let push = database.ref('games').push({
          judgeId: judgeUser.uid,
          video: '',
          players: {
            [judgeUser.uid]: judgeUser.displayName
          },
          judgeState: 'GAME_CREATED',
          audio: '',
          code: randomCode(),
          winningAudio: ''
        })
        key = push.key

        //THIS CURRENTLY ONLY WORKS WHEN YOU FIRST SIGN IN
        //IF YOU SIGN OUT AND SIGN BACK IN WE NEED A DIFFERENT CALL
        userRef.update({ inGame: true })
      }
      history.push(`/game/${key}`)
    })
    document.getElementById('startGame').disabled = true
  }

  handleJoinGameClick() {
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



  render() {
    console.log('CURRENT STATE', this.state)
    return (
      <div>
        {!this.state.user &&
          <div>
            <h3>Please Log In</h3>
            <div id="firebaseui-auth-container"></div>
          </div>
        }
        {this.state.user &&
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

function randomCode() {
  let code = Math.floor(Math.random() * 100000)
  while (code < 10000) {
    code = Math.floor(Math.random() * 100000)
  }
  return code
}
