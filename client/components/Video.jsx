import React, { Component } from 'react'
import { storage } from '../../fire'
import VideoPlayer from './VideoPlayer'
// require('!style-loader!css-loader!video.js/dist/video-js.css')

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

    // let vid;
    // let storageRef = storage.ref("/Jurassic.mp4")
    // storageRef && storageRef.getDownloadURL().then((url)=>{
    //   console.log(url)
    //   vid = url
    // })

    //Hardcoding links for the time being

    if (!this.state.video) {
      return <div>Sorry, no video.</div>
    } else {
      const videoJsOptions = {
        autoplay: true,
        controls: true,
        sources: [{
          src: this.state.video,
          type: 'video/mp4'
        }]
      }
      return (<div style={{width: 2}}>
      <VideoPlayer {...videoJsOptions}/>
      </div>)
    }

    }
  }
