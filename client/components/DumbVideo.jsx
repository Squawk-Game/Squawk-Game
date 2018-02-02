import React, { Component } from 'react'
import { storage, database } from '../../fire'
import videojs from 'video.js'
import VideoPlayer from './VideoPlayer'

export default class DumbVideo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      audio: null,
      video: null,
      gameKey: props.gameKey,
      loops: 0
    }
  }

  componentDidMount() {
    //Need to replace AHHH with whatever the person uploaded
    let self = this
    let gameRef = database.ref(`games/${this.props.gameKey}`)
    let winningAudioRef = database.ref(`games/${this.props.gameKey}/winningAudio`)
    let videoRef = database.ref(`games/${this.props.gameKey}/video`)
    let audioObject

    videoRef.once('value').then((snap) => {
      self.setState({video: snap.val()})
    }).then(() => {
      winningAudioRef.once('value').then((snap) => {
        audioObject = snap.val()
      })
    })
    .then(() => {
      console.log(audioObject)
      for (var key in audioObject){
        self.setState({winnerName: key})
        self.setState({audio: audioObject[key]})
      }
    })

  }

  render(){
console.log('SELF PROPS BIDEO', this.props.video)
    //Hardcoding links for the time being
console.log("Fetched audio: ", this.state.audio)
    if (!this.state.audio) {
      return <div>Sorry, no audio.</div>
    } else {
      const videoJsOptions = {
        autoplay: false,
        controls: false,
        textTrackSettings: false,
        TextTrackDisplay: false,
        controlBar: false,
        errorDisplay: false,
        sources: [{
          src: this.state.video,
          type: 'video/mp4'
        }]
      }
      return (<div>
        <h1>CONGRATS {this.state.winnerName} !</h1>
        <VideoPlayer audio={this.state.audio} renderRecord={false} options={{...videoJsOptions}} loops={this.props.loops} gameKey={this.state.gameKey} winnerScreen={true} />
      </div>)

    }

    }
  }
