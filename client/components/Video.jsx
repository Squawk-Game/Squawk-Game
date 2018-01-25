import React, { Component } from 'react'
import { storage } from '../../fire'

export default class Video extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    // let videoLink;
    // let storageRef = storage.ref("/Jurassic.mov")
    //       storageRef.getDownloadURL().then(function (url) {videoLink = url})

    return (
      <div>
      <video src="https://www.youtube.com/watch?v=G8KpPw303PY"/>
      </div>
     )
    }
  }
