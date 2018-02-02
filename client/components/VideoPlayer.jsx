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
          self.setState({renderRecord: true})
          document.getElementsByClassName('AudioRecorder-button')[0].click()
          this.player.play()
          this.player.on('ended', () => {
            document.getElementsByClassName('AudioRecorder-button')[0].click()
            document.getElementsByClassName('AudioRecorder-download')[0].click()
          })
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
    console.log('IMMMMMMMMMM IN THE DANG VIDEO PLAYerRRRRR`1222111!!!!!!!!!')
    console.log('DOCUMENT CLASSNAME ghost-button in video player', document.getElementsByClassName('ghost-button'))
    return (
      <div>
        <div data-vjs-player>
          <video
            ref={node => this.videoNode = node}
            style={{ width: 800 }}
            className="video-js"
          ></video>
        </div>
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
