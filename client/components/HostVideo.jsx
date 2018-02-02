import React, { Component } from 'react'
import { storage, database } from '../../fire'
import videojs from 'video.js'
import VideoPlayer from './VideoPlayer'

export default class HostVideo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      audio: null,
      video: null,
      gameKey: props.gameKey,
      userAudios: [],
      usersReceived: [],
      numPlayers: 0,
      gameState: ''
    }
  }

  componentDidMount() {
    let self = this
    let gameRef = database.ref(`games/${this.props.gameKey}`)
    let audioRef = database.ref(`games/${this.props.gameKey}/audio`)
    let videoRef = database.ref(`games/${this.props.gameKey}/video`)

    videoRef.once('value').then((snap) => {
      console.log('SNAP', snap.val())
      self.setState({video: snap.val()})
    })
    .then(() => {
      gameRef.update({judgeState: 'WAITING_FOR_AUDIO'})
      console.log('STATE AFTER SETTING', self.state)
    })
    .then(() => {
      gameRef.once('value').then((snap) => {
        let numberOfPlayers = snap.child('players').numChildren()
        console.log('NUMBER OF PLAYERS', numberOfPlayers)
        self.setState({numPlayers: numberOfPlayers})
      })
    })

    gameRef.on('child_changed', (snap) => {
      if(snap.key === 'judgeState'){
        self.setState({gameState: snap.val()})
      }
    })
    
    audioRef.on('child_added', (snap) => {
      console.log('!!!!!! AUDIO ADDED BY PLAYER', snap, snap.val())
      let audio = snap.val()
      let pushkey
      let userid = snap.key
      database.ref(`pushkeys/${userid}`).once('value').then((snapshot) => {
        pushkey = snapshot.val()
      })
      .then(() => {
        console.log('PUSHKEY', pushkey, userid)
        database.ref(`users/${pushkey}/${userid}/name`).once('value')
        .then((usersnap) => {
          let userName = usersnap.val()
          console.log('USERSNAP', usersnap.val(), userName)
          self.setState({usersReceived: [...self.state.usersReceived, userName] })
          console.log('STATE!', self.state
          )
        })
        .then(()=>{
          self.setState({userAudios: [...self.state.userAudios, audio]})
        })
        .then(()=>{
          if(self.state.usersReceived.length === self.state.numPlayers-1) {
            gameRef.update({judgeState: 'ALL_AUDIO_RECEIVED'})
          }
        })
      })
    })
  }

  render(){
    const videoJsOptions = {
      autoplay: true,
      loop: true,
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
    let i = 0
    return (
      <div>
        {
          this.state.video && 
          !this.state.userAudios.length && 
          <VideoPlayer role={'JUDGE'} renderRecord={false} options={{...videoJsOptions}}/>
        }
        {(this.state.gameState === 'ALL_AUDIO_RECEIVED') &&
        <h3>ALL ENTRIES PRESENT</h3>
        }
        {
          this.state.userAudios.length && 
          this.state.userAudios.map((useraudio)=>{
            i++
            return (
              <div key={i}>
              <h3>{useraudio}</h3>
              <VideoPlayer role={'JUDGE'} audio={useraudio} renderRecord={false} options={{...videoJsOptions}}/>
              
              </div>
            )
          })
        }
      </div>
    )

    }

    }


