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


  render() {

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

