import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Router } from 'react-router-dom'
import Hi from './components/Hi'
import Video from './components/Video'
import AudioRecord from './components/AudioRecord'
import history from './history'
/**
 * COMPONENT
 */

class Routes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      videos: {
        jurassic: 'https://firebasestorage.googleapis.com/v0/b/squawk-868c7.appspot.com/o/Jurassic.mp4?alt=media&token=32869cf5-2bf8-47b0-b133-38b62c2ebc8e',
        rihanna: 'https://firebasestorage.googleapis.com/v0/b/squawk-868c7.appspot.com/o/Rihanna.mp4?alt=media&token=12cbdc7d-67d8-48a0-9c55-cd4262e861bc'
      }
    }
  }

  render() {
    console.log('ROOTS', this.props)
    return (

      <Router history={history}>

          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route path="/hi" component={Hi} />
            <Route path="/video" component={Video} />
            <Route path="/record" component={AudioRecord} />
          </Switch>

      </Router>
    )
  }
}

/**
 * CONTAINER
 */


export default connect(null, null)(Routes)

