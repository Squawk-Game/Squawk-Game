import React from 'react';
import videojs from 'video.js'


export default class VideoPlayer extends React.Component {
  componentDidMount() {
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log('onPlayerReady', this)
      console.log('play api', this.play())
    });
  }
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }
  render() {

    return (
      <div data-vjs-player>
        <video ref={ node => this.videoNode = node } style={{width: 800}} className="video-js"></video>
      </div>
    )
  }
}
