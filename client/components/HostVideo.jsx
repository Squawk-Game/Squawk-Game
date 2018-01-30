import React, { Component } from 'react'
import { storage } from '../../fire'
import videojs from 'video.js'
import VideoPlayer from './VideoPlayer'

export default class HostVideo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      audio: null,
      video: null
    }
  }

  componentDidMount() {
    //Need to replace AHHH with whatever the person uploaded
    let self = this
    Promise.all([
      storage.ref("/ahhhhhh").getDownloadURL(),
      storage.ref("/Jurassic.mp4").getDownloadURL()
    ]).then(function(urls) {
      self.setState({audio: urls[0], video: urls[1]})
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


