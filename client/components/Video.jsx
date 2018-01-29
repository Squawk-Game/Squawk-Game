import React, { Component } from 'react'
import { storage } from '../../fire'
import VideoPlayer, {exportedPlayer} from './VideoPlayer'
import AudioRecord from './AudioRecord'

export default class Video extends Component {
  constructor(props) {
    super(props)
    this.state = {
      video: null
    }
  }

  componentDidMount() {
   let storageRef = storage.ref("/Rihanna.mp4")
   storageRef && storageRef.getDownloadURL().then((url)=>{
     this.setState({video: url})
   })
  }

  render(){

    //Hardcoding links for the time being

    if (!this.state.video) {
      return <div>Sorry, no video.</div>
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
      <VideoPlayer {...videoJsOptions}/>

      </div>)
    }

    }
  }
