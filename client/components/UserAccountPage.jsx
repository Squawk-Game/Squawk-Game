
import React, { Component } from 'react'
import Link from 'react-router-dom'
import {database} from '../../fire'

export default class UserAccountPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
        userId: props.match.params.id
    }
  }

  componentDidMount(){
      let userPushKey = null
      database.ref(`pushkeys/${this.state.userId}`).once('value').then((snapshot) => {
        userPushKey = snapshot.val()
      })
      .then(() => {
        database.ref(`users/${userPushKey}/${this.state.userId}`).once('value').then((snap) => {
            this.setState({userInfo: snap.val()})
        })
      })
  }
  
  render() {
    return (
      <div>
        {this.state.userInfo &&
            <h3>Welcome, {this.state.userInfo.name.split(' ')[0]}</h3>
        }
      </div>
    )

}
}
