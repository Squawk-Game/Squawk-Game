import React, { Component } from 'react'
import { Route, Switch, Router } from 'react-router-dom'
import PlayerVideo from './components/PlayerVideo'
import StartGame from './components/StartGame'
import AddGamePlayers from './components/AddGamePlayers'
import AudioRecord from './components/AudioRecord'
import HostVideo from './components/HostVideo'
import Instructions from './components/Instructions'
import InstructionsModal from './components/InstructionsModal'
import Game from './components/Game'
import history from './history'
import JoinGame from './components/JoinGame'
import UserAccountPage from './components/UserAccountPage'

/**
 * COMPONENT
 */

const Routes = props => (
    <Router history={history}>
        <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/game/:gameId" component={Game}  />
        <Route path="/modal" component={InstructionsModal}  />
        <Route path="/player-video" component={PlayerVideo}  />
        <Route path="/instructions" component={Instructions}  />
        <Route exact path="/" component={StartGame} />
        <Route path="/addusers" component={AddGamePlayers} />
        <Route path="/joingame" component={JoinGame} />
        <Route path="/record" component={AudioRecord} />
        <Route path="/host-video" component={HostVideo} />
        <Route path="/users/:id" component={UserAccountPage} />
        </Switch>

    </Router>
)

export default Routes
