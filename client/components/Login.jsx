import React, { Component } from 'react'
import { FirebaseAuth } from './react-firebaseui';
import firebase, { firebaseui, auth, database, storage } from '~/fire'
import { Link } from 'react-router-dom'
import Redirect, { browserHistory } from 'react-router-dom'
import history from '../history'


export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      game: {},
      currentUser: '',
      judge: null,
      userPushKey: null,
      uiConfig: {
        // signInFlow: 'popup',
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        callbacks: {
          signInSuccess: (currentUser, credential, redirectURL) => {
            this.setState({ user: currentUser }, () => {
              let query = database.ref("users").orderByKey();
              let unique = true
              let userPush
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
                  userPush = database.ref('users').push({
                    [user.uid]: {
                      id: user.uid,
                      name: user.displayName,
                      email: user.email,
                      inGame: false,
                      gameId: '',
                      state: 'LOGGED_IN',
                      points: 0,
                      earnedSqueaks: {
                        Belch:"https://firebasestorage.googleapis.com/v0/b/squawk-868c7.appspot.com/o/soundeffects%2FBelch.mp3?alt=media&token=0b4d12f6-45d6-4f3f-96db-83b344c3b618",
                        ChipmunkLaugh: "https://firebasestorage.googleapis.com/v0/b/squawk-868c7.appspot.com/o/soundeffects%2FChipmunkLaugh.mp3?alt=media&token=22273582-4512-4497-a2eb-f1e5bdacee84",
                        LargeBubble: "https://firebasestorage.googleapis.com/v0/b/squawk-868c7.appspot.com/o/soundeffects%2FLargeBubble.mp3?alt=media&token=362263f2-762c-4dce-83ca-2c72e4eaa5d7",
                        MonsterGrowl: "https://firebasestorage.googleapis.com/v0/b/squawk-868c7.appspot.com/o/soundeffects%2FMonsterGrowl.mp3?alt=media&token=95ab6dac-070c-4162-bad2-7f59706e0a07",
                        PartyHorn: "https://firebasestorage.googleapis.com/v0/b/squawk-868c7.appspot.com/o/soundeffects%2FPartyHorn.mp3?alt=media&token=70c1fd42-f6c2-4338-b7c2-669a4fd5aac9",
                        SinglePew: "https://firebasestorage.googleapis.com/v0/b/squawk-868c7.appspot.com/o/soundeffects%2FSinglePew.mp3?alt=media&token=0d54a144-58d9-4871-8968-c14ee9a78d86"
                      }
                    }
                  })
                  database.ref(`users/${userPush.key}/${user.uid}`).update({ pushKey: userPush.key })
                  database.ref('pushkeys').update({ [user.uid]: userPush.key })
                }
              })
            })
            return false; // Avoid redirects after sign-in.
          }
        }
      }
    };
    this.handleSignOut = this.handleSignOut.bind(this)
    this.handleJoinGameClick = this.handleJoinGameClick.bind(this)
  }

  componentDidMount() {
    $(".collapsible-header").addClass("active");
    this.setState({user: auth.currentUser})
    database.ref('videos').update({ 
      0: 'https://firebasestorage.googleapis.com/v0/b/squawk-868c7.appspot.com/o/BigHero1.mov?alt=media&token=2290e962-cda7-431a-849f-ffc6a9578f57', 
      1: 'https://firebasestorage.googleapis.com/v0/b/squawk-868c7.appspot.com/o/Jurassic1.mov?alt=media&token=fb82dede-2320-43fa-a4e9-a4755b588cca', 
      2: 'https://firebasestorage.googleapis.com/v0/b/squawk-868c7.appspot.com/o/Pennywise1.mov?alt=media&token=b71fb497-0739-486f-8d45-4bbb054389e1', 
      3: 'https://firebasestorage.googleapis.com/v0/b/squawk-868c7.appspot.com/o/Rihanna1.mov?alt=media&token=af001971-8994-404e-bf01-e96a5bcc8db5' 
    })
    database.ref().update({
      firstLevelSqueaks: {
        Belch:"https://firebasestorage.googleapis.com/v0/b/squawk-868c7.appspot.com/o/soundeffects%2FBelch.mp3?alt=media&token=0b4d12f6-45d6-4f3f-96db-83b344c3b618",
        ChipmunkLaugh: "https://firebasestorage.googleapis.com/v0/b/squawk-868c7.appspot.com/o/soundeffects%2FChipmunkLaugh.mp3?alt=media&token=22273582-4512-4497-a2eb-f1e5bdacee84",
        LargeBubble: "https://firebasestorage.googleapis.com/v0/b/squawk-868c7.appspot.com/o/soundeffects%2FLargeBubble.mp3?alt=media&token=362263f2-762c-4dce-83ca-2c72e4eaa5d7",
        MonsterGrowl: "https://firebasestorage.googleapis.com/v0/b/squawk-868c7.appspot.com/o/soundeffects%2FMonsterGrowl.mp3?alt=media&token=95ab6dac-070c-4162-bad2-7f59706e0a07",
        PartyHorn: "https://firebasestorage.googleapis.com/v0/b/squawk-868c7.appspot.com/o/soundeffects%2FPartyHorn.mp3?alt=media&token=70c1fd42-f6c2-4338-b7c2-669a4fd5aac9",
        SinglePew: "https://firebasestorage.googleapis.com/v0/b/squawk-868c7.appspot.com/o/soundeffects%2FSinglePew.mp3?alt=media&token=0d54a144-58d9-4871-8968-c14ee9a78d86"
      },
      secondLevelSqueaks: {
        AngrySquirrel: 'https://firebasestorage.googleapis.com/v0/b/squawk-868c7.appspot.com/o/soundeffects%2FAngrySquirrel.mp3?alt=media&token=346a9936-93de-47bf-8c67-7634d6509862',
        BananaPeelSlip: "https://firebasestorage.googleapis.com/v0/b/squawk-868c7.appspot.com/o/soundeffects%2FBananaPeelSlip.mp3?alt=media&token=2bf80f04-2c73-40cd-bf35-8c1164fa6f0d",
        BillyGoatBleat: "https://firebasestorage.googleapis.com/v0/b/squawk-868c7.appspot.com/o/soundeffects%2FBillyGoatBleat.mp3?alt=media&token=9a08430a-e298-4fd7-a9a0-8047b98e6c57",
        Crickets: "https://firebasestorage.googleapis.com/v0/b/squawk-868c7.appspot.com/o/soundeffects%2FCrickets.mp3?alt=media&token=53ac89b0-a306-4e09-94f2-c490a739ed98"        
      },
      thirdLevelSqueaks: {
        DixieHorn: "https://firebasestorage.googleapis.com/v0/b/squawk-868c7.appspot.com/o/soundeffects%2FDixieHorn.mp3?alt=media&token=b08d8287-dc42-42ba-a559-da22eb567fc9",
        DoubleSnort: "https://firebasestorage.googleapis.com/v0/b/squawk-868c7.appspot.com/o/soundeffects%2FDoubleSnort.mp3?alt=media&token=025ff1c4-49ec-460d-9b79-7864876a7e66",
        DryCough: "https://firebasestorage.googleapis.com/v0/b/squawk-868c7.appspot.com/o/soundeffects%2FDryCough.mp3?alt=media&token=40c37580-f87f-4d1b-ac1f-2499f5b9b026",
        SickVillain: "https://firebasestorage.googleapis.com/v0/b/squawk-868c7.appspot.com/o/soundeffects%2FSickVillain.mp3?alt=media&token=65097573-4cf8-4778-8dce-52c13100cb5d",
        SillySnoring: "https://firebasestorage.googleapis.com/v0/b/squawk-868c7.appspot.com/o/soundeffects%2FSillySnoring.mp3?alt=media&token=661e349b-ac25-4398-8065-22fd77d4f648",
        StrangeGrowl: "https://firebasestorage.googleapis.com/v0/b/squawk-868c7.appspot.com/o/soundeffects%2FStrangeGrowl.mp3?alt=media&token=8a79c00f-dacb-48db-a12e-29af030eac24"        
      }
    })
  }

  handleJoinGameClick() {
    //put the user on the game in firebase as a judge
    let playerUser = this.state.currentUser
    history.push('/joingame')
  }

  handleStartGameClick() {
    let self = this
    let judgeUser = auth.currentUser
    let userInGameRef
    let gameKey
    let userKey
    let randomVideo

    database.ref('videos').once('value', function (snap) {
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
          database.ref(`users/${userKey}/${judgeUser.uid}`).update({ inGame: true, gameId: gameKey })
          //this works!
          history.push(`/game/${gameKey}`)
        })
      })
    document.getElementById('startGame').disabled = true
  }

  handleSignOut(evt) {
    evt.preventDefault()
    auth.signOut().then(() => {
      this.setState({ user: null })
      console.log('signed out')
    })
      .catch(error => {
        console.error(error)
      })
  }

  render() {
    console.log("STATE", this.state)
    if (!this.state.user) {
      return (
        <div className="startgame">
          <p>Please sign-in:</p>
          <FirebaseAuth uiConfig={this.state.uiConfig} firebaseAuth={auth} />
        </div>
      );
    }
    return (
      <div>
      <div className="start-btns">
        <button id="startGame" className="btn-large waves-effect waves-orange white" onClick={this.handleStartGameClick}>Start A New Game</button>
        <br />
        <button id="joinGame" className="btn-large waves-effect waves-orange white" onClick={this.handleJoinGameClick}>Join A Game</button>
        <br />
        <button id="signout" className="btn-large waves-effect waves-orange white" onClick={this.handleSignOut}>Sign Out</button>
      </div>
      <footer className="page-footer">
      <Link to='/instructions' id="instructions-link">How To Play</Link>
      <br />
      {
        this.state.user.uid &&
        <Link to={`/users/${this.state.user.uid}`}>Account Info</Link>
      }
      </footer>
      </div>
    );
  }
}

function randomCode() {
  let code = Math.floor(Math.random() * 100000)
  while (code < 10000) {
    code = Math.floor(Math.random() * 100000)
  }
  return code
}

