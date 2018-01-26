import React from 'react';
import videojs from 'video.js'

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      video: null
    }
    let videoOptions = {
      autoplay: true,
      controls: true,
      textTrackSettings: false,
      TextTrackDisplay: false,
      controlBar: true,
      errorDisplay: false,
      sources: [{
        get src() {return this.state.video},
        type: 'video/mp4'
      }]
    }
    this.props = {...videoOptions, ...this.props}
  }

  componentDidMount() {
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log('onPlayerReady', this)
    });
    let storageRef = storage.ref("/Rihanna.mp4")
    storageRef && storageRef.getDownloadURL().then((url) => {
      this.setState({ video: url })
    })
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  render() {
    if (!this.state.video) {
      return <div>Sorry, no video.</div>
    } else {
      return (
        <div data-vjs-player>
          <video ref={node => this.videoNode = node} style={{ width: 800 }} className="video-js" ></video>
        </div>
      )
    }

  }
}


