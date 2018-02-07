import React, { Component } from 'react'
import { storage, database } from '../../fire'

export default class AudioPlayer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            audio: props.audio
        }
        //this.handlePlay = this.handlePlay.bind(this)
    }
    handlePlay() {
        //console.log(document.getElementById('vjs_video_3_html5_api'))
        // document.getElementById('vjs_video_3_html5_api').addEventListener('play', ()=>{
        //     console.log('hiiii')
        // })
    }

    render() {
        return (
            <div>
                <audio src={this.props.audio} controls onPlay={this.props.onPlay} onPause={this.props.onPause}>HI</audio>
            </div>
        )
    }
}