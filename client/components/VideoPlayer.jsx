import React from 'react';
import videojs from 'video.js'
import AudioRecord from './AudioRecord'


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
      <div>
      <div data-vjs-player>
        <video ref={ node => this.videoNode = node } style={{width: 800}} className="video-js"></video>
      </div>
      <button onClick={evt => {
        //Currently, clicking this dummy button is in fact playing the vid. Need to figure out how to trigger this play from other components where the Player doens't live. Firebase?
        evt.preventDefault()
        this.player.play()
      }}> I'M A BUTTON </button>
      <AudioRecord />
      </div>
    )
  }
}
