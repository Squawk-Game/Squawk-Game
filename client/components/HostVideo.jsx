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
      numPlayers: 0
    }
  }

  componentDidMount() {
    //Need to replace AHHH with whatever the person uploaded
    let self = this
    let gameRef = database.ref(`games/${this.props.gameKey}`)
    let audioRef = database.ref(`games/${this.props.gameKey}/audio`)
    // gameRef.once('value').then((snap) => {
    //   this.setState({video: snap.child('video').val()})
    // })
    let videoRef = database.ref(`games/${this.props.gameKey}/video`)
    videoRef.once('value').then((snap) => {
      console.log('SNAP', snap.val())
      self.setState({video: snap.val()})
    })
    // .then(() => {
    //   let audioURL = storage.ref("/ahhhhhh").getDownloadURL()
    //   return audioURL
    // })
    // .then((audioURL) => {
    //   self.setState({audio: audioURL})
    // })
    .then(() => {
      //SWITCH GAME STATE
      gameRef.update({judgeState: 'WAITING_FOR_AUDIO'})
      console.log('STATE AFTER SETTING', self.state)
    })

    // Promise.all([
    //   //storage.ref("/ahhhhhh").getDownloadURL(),
    //   database.ref(`games/${this.props.gameKey}/video`)
    //   //storage.ref("/Jurassic.mp4").getDownloadURL()
    // ]).then(function(urls) {
    //   let videoUrl
    //   console.log('!!!!PROMISES', urls[0], urls[1])
    //   urls[0].once('value').then((snap) => {
    //     console.log('SNAP', snap.val())
    //     self.setState({video: snap.val()})
    //   })
    // }).then(() => {
    //   //SWITCH GAME STATE
    //   console.log('STATE AFTER SETTING',self.state)
    //   gameRef.update({judgeState: 'WAITING_FOR_AUDIO'})
    // })
    
    gameRef.once('value').then((snap ) => {
      console.log(snap.child('players').length)
      this.setState({numPlayers: snap.child('players').length})
    })

    audioRef.on('child_added', (snap) => {
      console.log('!!!!!! AUDIO ADDED BY PLAYER', snap.val())
      this.setState({userAudios: [...this.state.userAudios, snap.val() ]}, function (){
        if(this.state.userAudios.length === (this.state.numPlayers - 1)) {
          gameRef.update({judgeState: 'ALL_AUDIO_RECEIVED'})
        }
      })
    })

  }

  render(){
    console.log('HOST VIDEO STATE', this.state)
    //Hardcoding links for the time being
    console.log("Fetched audio: ", this.state.audio, 'STATE VIDEO', this.state.video)
    // if (!this.state.audio) {
    //   return <div>Sorry, no audio.</div>
    // } else {
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


