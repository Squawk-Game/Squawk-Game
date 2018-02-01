import React, { Component } from 'react'
import { storage, database } from '../../fire'
import VideoPlayer from './VideoPlayer'
import AudioRecord from './AudioRecord'

export default class PlayerVideo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      video: null
    }
  }

  componentDidMount() {
  //  let storageRef = storage.ref("/Rihanna.mp4")
  //  storageRef && storageRef.getDownloadURL().then((url)=>{
  //    this.setState({video: url})
  //  })
    let gameRef = database.ref(`games/${this.props.gameKey}/video`)
    gameRef.once('value').then((snap) => {
      this.setState({video: snap.val()})
    })
  }

  render(){

    //Hardcoding links for the time being
   // let count = 0
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
      console.log('Rihanna link', this.state)
      return (<div>
       <VideoPlayer role={'PLAYER'} loops={2} renderRecord={false} options={{...videoJsOptions, autoplay: true}}/>
       {/*<VideoPlayer renderRecord={true} options={{...videoJsOptions, autoplay: false}}/>*/}
      </div>)
    }

    }
  }
