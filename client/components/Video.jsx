import React, { Component } from 'react'
import {database} from '../../fire'

export default class Video extends Component {
  constructor(props) {
    super(props)
  }
  render() {

    return (
      <div>
      <button onClick={evt => {
        evt.preventDefault()

      }} >VIDEO COMPONENT!</button>
      </div>
    )
  }
}

