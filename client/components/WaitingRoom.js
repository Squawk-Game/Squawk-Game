import React, { Component } from 'react'

import { database, auth } from '../../fire'


export default class WaitingRoom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playersInGame: null,
      judgeId: null
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleActionClick = this.handleActionClick.bind(this)
    this.handleDialogueClick = this.handleDialogueClick.bind(this)
    this.handleHorrorClick = this.handleHorrorClick.bind(this)
    this.handleAnimatedClick = this.handleAnimatedClick.bind(this)
  }

  componentDidMount() {
    let self = this
    let gameRef = database.ref(`games/${this.props.gameKey}`)
    gameRef.once("value")
      .then(function (snap) {
        self.setState({ playersInGame: snap.val().players, judgeId: snap.val().judgeId })
      })
      .then(function () {
        gameRef.on('child_changed', (snap) => {
          if (snap.key === 'players') {
            self.setState({ playersInGame: snap.val() })
          }
        })
      })
  }

  handleClick(event){
    event.preventDefault()
    database.ref(`games/${this.props.gameKey}`).update({judgeState: 'VIDEO_SENT'})
  }
  handleActionClick(event){
    event.preventDefault()
    database.ref(`games/${this.props.gameKey}`).update({video: 'https://firebasestorage.googleapis.com/v0/b/squawk-868c7.appspot.com/o/Jurassic1.mov?alt=media&token=fb82dede-2320-43fa-a4e9-a4755b588cca'})
    .then(()=>database.ref(`games/${this.props.gameKey}`).update({judgeState: 'VIDEO_SENT'}))
  }
  handleHorrorClick(event){
    event.preventDefault()
    database.ref(`games/${this.props.gameKey}`).update({video: 'https://firebasestorage.googleapis.com/v0/b/squawk-868c7.appspot.com/o/Pennywise1.mov?alt=media&token=b71fb497-0739-486f-8d45-4bbb054389e1'})
    .then(()=>database.ref(`games/${this.props.gameKey}`).update({judgeState: 'VIDEO_SENT'}))
  }
  handleDialogueClick(event){
    event.preventDefault()
    database.ref(`games/${this.props.gameKey}`).update({video: 'https://firebasestorage.googleapis.com/v0/b/squawk-868c7.appspot.com/o/Rihanna1.mov?alt=media&token=af001971-8994-404e-bf01-e96a5bcc8db5'})
    .then(()=>database.ref(`games/${this.props.gameKey}`).update({judgeState: 'VIDEO_SENT'}))
  }
  handleAnimatedClick(event){
    event.preventDefault()
    database.ref(`games/${this.props.gameKey}`).update({video: 'https://firebasestorage.googleapis.com/v0/b/squawk-868c7.appspot.com/o/BigHero1.mov?alt=media&token=2290e962-cda7-431a-849f-ffc6a9578f57'})
    .then(()=>database.ref(`games/${this.props.gameKey}`).update({judgeState: 'VIDEO_SENT'}))
  }

  render() {
    if (!this.state.playersInGame) {
      //Put spinning wheel here
      return <h1>Loading Game...</h1>
    } else {
      let arrPlayers = []
      for (let key in this.state.playersInGame) {
        if (key !== this.state.judgeId) arrPlayers.push(this.state.playersInGame[key])
      }
      return (
        <div>
        <br />
        <br />
          <h3>Welcome To Game #{this.props.code}</h3>
          <h4>Judge: {this.state.playersInGame[this.state.judgeId]}</h4>
          <h5>Squawkers:</h5>
          {arrPlayers.map(player => {
            return (
              <div key={player}>
                <li>{player}</li>

              </div>
            )
          })}
          <br />
          <div className="video-options">
          {this.props.isJudge &&
            ( 
              <div>
              <div className="categories">
                <button className="choice-btn btn-large waves-effect waves-orange blue" onClick={this.handleActionClick}>Action</button>
                <button className="choice-btn btn-large waves-effect waves-orange red" onClick={this.handleHorrorClick}>Horror</button>
                <br />
                <button className="choice-btn btn-large waves-effect waves-orange orange" onClick={this.handleDialogueClick}>Dialogue</button>
                <button className="choice-btn btn-large waves-effect waves-orange purple" onClick={this.handleAnimatedClick}>Animated</button>
              </div>

              <button className="random-vid-btn btn-large waves-effect waves-orange white" onClick={this.handleClick} >
                Send Random Video
              </button>
              </div>
            )
          }
          </div>
        </div>
      )
    }
  }
}

