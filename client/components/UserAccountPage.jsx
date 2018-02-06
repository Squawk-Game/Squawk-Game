
import React, { Component } from 'react'
import Link from 'react-router-dom'
import {database} from '../../fire'
import SoundEffectButton from './SoundEffectButton'

export default class UserAccountPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: props.match.params.id,
      soundEffectsObj: {},
      squeaks1: {},
      squeaks2: {},
      squeaks3: {}
    }
  }

  componentDidMount(){
    let self = this
    let userPushKey = null
    database.ref(`pushkeys/${self.state.userId}`).once('value').then((snapshot) => {
      userPushKey = snapshot.val()
    })
    .then(() => {
      database.ref(`users/${userPushKey}/${self.state.userId}`).once('value').then((snap) => {
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
        database.ref('secondLevelSqueaks').once('value').then((shot) => {
          self.setState({squeaks3: shot.val()})
        })
      })
    })
  }

  render() {
    return (
      <div>
        {this.state.userInfo &&
          <div>
            <h3>Welcome, {this.state.userInfo.name.split(' ')[0]}</h3>
            <ul>
              <li>Email: {this.state.userInfo.email}</li>
              <li>Squawks: {this.state.userInfo.points}</li>
            </ul>
            <h5>Earned Squeaks</h5>
            <ul>
              {
                (this.state.userInfo.points < 1) &&
                Object.keys(this.state.squeaks1).map((key) => {
                  return <SoundEffectButton key={key} label={key} sound={this.state.squeaks1[key]} />
                })
              }
              {
                (this.state.userInfo.points >= 1) && (this.state.userInfo.points < 3) &&
                Object.keys(this.state.squeaks2).map((key) => {
                  return <SoundEffectButton key={key} label={key} sound={this.state.squeaks2[key]} />
                })
              }
              {
                (this.state.userInfo.points >= 3) &&
                Object.keys(this.state.squeaks3).map((key) => {
                  return <SoundEffectButton key={key} label={key} sound={this.state.squeaks3[key]} />
                })
              }
            </ul>
          </div>
        }
      </div>
    )

}
}
