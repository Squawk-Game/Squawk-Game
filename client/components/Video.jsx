import React, { Component } from 'react'
import { storage } from '../../fire'
import VideoPlayer from './VideoPlayer'
// require('!style-loader!css-loader!video.js/dist/video-js.css')

export default class Video extends Component {
  constructor(props) {
    super(props)
    this.state = {
      videos: props.videos
    }
  }
  render(){
    
    // let vid;
    // let storageRef = storage.ref("/Jurassic.mp4")
    // storageRef && storageRef.getDownloadURL().then((url)=>{
    //   console.log(url)
    //   vid = url
    // })

    //Hardcoding links for the time being
    const videoJsOptions = {
      autoplay: true,
      controls: true,
      sources: [{
        src: this.state.videos.jurassic,
        type: 'video/mp4'
      }]
    }
    return <VideoPlayer { ...videoJsOptions }/>
    }
  }
