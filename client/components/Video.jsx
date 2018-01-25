import React, { Component } from 'react'
import { storage } from '../../fire'
import VideoPlayer from './VideoPlayer'
// require('!style-loader!css-loader!video.js/dist/video-js.css')

export default class Video extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let vid;
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
        src:`https://firebasestorage.googleapis.com/v0/b/squawk-868c7.appspot.com/o/Jurassic.mp4?alt=media&token=32869cf5-2bf8-47b0-b133-38b62c2ebc8e'=`,
        type: 'video/mp4'
      }]
    }

    return <VideoPlayer { ...videoJsOptions } />
    }
  }
