import React, { Component } from 'react'
import { database, auth } from '../../fire'
import Invite from './Invite'
import WaitingRoom from './WaitingRoom'
import WinnerPage from './WinnerPage'
import HostVideo from './HostVideo'
import PlayerVideo from './PlayerVideo'
import StartNewRound from './StartNewRound'
import GameOver from './GameOver'

//you are here because you are a judge and want to add players to your new game
const OPEN_GAME = 'OPEN_GAME'
const WAITING_TO_START = 'WAITING_TO_START'
const VIDEO_SENT = 'VIDEO_SENT'
const WAITING_FOR_AUDIO = 'WAITING_FOR_AUDIO'
const ALL_AUDIO_RECEIVED = 'ALL_AUDIO_RECEIVED'
const WINNER_SENT = 'WINNER_SENT'
const START_NEW_ROUND = 'START_NEW_ROUND'
const GAME_CLOSED = 'GAME_CLOSED'


export default class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gameId: this.props.match.params.gameId,
      gameState: null,
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
      database.ref(`games/${this.state.gameId}`),
      database.ref(`games/${this.state.gameId}/judgeState`)
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
      gameUserCode[4].on("value", function(snapshot) {
        self.setState({gameState: snapshot.val()})
      })
      self.setState({ currentUserId: gameUserCode[1].uid })
      gameUserCode[3].on('child_changed', (snap) => {
        if (snap.key === 'judgeState') {
          self.setState({ gameState: snap.val() })
        }
      })
    })
  }

  render() {
    console.log("state after setting it", this.state)
    //database.ref(`games/${this.state.gameId}/judgeState`).update({judgeState: 'hewlmefn'})

    /* CONDITIONALS FOR GAME LOGIC */

    //IF STATE IS OPEN_GAME
    return (
      <div>
        {this.state.playerRole === 'JUDGE' && this.state.gameState === 'OPEN_GAME' && <Invite gameKey={this.state.gameId} code={this.state.code} />}

        {this.state.gameState === WAITING_TO_START && <WaitingRoom code={this.state.code} gameKey={this.state.gameId} isJudge={this.state.playerRole === 'JUDGE'} />}


        {(this.state.gameState === VIDEO_SENT
          || this.state.gameState === WAITING_FOR_AUDIO
          || this.state.gameState === ALL_AUDIO_RECEIVED)
          && this.state.playerRole === 'JUDGE'
          && <HostVideo gameKey={this.state.gameId}/>}
        {(this.state.gameState === VIDEO_SENT
          || this.state.gameState === WAITING_FOR_AUDIO
          || this.state.gameState === ALL_AUDIO_RECEIVED)
          && this.state.playerRole === 'PLAYER'
          && <PlayerVideo gameKey={this.state.gameId}/>}

        {/*ALL AUdio received*/}

        {this.state.gameState === WINNER_SENT && <WinnerPage gameKey={this.state.gameId} />}
        {/*game closed*/}

        {/* IF STATE IS GAME_CLOSED push to home for now and destroy game including destroying player audio and changing in game to false */}
        {this.state.gameState === START_NEW_ROUND && <StartNewRound gameKey={this.state.gameId} />}

        {/* Game Over */}
        {this.state.gameState === GAME_CLOSED && <GameOver gameKey={this.state.gameId} />}

      </div>
    )
  }
}

//audio on game will have push key of userId as key and audio path as file
//audio gets associated with user

