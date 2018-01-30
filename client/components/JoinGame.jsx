import React, { Component } from 'react'
import firebase, {firebaseui, auth, database} from '~/fire'
//import ReactCodeInput from 'react-code-input'

//const input = <ReactCodeInput type='number' fields={5} {...this.props} />

export default class JoinGame extends Component {
  constructor(props){
    super(props)
    this.state = {
      code: '',
      inputValue: ''
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    //this.updateInputValue = this.updateInputValue.bind(this)
  }

  componentDidMount(){
    if (auth.currentUser) console.log('auth current user', auth.currentUser)
    console.log('PROPS ARE ', this.props)
  }

  handleFormSubmit(event){
    event.preventDefault()
    //let userEnteredCode = event.target.value

    console.log('EVENT HAPPENED', event.target)


    let gamesRef = database.ref('games')

      let query = gamesRef.orderByKey();
     // let unique = true

      query.once("value").then((snapshot) => {
        console.log('SNAPSHOT IS ', snapshot)
        snapshot.forEach((childSnapshot) => {
          var key = childSnapshot.key;
          var childData = childSnapshot.val();
          console.log(key, childData)
          console.log('childData.code', childData.code)
          console.log('inpugtjvalue', this.state.inputValue)
          if (childData.code.toString() === this.state.inputValue) {
            console.log('child key ', key)
            let gamePlayersRef = gamesRef.child(`${key}/players`)
            gamePlayersRef.update({
              [auth.currentUser.displayName]: {
                audio: 'audio.file',
                uid: auth.currentUser.uid
              }
            })
          }
        })
      })
  }

  // updateInputValue(event){

  // }

  render(){
    return (
      <div>
        <h1>JOIN A GAME</h1>
        <form onSubmit={this.handleFormSubmit}>
        <input value={this.state.inputValue} type="text" onChange={evt =>
        this.setState({
          inputValue: evt.target.value
    })} />
          <input type="submit" value="Get Squawking" />
        </form>
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
