import React, { Component } from 'react'
import { Route, Switch, Router } from 'react-router-dom'
import PlayerVideo from './components/PlayerVideo'
import StartGame from './components/StartGame'
import AddGamePlayers from './components/AddGamePlayers'
import AudioRecord from './components/AudioRecord'
import HostVideo from './components/HostVideo'
import Game from './components/Game'
import history from './history'
import JoinGame from './components/JoinGame'
/**
 * COMPONENT
 */

const Routes = props => (

    <Router history={history}>

        <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/game/:gameId" component={Game}  />
        <Route path="/player-video" component={PlayerVideo}  />
        <Route exact path="/" component={StartGame} />
        <Route path="/addusers" component={AddGamePlayers} />
        <Route path="/joingame" component={JoinGame} />
        <Route path="/record" component={AudioRecord} />
        <Route path="/host-video" component={HostVideo} />
        </Switch>

    </Router>
)

export default Routes
