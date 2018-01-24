import React, { Component } from 'react'
import {database} from '../../fire'

export default class Hi extends Component {
  constructor(props) {
    super(props)
  }
  render() {

    return (
      <div>
      <button onClick={evt => {
        evt.preventDefault()
        let ref = database.ref('users')
        ref.on("value", function(snapshot) {
          console.log(snapshot.val());
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });
      }} >BOOOOOP!</button>
      </div>
    )
  }
}

