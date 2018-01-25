import React from 'react';
import videojs from 'video.js'
//require('!style-loader!css-loader!video.js/dist/video-js.css')

export default class VideoPlayer extends React.Component {
  componentDidMount() {
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log('onPlayerReady', this)
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
