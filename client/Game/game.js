import {auth, database} from '~/fire'

class Game {
  constructor(user) {
    this.created = false
    this.state = {
      OPEN: "OPEN",
      ALL_PLAYERS_JOINED: 'ALL_PLAYERS_JOINED',
      WAITING_FOR_AUDIO: 'WAITING_FOR_AUDIO', //Host-centric
      ALL_AUDIO_RECEIVED: 'ALL_AUDIO_RECEIVED', //Host-centric
      JUDGMENT_DEALT: 'JUDGMENT_DEALT',
      CLOSED: 'CLOSED'
    }
  }


  createGame() { //THis runs onClick for SendInvitations button
    this.created = true
    let host = auth.currentUser
    let currentGame = {
      host: {
        uid: host.uid,
        displayName: host.displayName
      },
      state: this.state.OPEN
    }
    let key = database.ref('/games/' + host.uid)
    key.set(currentGame, function(error) {
      if (error) {
      } else {
        // watchGame(key)
      }
    })
  }



  watchGame(key){

  }

}

