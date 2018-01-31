import React, { Component } from 'react'
import { storage, database } from '../../fire'
import videojs from 'video.js'
import VideoPlayer from './VideoPlayer'

export default class HostVideo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      audio: null,
      video: null,
      gameKey: props.gameKey
    }
  }

  componentDidMount() {
    //Need to replace AHHH with whatever the person uploaded
    let self = this
    let gameRef = database.ref(`games/${this.props.gameKey}`)
    Promise.all([
      storage.ref("/ahhhhhh").getDownloadURL(),
      storage.ref("/Jurassic.mp4").getDownloadURL()
    ]).then(function(urls) {
      self.setState({audio: urls[0], video: urls[1]})
    }).then(() => {
      //SWITCH GAME STATE
      gameRef.update({judgeState: 'WAITING_FOR_AUDIO'})
    })

    gameRef.on('child_added', (snap) => {

    })

  }

  render(){

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
        <VideoPlayer audio={this.state.audio} renderRecord={false} options={{...videoJsOptions}}/>
      </div>)

    }

    }
  }
