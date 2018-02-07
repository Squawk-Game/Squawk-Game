import React, { Component } from 'react'
import { storage, database } from '../../fire'
import videojs from 'video.js'
import VideoPlayer from './VideoPlayer'
import AudioPlayer from './AudioPlayer'

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
      gameState: '',
      winningAudio: null
    }
   // this.handleWinner = this.handleWinner.bind(this)
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

      if (this.state.gameState !== 'WINNER_SENT') gameRef.update({judgeState: 'WAITING_FOR_AUDIO'})
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
        console.log('I AM THE JUDGE!', snap.key)
        self.setState({gameState: snap.val()})
      }
      console.log('CHILD CHANGED IN HOSTVIDEO',snap, snap.key, snap.val(), self.state)
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
          console.log( 'STATE CHANGE' ,self.state)
        })
      })
    })
  }
/*
  handleWinner (audio){
    console.log('HANDLE WINNER', audio)
    let winnerID = ''
    let winnerName = ''
    let winnerPushKey = ''
    let winnerPoints
    let gamePlayersRef = database.ref(`games/${this.props.gameKey}/players`)
    gamePlayersRef.once('value').then((players) => {
      console.log('!!!!!!!!!!', players.val())
      for(var key in players.val()){
        console.log(key)
        if(audio.toString().includes(key)){
          console.log('YESSSSSS', key)
          winnerID = key
        }
      }
    }).then(() => {
      let pushKeyRef = database.ref(`pushkeys/${winnerID}`)
      pushKeyRef.once('value').then((snapshot)=>{
        winnerPushKey = snapshot.val()
      })
      .then(()=>{
        database.ref(`users/${winnerPushKey}/${winnerID}`).once('value')
        .then((snap)=>{
          winnerName = snap.val().name
          winnerPoints = snap.val().points + 1
        })
        .then(()=>{
          database.ref(`users/${winnerPushKey}/${winnerID}`).update({points: winnerPoints})
        })
        .then(()=>{
          console.log('WINNERNAME', winnerName)
          this.setState({winningAudio: {[winnerName]: audio}})
          let gameRef = database.ref(`games/${this.props.gameKey}`)
          gameRef.update({
            winningAudio: {[winnerName]: audio}
          }).then(()=>{
            gameRef.update({
              judgeState: 'WINNER_SENT'
            })
          })
        })
      })
    })
  }
*/
  render(){
    const videoJsOptions = {
      autoplay: false,
      loop: false,
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
    return (
      <div className="video-media" >
        {
          (this.state.gameState !== 'ALL_AUDIO_RECEIVED') &&
          <div>
            <br /><br />
          </div>
        }
        {
          this.state.video && 
          !this.state.userAudios.length && 
          <h3 className="judge-alerts">WAITING FOR YOUR FRIENDS TO GET SQUAWKIN</h3>
          /*<VideoPlayer role={'JUDGE'} renderRecord={false} options={{...videoJsOptions}}/>*/
        }
        {
          (this.state.gameState === 'ALL_AUDIO_RECEIVED') &&
          <h3 className="judge-alerts">ALL ENTRIES PRESENT</h3>
        }
        {
          this.state.video && this.state.userAudios.length &&
          <VideoPlayer 
            gameKey={this.props.gameKey}
            audio={this.state.userAudios}
            id={"judge-video"} 
            role={'JUDGE'} 
            usingAudioPlayer={true} 
            renderRecord={false} 
            options={{...videoJsOptions}}
          />
        }
        {
          //this.state.userAudios.map((useraudio)=>{
            // return (
            //   <div key={useraudio}>
            //     <form value={useraudio} className="judge-form">
            //       <AudioPlayer audio={useraudio}/>
            //       <button 
            //         className="btn waves-effect waves-orange white winner-btn choose-winner"
            //         onClick={(evt)=>{
            //           evt.preventDefault() 
            //           this.handleWinner(useraudio)
            //         }}>CHOOSE WINNER</button>
            //         <br />
            //     </form>
            //   </div>
            // )
          })
        }
      </div>
    )

    }

    }


