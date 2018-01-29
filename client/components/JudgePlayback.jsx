import React, { Component } from 'react'
import { storage } from '../../fire'
import videojs from 'video.js'
import VideoPlayer from './VideoPlayer'

export default class JudgePlayback extends Component {
  constructor(props) {
    super(props)
    this.state = {
      audio: null,
      video: null
    }
  }

  componentDidMount() {
    //Need to replace AHHH with whatever the person uploaded
   let soundRef = storage.ref("/ahhhhhh")
   soundRef && soundRef.getDownloadURL().then((url)=>{
     this.setState({audio: url})
   })
   let vidRef = storage.ref("/Jurassic.mp4")
   vidRef && vidRef.getDownloadURL().then((url)=>{
     this.setState({video: url})
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


