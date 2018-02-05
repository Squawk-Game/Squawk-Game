import React, { Component } from 'react'
import firebase, { firebaseui, auth, database } from '~/fire'
import history from '../history'

//import ReactCodeInput from 'react-code-input'

//const input = <ReactCodeInput type='number' fields={5} {...this.props} />

export default class JoinGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: '',
      inputValue: '',
      user: null
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    //this.updateInputValue = this.updateInputValue.bind(this)
  }



  handleFormSubmit(event) {
    event.preventDefault()
    //let userEnteredCode = event.target.value

    console.log('EVENT HAPPENED', event.target)

    let userKey;
    let gameKey;
    let gamesRef = database.ref('games')
    let currentUser = auth.currentUser
    let query = gamesRef.orderByKey();
    // let unique = true
    database.ref('pushkeys').once('value', function (snap) {
      userKey = snap.child(currentUser.uid).val()
    }).then(() => {
      query.once("value").then((snapshot) => {
        console.log('SNAPSHOT IS ', snapshot)
        snapshot.forEach((childSnapshot) => {
          gameKey = childSnapshot.key;
          var childData = childSnapshot.val();
          if (childData.code && childData.code.toString() === this.state.inputValue) {
            let gamePlayersRef = gamesRef.child(`${gameKey}/players`)
            gamePlayersRef.update({
              [auth.currentUser.uid]: auth.currentUser.displayName
            })
            database.ref(`users/${userKey}/${currentUser.uid}`).update({
              inGame: true, gameId: gameKey
            })
            history.push(`/game/${gameKey}`)
          }
        })
      })
    })
  }


  render() {
    console.log("state inside JoinGame", this.state)
    return (
      <div>
        <h5>Enter your game code to squawk!</h5>
        <div className="input-field">
        <form onSubmit={this.handleFormSubmit}>
          <input placeholder="Game Code" value={this.state.inputValue} type="text" onChange={evt =>
            this.setState({
              inputValue: evt.target.value
            })} />
          <input type="submit" className="btn waves-effect waves-orange white" value="Get Squawking" />
        </form>
        </div>
      </div>
    )
  }
}

// const JoinGame = (props) => {
//   //console.log(props)
//   return (
//     <h1>JOIN A GAME</h1>
//   )
// }

//export default JoinGame
