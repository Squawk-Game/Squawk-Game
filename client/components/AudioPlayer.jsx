import React, { Component } from 'react'
import { storage, database } from '../../fire'

export default class AudioPlayer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            audio: props.audio
        }
    }

    render() {
        return (
            <div>
            <audio src={this.props.audio} controls >HI</audio>
            </div>
        )
    }
}