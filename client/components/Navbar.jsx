
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {auth} from '../../fire'

export default class Navbar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
      <nav className="navbar">
        <h1 id="title">SQUAWK</h1>
      </nav>
      </div>
    )

}
}
