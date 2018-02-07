import React, { Component } from 'react'

import {database, auth} from '../../fire'
import history from '../history'


export default class GameOver extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gameKey: this.props.gameKey
    }
  }
  componentDidMount(){
    let timerCountdown = 5
    let flashTimer
    function timer() {
      timerCountdown--
      if (timerCountdown <= 0) {
        clearInterval(flashTimer)
        //async issues with database.ref(`games/${this.state.gameKey}`).remove()
        history.push('/')
        return
      }
      document.getElementById('gameOver').innerHTML = 'start a new game in ' + timerCountdown + ' seconds'
    }
    Promise.all([
      database.ref(`pushkeys`),
      database.ref(`games/${this.props.gameKey}/players`)
    ])
    .then(refs => {
      let pushkeysRef = refs[0]
      let playersRef = refs[1]
      playersRef.once('value').then(snapshot => {
        let playersObj = snapshot.val()
        pushkeysRef.once('value').then(snap => {
          let pushkeysObj = snap.val()
          let playerKeyVal = {}
          for (let key in pushkeysObj){
            if (playersObj.hasOwnProperty(key)){
              playerKeyVal[key] = pushkeysObj[key]
            }
          }
         // let playerKeys = Object.keys('player keys', playerKeyVal)
          let playerPushKey = Object.values(playerKeyVal)


          playerPushKey.forEach((player) => {
            let query = database.ref(`users/${player}`)
            query.once('value').then(pushKeySnap => {
              pushKeySnap.forEach(childSnap => {
                let childData = childSnap.key
                if (playerKeyVal.hasOwnProperty(childData)){
                  database.ref(`users/${player}/${childData}`).update({inGame: false})
                }
              })
            })
          })
        })
      })
    })
    .then(() => {
      flashTimer = setInterval(timer, 1000)
      return flashTimer
    })
  }

  render(){
    return (
      <div>
        <div>
          <h3 id="gameOver">Game Over!</h3>
        </div>
      </div>
    )
  }
}
