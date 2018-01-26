import React, { Component } from 'react'
import { Route, Switch, Router } from 'react-router-dom'
import VideoPlayer from './components/VideoPlayer'
import StartGame from './components/StartGame'
import AddGamePlayers from './components/AddGamePlayers'
import AudioRecord from './components/AudioRecord'
import history from './history'
/**
 * COMPONENT
 */

const Routes = props => (

    <Router history={history}>

        <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/video" component={VideoPlayer}  />
        <Route exact path="/" component={StartGame} />
        <Route path="/addusers" component={AddGamePlayers} />
        <Route path="/record" component={AudioRecord} />
        </Switch>

    </Router>
)

export default Routes
