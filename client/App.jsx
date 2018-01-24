import Hi from './components/Hi'
import React, { Component } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div>
      <div>🔥 Ready.</div>
      <Hi />
      </div>
    )

}
}
