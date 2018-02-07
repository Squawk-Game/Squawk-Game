import React, { Component } from 'react'

import {database, auth} from '../../fire'
import DumbVideo from './DumbVideo'

import sizeMe from 'react-sizeme'
//import Confetti from 'react-confetti'
import PropTypes from 'prop-types'

import Confetti from 'react-dom-confetti'

const config = {
  angle: 90,
  spread: 250,
  startVelocity: 30,
  elementCount: 500,
  decay: 0.95
}

class WinnerPage extends React.PureComponent {
    constructor(props) {
    super(props)
    this.state = {
      audio: null,
      video: null,
      redirect: false,
      confetti: false
    }
  }

    componentDidMount() {
      console.log('width is ', this.state.proptypes)
    let self = this
    self.setState({confetti: true})
    Promise.all([
      database.ref(`games/${this.props.gameKey}/video`),
      //audio needs to be the player's id bc that's the name of their svideo
      database.ref(`games/${this.props.gameKey}/winningAudio`)
    ]).then((refs) => {
      let videoRef = refs[0]
      let winningAudioRef = refs[1]
      videoRef.on('value', (snap) => {
        self.setState({ video: snap.val() })
      })
      winningAudioRef.on('value', (snap) => {
        self.setState({ audio: snap.val()})
      })
      .then(() => {
        let thisUserAudioId = self.state.audio.indexOf()
      })
    })
  }

    render(){
    return (
      <div>
          <Confetti active={ this.state.confetti } config={ config } />
          <DumbVideo audio={this.state.audio} video={this.state.video} loops={9} gameKey={this.props.gameKey} />
      </div>
    )
  }
}

export default WinnerPage

// const DimensionedWinnerPage = sizeMe({
//   monitorHeight: true,
//   monitorWidth: true,
// })(class WinnerPage extends React.PureComponent {
//   static propTypes = {
//     size: PropTypes.shape({
//       width: PropTypes.number,
//       height: PropTypes.number,
//     }),
//   }
//     constructor(props) {
//     super(props)
//     this.state = {
//       audio: null,
//       video: null,
//       redirect: false,
//       proptypes: this.props.width
//     }
//   }

//     componentDidMount() {
//       console.log('width is ', this.state.proptypes)
//     let self = this
//     Promise.all([
//       database.ref(`games/${this.props.gameKey}/video`),
//       //audio needs to be the player's id bc that's the name of their svideo
//       database.ref(`games/${this.props.gameKey}/winningAudio`)
//     ]).then((refs) => {
//       let videoRef = refs[0]
//       let winningAudioRef = refs[1]
//       videoRef.on('value', (snap) => {
//         self.setState({ video: snap.val() })
//       })
//       winningAudioRef.on('value', (snap) => {
//         self.setState({ audio: snap.val()})
//       })
//       .then(() => {
//         let thisUserAudioId = self.state.audio.indexOf()
//       })
//     })
//   }

//     render(){
//     return (
//       <div>
//         <div className="winner-content" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 99 }}>
//           <Confetti {...this.props.size} />
//           </div>
//           <DumbVideo audio={this.state.audio} video={this.state.video} loops={9} gameKey={this.props.gameKey} />
//       </div>
//     )
//   }
// })

// export default DimensionedWinnerPage

// export default class WinnerPage extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       audio: null,
//       video: null,
//       redirect: false
//     }
//   }

//   componentDidMount() {
//     let self = this
//     Promise.all([
//       database.ref(`games/${this.props.gameKey}/video`),
//       //audio needs to be the player's id bc that's the name of their video
//       database.ref(`games/${this.props.gameKey}/winningAudio`)
//     ]).then((refs) => {
//       let videoRef = refs[0]
//       let winningAudioRef = refs[1]
//       videoRef.on('value', (snap) => {
//         self.setState({ video: snap.val() })
//       })
//       winningAudioRef.on('value', (snap) => {
//         self.setState({ audio: snap.val() })
//       })
//     })
//   }

//   render(){
//     return (
//       <div>
//         <div>
//           <h1>CONGRATS WINNER _______ !</h1>
//           <DumbVideo audio={this.state.audio} video={this.state.video} loops={12} gameKey={this.props.gameKey} /> {/* need to pass in video and audio props of winner */}
//         </div>
//       </div>
//     )
//   }
// }

// this will happen inside a set timeout for next round starting database.ref(`games/${this.props.gameKey}`).update({judgeState: 'GAME_CLOSED'})
