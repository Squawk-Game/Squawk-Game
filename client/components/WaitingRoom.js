import React, { Component } from 'react'

import { database, auth } from '../../fire'


export default class WaitingRoom extends Component {
 constructor(props) {
   super(props)
   this.state = {
     playersInGame: null
   }
 }

 componentDidMount() {
   let self = this
   let gameRef = database.ref(`games/${this.props.gameKey}`)

   gameRef.once("value")
   .then(function(snap){
     self.setState({playersInGame: snap.val().players})
   }).then(function() {
     gameRef.on('child_changed', (snap) => {
       if (snap.key === 'players'){
         self.setState({playersInGame: snap.val()})
       }
     })
   })
 }

 render() {

if(this.state.playersInGame){
  console.log("state inWaitng", this.state.playersInGame)
}
   return (
     <div>
       <h2>Welcome To Game #{this.props.code}</h2>

     </div>
   )
 }
}

