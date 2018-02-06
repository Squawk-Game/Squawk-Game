
import React, { Component } from 'react'

export default class SoundEffectButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
        soundURL: props.sound,
        soundLabel: props.label
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(evt) {
    evt.preventDefault()
    document.getElementById(this.state.soundLabel).play()
  }
  
  render() {
    return (
      <div>
        {this.state.soundURL &&
          <div>
            <button
                className="btn wave-effect wave-orange white"
                onClick={this.handleClick}>
                {this.state.soundLabel}
            </button>
            <audio
                id={this.state.soundLabel}
                src={this.state.soundURL} />
          </div>
        }
      </div>
    )
}
}
