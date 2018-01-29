import React from 'react';
import videojs from 'video.js'
import AudioRecord from './AudioRecord'

export default class VideoPlayer extends React.Component {
  constructor(props){
    super(props)
    this.handlePlay = this.handlePlay.bind(this)
  }
  componentDidMount() {
    let propsAudio = this.props.audio
    this.player = videojs(this.videoNode, this.props.options, function onPlayerReady() {
     if (propsAudio) {
       this.audioTracks().addTrack(propsAudio)
       console.log("audiotracks", this.audioTracks()[0])
     }
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
      { this.props.renderRecord &&
        <AudioRecord playFunc={this.handlePlay}/>
      }
      </div>
    )
  }
}
