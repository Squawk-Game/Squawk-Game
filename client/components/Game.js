import React, { Component } from 'react'
import { database, auth } from '../../fire'
import Invite from './Invite'
import WaitingRoom from './WaitingRoom'
import WinnerPage from './WinnerPage'
import HostVideo from './HostVideo'
import PlayerVideo from './PlayerVideo'

//you are here because you are a judge and want to add players to your new game
const OPEN_GAME = 'OPEN_GAME'
const WAITING_TO_START = 'WAITING_TO_START'
const VIDEO_SENT = 'VIDEO_SENT'
const WAITING_FOR_AUDIO = 'WAITING_FOR_AUDIO'
const ALL_AUDIO_RECEIVED = 'ALL_AUDIO_RECEIVED'
const WINNER_SENT = 'WINNER_SENT'
const GAME_CLOSED = 'GAME_CLOSED'

export default class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gameId: this.props.match.params.gameId,
      gameState: OPEN_GAME,
      playerRole: null,
      code: null,
      currentUserId: null
    }
  }

  componentDidMount() {
    let self = this
    Promise.all([
      database.ref(`games/${this.state.gameId}/judgeId`),
      auth.currentUser,
      database.ref(`games/${this.state.gameId}/code`),
      database.ref(`games/${this.state.gameId}`)
    ]).then(function (gameUserCode) {
      gameUserCode[2].on("value", function (snapshot) {
        self.setState({ code: snapshot.val() })
      })
      gameUserCode[0].on("value", function (snapshot) {
        if (snapshot.val() === gameUserCode[1].uid) {
          self.setState({ playerRole: 'JUDGE' })
        } else {
          self.setState({ playerRole: 'PLAYER' })
        }
      })
      self.setState({ currentUserId: gameUserCode[1].uid })
      gameUserCode[3].on('child_changed', (snap) => {
        if (snap.key === 'judgeState') {
          self.setState({ gameState: snap.val() })
        }
      })
    })
    // let stateRef = database.ref(`games/${this.state.gameId}/judgeState`)
    // stateRef.on('child_changed', (snap) => {
    //   console.log('HELLLLOOOOOOO ')
    //   self.setState({gameState: snap.val()})
    // })
  }

  render() {
    console.log("state after setting it", this.state)
    //database.ref(`games/${this.state.gameId}/judgeState`).update({judgeState: 'hewlmefn'})

    /* CONDITIONALS FOR GAME LOGIC */

    //IF STATE IS OPEN_GAME
    return (
      <div>
        {this.state.playerRole === 'JUDGE' && this.state.gameState === 'OPEN_GAME' && <Invite gameKey={this.state.gameId} />}

        {this.state.gameState === WAITING_TO_START && <WaitingRoom isJudge={this.state.playerRole === 'JUDGE' ? true : false} />}


        {(this.state.gameState === VIDEO_SENT
          || this.state.gameState === WAITING_FOR_AUDIO)
          && this.state.playerRole === 'JUDGE'
          && <HostVideo gameKey={this.state.gameId}/>}
        {(this.state.gameState === VIDEO_SENT
          || this.state.gameState === WAITING_FOR_AUDIO)
          && this.state.playerRole === 'PLAYER'
          && <PlayerVideo gameKey={this.state.gameId}/>}
          
        {/*ALL AUdio received*/}


        {/* IF STATE IS GAME_CLOSED push to home for now and destroy game including destroying player audio and changing in game to false */}
        {this.state.gameState === GAME_CLOSED && history.push(`/`)}

        {this.state.gameState === WINNER_SENT && <WinnerPage gameKey={this.state.gameId} />}
        {/*game closed*/}
      </div>
    )
  }
}

//audio on game will have push key of userId as key and audio path as file
//audio gets associated with user

