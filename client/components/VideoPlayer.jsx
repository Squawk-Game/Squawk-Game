import React from 'react';
import videojs from 'video.js'
import AudioRecord from './AudioRecord'

export let exportedPlayer;
export default class VideoPlayer extends React.Component {
  constructor(props){
    super(props)
    this.handlePlay = this.handlePlay.bind(this)
  }
  componentDidMount() {
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      exportedPlayer = this
    });
  }
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  handlePlay() {
    this.player.play();
  }


  render() {

    return (
      <div>
      <div data-vjs-player>
        <video ref={ node => this.videoNode = node } style={{width: 800}} className="video-js"></video>
      </div>
      <AudioRecord playFunc={this.handlePlay}/>
      </div>
    )
  }
}
