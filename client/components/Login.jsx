import React, { Component } from 'react'
//import {database}  from '../../fire'
import firebase, {firebaseui} from '~/fire'

let uiConfig = {
  signInSuccessUrl: '/',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  //tosUrl: '<your-tos-url>'
};

let ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
        game: {}
    }
  }

  render(){
    return (
        <div>
        <h3>Please Log In</h3>
      <div id="firebaseui-auth-container"></div>
      </div>
    )
  }
}
