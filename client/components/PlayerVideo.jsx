import React, { Component } from 'react'
import { storage, database } from '../../fire'
import VideoPlayer from './VideoPlayer'
import AudioRecord from './AudioRecord'
import SoundEffectButton from './SoundEffectButton'

export default class PlayerVideo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      video: null,
      squeaks1: {},
      squeaks2: {},
      squeaks3: {},
      userInfo: {}
    }
  }

  componentDidMount() {
    let self = this
    let gameRef = database.ref(`games/${this.props.gameKey}/video`)
    gameRef.once('value').then((snap) => {
      this.setState({video: snap.val()})
    })

    let userPushKey
    database.ref(`pushkeys/${self.props.userId}`).once('value').then((snapshot) => {
      userPushKey = snapshot.val()
      console.log('USERPUSHKEY', userPushKey)
    })
    .then(() => {
      database.ref(`users/${userPushKey}/${self.props.userId}`).once('value').then((snap) => {
          self.setState({userInfo: snap.val()})
      })
    })

    database.ref('firstLevelSqueaks').once('value')
    .then((snapshot) => {
      self.setState({squeaks1: snapshot.val()}) 
    })
    .then(() => {
      database.ref('secondLevelSqueaks').once('value')
      .then((snap) => {
        self.setState({squeaks2: snap.val()})
      })
      .then(() => {
        database.ref('thirdLevelSqueaks').once('value').then((shot) => {
          self.setState({squeaks3: shot.val()})
        })
      })
    })
  }

  render(){
    console.log('PLAYER VIDEO STATE',this.state)
    if (!this.state.video) {
      return <div>Sorry, no video.</div>
    } else {
      const videoJsOptions = {
        controls: false,
        textTrackSettings: false,
        TextTrackDisplay: false,
        controlBar: false,
        errorDisplay: false,
        sources: [{
          src: this.state.video,
          type: 'video/mp4'
        }]
      }
      let level2 = Object.assign({}, this.state.squeaks1, this.state.squeaks2)
      let level3 = Object.assign({}, level2, this.state.squeaks3)

      return (
        <div className="player-video-content">
          <div className="player-video">
            <br />
            <br />
            <VideoPlayer role={'PLAYER'} loops={2} renderRecord={false} options={{...videoJsOptions, autoplay: true}}/>
          </div>
          <div className="user-squawks">
            <br />
            {this.state.userInfo && this.state.squeaks1 && this.state.squeaks2 && this.state.squeaks3 &&
              <ul className="player-vid-sounds">
              {
                (this.state.userInfo.points < 1) &&
                Object.keys(this.state.squeaks1).map((key) => {
                  return <SoundEffectButton key={key} label={key} sound={this.state.squeaks1[key]} />
                })
              }
              {
                (this.state.userInfo.points >= 1) && (this.state.userInfo.points < 3) &&
                Object.keys(level2).map((key) => {
                  return <SoundEffectButton key={key} label={key} sound={level2[key]} />
                })
              }
              {
                (this.state.userInfo.points >= 3) &&
                Object.keys(level3).map((key) => {
                  return <SoundEffectButton key={key} label={key} sound={level3[key]} />
                })
              }
            </ul>
            }
          </div>
        </div>
      )
    }

    }
  }
