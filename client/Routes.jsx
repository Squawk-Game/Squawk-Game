import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Router } from 'react-router-dom'
import Hi from './components/Hi'
/**
 * COMPONENT
 */
class Routes extends Component {


  render() {

    return (

      <Router >

          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route path="/hi" component={Hi} />
          </Switch>

      </Router>
    )
  }
}

/**
 * CONTAINER
 */


export default connect(null, null)(Routes)

