import React, { Component } from 'react'
import { Route, Switch, Router } from 'react-router-dom'
import Video from './components/Video'
import StartGame from './components/StartGame'
import AddGamePlayers from './components/AddGamePlayers'
import AudioRecord from './components/AudioRecord'
import history from './history'
/**
 * COMPONENT
 */

export default class Routes extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (

      <Router history={history}>

          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route path="/video" component={Video}  />
            <Route exact path="/" component={StartGame} />
            <Route path="/addusers" component={AddGamePlayers} />
            <Route path="/record" component={AudioRecord} />
          </Switch>

      </Router>
    )
  }
}

