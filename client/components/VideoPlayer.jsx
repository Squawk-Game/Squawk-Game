import React from 'react';
import videojs from 'video.js'
import AudioRecord from './AudioRecord'
import AudioPlayer from './AudioPlayer'
import { database } from '../../fire'

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loops: 1,
      renderRecord: false,
      gameKey: props.gameKey,
      winnerScreen: props.winnerScreen
    }
    this.handlePlay = this.handlePlay.bind(this)
    this.handlePause = this.handlePause.bind(this)
    this.handleWinner = this.handleWinner.bind(this)
  }
  componentDidMount() {
    let self = this
    let componentProps = this.props
    let user = false
    this.player = videojs(this.videoNode, this.props.options, function onPlayerReady() {
      if (componentProps.role === 'JUDGE') {
        console.log("Should be HostVideo")

      } else {
        console.log("This should be PlayerVideo")
        user = true
      }
      console.log(componentProps)
    })

    //looper
    let counter = componentProps.loops
    let flashingTimer
    let timerCountdown = 5
    let countdownSeconds = 16
    let countdownToNewRound
    let timer = () => {
      timerCountdown--
      if (timerCountdown <= 0) {
        document.getElementById('timer').innerHTML = ''
        clearInterval(flashingTimer)
        return
      }
      document.getElementById('timer').innerHTML = 'recording will start in ' + timerCountdown + ' seconds'
    }
    let countdown = () => {
      countdownSeconds--
      if (countdownSeconds <= 0) {
        document.getElementById('timer').innerHTML = ''
        clearInterval(countdownToNewRound)
        database.ref(`games/${self.state.gameKey}`).update({ judgeState: 'START_NEW_ROUND' })
        return
      }
      console.log(countdownSeconds)
      document.getElementById('timer').innerHTML = 'New round in :' + countdownSeconds
    }

    if (counter <= 12 && counter > 6) {
      countdownToNewRound = setInterval(countdown, 1000)
    }
    if (counter < 5) {
      this.player.on('ended', () => {
        counter--
        if (counter > 0) this.player.play()
        if ((counter === 0) && user) {
          flashingTimer = setInterval(timer, 1000)
          let recordingInterval = setInterval(function () {
            self.setState({ renderRecord: true })
            document.getElementsByClassName('AudioRecorder-button')[0].click()
            self.player.play()
            self.player.on('ended', () => {
              document.getElementsByClassName('AudioRecorder-button')[0].click()
              document.getElementsByClassName('AudioRecorder-download')[0].click()
              document.getElementsByClassName('recordbutton')[0].style.visibility = 'hidden'
              document.getElementsByClassName('urlive')[0].innerHTML = ''
              document.getElementById('waitingForJudge').innerHTML = 'Waiting for the judge'
            })
            clearInterval(recordingInterval)
          }, 5200)
        }
      })
    }
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  handlePlay() {
    if (!this.player.paused) this.player.currentTime(0);
    this.player.play();
  }
  handlePause() {
    this.player.pause();
  }

  handleWinner(audio) {
    console.log('HANDLE WINNER', audio)
    let winnerID = ''
    let winnerName = ''
    let winnerPushKey = ''
    let winnerPoints
    let gamePlayersRef = database.ref(`games/${this.props.gameKey}/players`)
    gamePlayersRef.once('value').then((players) => {
      for (var key in players.val()) {
        if (audio.toString().includes(key)) {
          console.log('YESSSSSS', key)
          winnerID = key
        }
      }
    })
    .then(() => {
      let pushKeyRef = database.ref(`pushkeys/${winnerID}`)
      pushKeyRef.once('value').then((snapshot) => {
        winnerPushKey = snapshot.val()
      })
        .then(() => {
          database.ref(`users/${winnerPushKey}/${winnerID}`).once('value')
            .then((snap) => {
              winnerName = snap.val().name
              winnerPoints = snap.val().points + 1
            })
            .then(() => {
              database.ref(`users/${winnerPushKey}/${winnerID}`).update({ points: winnerPoints })
            })
            .then(() => {
              this.setState({ winningAudio: { [winnerName]: audio } })
              let gameRef = database.ref(`games/${this.props.gameKey}`)
              gameRef.update({
                winningAudio: { [winnerName]: audio }
              })
              .then(() => {
                gameRef.update({
                  judgeState: 'WINNER_SENT'
                })
              })
            })
        })
    })
  }

  render() {
    return (
      <div>
        <div data-vjs-player>
          <video
            ref={node => this.videoNode = node}
            style={{ width: 800 }}
            className="video-js"
          />
        </div>
        <span id="timer" />
        <span id="waitingForJudge" />
        {
          this.props.audio && Array.isArray(this.props.audio) &&
          this.props.audio.map((oneAudio) => {
            return (
              <div key={oneAudio}>
                <AudioPlayer key={oneAudio} audio={oneAudio} onPlay={this.handlePlay} onPause={this.handlePause} />
                <button
                  className="btn waves-effect waves-orange white winner-btn choose-winner"
                  onClick={(evt) => {
                    evt.preventDefault()
                    this.handleWinner(oneAudio)
                  }}>CHOOSE WINNER
                </button>
              </div>
            )
          })
        }
        {
          (this.props.renderRecord || this.state.renderRecord)
          && <AudioRecord playFunc={this.handlePlay} />
        }
        {
          this.props.audio && !this.props.usingAudioPlayer &&
          (<audio src={this.props.audio} controls onPlay={this.handlePlay} onPause={this.handlePause}>BOOP</audio>)
        }
      </div>
    )
  }
}
