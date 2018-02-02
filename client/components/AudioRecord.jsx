import React, {Component} from 'react'
import AudioRecorder from './AudioRecorder/AudioRecorder.js'
import {auth} from '../../fire'
// import Tone from 'tone'

// const AudioRecord = AudioRecorder
// export default AudioRecord

export default class AudioRecord extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: auth.currentUser
    }
  }

  render() {

    return <AudioRecorder playFunc={this.props.playFunc} user={this.state.user} />
  }
}

// export default class AudioRecord extends Component {
//     constructor(props) {
//         super(props)

//         this.mic = new Tone.UserMedia()

//         this.handleRecordClick = this.handleRecordClick.bind(this)
//         this.handleStopClick = this.handleStopClick.bind(this)
//         this.handlePlayClick = this.handlePlayClick.bind(this)
//     }

//     handleRecordClick(event) {
//         this.mic.open()
//             .then(() => {
//                 console.log('Recording')
//             })
//             .catch(err => {
//                 console.error(err)
//             })
//     }

//     handleStopClick(event) {
//         this.mic.close()
//         console.log('No longer recording')
//     }

//     handlePlayClick(event) {

//     }

//     render() {
//         return (
//             <div>
//                 <button onClick={this.handleRecordClick}>
//                     Record
//                 </button>

//                 <button onClick={this.handleStopClick}>
//                     Stop recording
//                 </button>

//                 <button onClick={this.handlePlayClick}>
//                     Play your recording back
//                 </button>
//             </div>
//         )
//     }
// }
