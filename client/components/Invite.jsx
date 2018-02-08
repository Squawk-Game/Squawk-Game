import React, { Component } from 'react'
import { database } from '../../fire'
//you are here because you are a judge and want to add players to your new game
export default class Invite extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    event.preventDefault()
    let emailString = event.target.emails.value.split(',').map(email => email.trim()).join(',')
    let code = this.props.code.toString()
    let data = emailString + '-' + code

    fetch('https://us-central1-squawk-868c7.cloudfunctions.net/helloWorld', {
      method: 'post',
      mode: 'no-cors',
      body: data
    })
    database.ref(`games/${this.props.gameKey}`).update({ judgeState: 'WAITING_TO_START' })
  }

  render() {
    return (
      <div>
        <br />
        <br />
        <h5>Invite your friends via email:</h5>
        <div className="input-field">
          <form onSubmit={this.handleClick}>
            <input placeholder="ex. 'john@email.com, bob@email.com' " type="text" name="emails" placeholder="ex1@ex.com, ex2@ex.com" />
            <input className="btn waves-effect waves-orange white" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    )
  }
}
