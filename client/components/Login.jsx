import React, { Component } from 'react'
// import {database}  from '../../fire'
import firebase, { firebaseui, auth, database, storage } from '~/fire'
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

      if (currentUser) {

        this.setState({ user: currentUser }, () => {
          let query = database.ref("users").orderByKey();
          let unique = true

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
              database.ref('pushkeys').update({ [user.uid]: userPush.key })
            }
          })
        })
      }
      else {
        this.setState({ user: null })
      }
    })
    database.ref('videos').update({0: 'https://firebasestorage.googleapis.com/v0/b/squawk-868c7.appspot.com/o/BigHero1.mov?alt=media&token=2290e962-cda7-431a-849f-ffc6a9578f57', 1: 'https://firebasestorage.googleapis.com/v0/b/squawk-868c7.appspot.com/o/Jurassic1.mov?alt=media&token=fb82dede-2320-43fa-a4e9-a4755b588cca', 2: 'https://firebasestorage.googleapis.com/v0/b/squawk-868c7.appspot.com/o/Pennywise1.mov?alt=media&token=b71fb497-0739-486f-8d45-4bbb054389e1', 3: 'https://firebasestorage.googleapis.com/v0/b/squawk-868c7.appspot.com/o/Rihanna1.mov?alt=media&token=af001971-8994-404e-bf01-e96a5bcc8db5'})  }

  handleStartGameClick() {
    let self = this
    let judgeUser = auth.currentUser
    let userInGameRef
    let gameKey
    let userKey
    let randomVideo

    database.ref('videos').once('value', function(snap) {
      randomVideo = snap.val()[Math.floor(Math.random() * 3)]
    })
    database.ref('pushkeys').once('value', function (snap) {
      userKey = snap.child(judgeUser.uid).val()
    })
    .then(() => {
      userInGameRef = database.ref(`users/${userKey}/${judgeUser.uid}/inGame`)
    })
    .then(() => {
      userInGameRef.once("value", function (snapshot) {
        if (snapshot.val() === true) {
          //If user is already in game, redirect them to Sorry component
          console.log("Sorry, you're already in a game")
        } else {

          let push = database.ref('games').push({
            judgeId: judgeUser.uid,
            video: randomVideo,
            players: {
              [judgeUser.uid]: judgeUser.displayName
            },
            judgeState: 'OPEN_GAME',
            audio: '',
            code: randomCode(),
            winningAudio: ''
          })
          gameKey = push.key
        }
        database.ref(`users/${userKey}/${judgeUser.uid}`).update({inGame: true, gameId: gameKey})
        //this works!

        history.push(`/game/${gameKey}`)
      })
    })
    document.getElementById('startGame').disabled = true
  }

  handleJoinGameClick() {
    //put the user on the game in firebase as a judge on join game
    let playerUser = this.state.currentUser
    history.push('/joingame')
  }

  handleSignOutClick() {
    let self = this
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

