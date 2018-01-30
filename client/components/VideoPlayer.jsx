import React from 'react';
import videojs from 'video.js'
import AudioRecord from './AudioRecord'

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props)
    this.handlePlay = this.handlePlay.bind(this)
  }
  componentDidMount() {
    let componentProps = this.props
    this.player = videojs(this.videoNode, this.props.options, function onPlayerReady() {
      if (componentProps.audio) {
      console.log("Should be HostVideo")
      } else {
        console.log("This should be PlayerVideo")


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
          <video
            ref={node => this.videoNode = node}
            style={{ width: 800 }}
            className="video-js"
          ></video>
        </div>
        {this.props.renderRecord && <AudioRecord playFunc={this.handlePlay} />}
        {this.props.audio &&
          (<audio src={this.props.audio} controls onPlay={this.handlePlay} >BOOP</audio>)
        }
      </div>
    )
  }
}
