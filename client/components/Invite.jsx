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
    let self = this
    event.preventDefault()
    let emailArr = event.target.emails.value.split(',').map(email => email.trim())
    // emailArr.forEach(function(email) {
    //   emailjs.send("ghsquawk", "squawk_invitation", {"recipient":email,"code": self.props.code})
    //   .then(function(response) {
    //    console.log("Code sent!", response.status, response.text)
    //   }, function(err) {
    //    console.log("FAILED. error=", err);
    //   })
    // })
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
