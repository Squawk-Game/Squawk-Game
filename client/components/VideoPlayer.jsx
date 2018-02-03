import React from 'react';
import videojs from 'video.js'
import AudioRecord from './AudioRecord'
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
    function timer() {
      timerCountdown--
      if (timerCountdown <= 0) {
        document.getElementById('timer').innerHTML = ''
        clearInterval(flashingTimer)
        return
      }
      document.getElementById('timer').innerHTML = 'recording will start in ' + timerCountdown + ' seconds'
    }
    if (counter <= 12 && counter > 6){
      if (counter === 12) this.player.play()
      this.player.on('ended', () => {
        counter--
          if (counter > 7) this.player.play()
          if (counter === 7) {
            database.ref(`games/${self.state.gameKey}`).update({judgeState: 'GAME_CLOSED'})
          }
      })
    }
    if (counter < 5) {
      this.player.on('ended', () => {
        counter--
        if (counter > 0) this.player.play()
        if ((counter === 0 ) && user) {
          console.log('im gonna render record!!!!')
          flashingTimer = setInterval(timer, 1000)
          let recordingInterval = setInterval(function(){
                self.setState({renderRecord: true})
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
    this.player.play();
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
          (this.props.renderRecord || this.state.renderRecord)
          && <AudioRecord playFunc={this.handlePlay} />
        }
        {
          this.props.audio &&
          (<audio src={this.props.audio} controls onPlay={this.handlePlay} >BOOP</audio>)
        }
      </div>
    )
  }
}
