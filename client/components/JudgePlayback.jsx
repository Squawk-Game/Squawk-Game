import React, { Component } from 'react'
import { storage } from '../../fire'
import VideoPlayer from './VideoPlayer'


export default class JudgePlayback extends Component {
  constructor(props) {
    super(props)
    this.state = {
      audio: null
    }
  }

  componentDidMount() {
   let storageRef = storage.ref("/ahhhhhh")
   storageRef && storageRef.getDownloadURL().then((url)=>{
     this.setState({audio: url})
   })
  }

  render(){

    //Hardcoding links for the time being
console.log("Should be ahhh", this.state.audio)
    if (!this.state.audio) {
      return <div>Sorry, no audio.</div>
    } else {
      const videoJsOptions = {
        autoplay: false,
        controls: true,
        textTrackSettings: false,
        TextTrackDisplay: false,
        controlBar: true,
        errorDisplay: false,
        sources: [{
          src: 'https://firebasestorage.googleapis.com/v0/b/squawk-868c7.appspot.com/o/Rihanna.mp4?alt=media&token=12cbdc7d-67d8-48a0-9c55-cd4262e861bc',
          type: 'video/mp4'
        }]
      }
      return (<div>
        <VideoPlayer audio={this.state.audio} renderRecord={false} options={{...videoJsOptions}}/>
      </div>)
    }

    }
  }
