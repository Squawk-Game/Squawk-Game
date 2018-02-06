import React, { Component } from 'react'

import {database, auth} from '../../fire'


export default class StartNewRound extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gameKey: this.props.gameKey
    }
  }
  componentDidMount(){
    Promise.all([
      database.ref(`games/${this.props.gameKey}/beenJudge`),
      database.ref(`games/${this.props.gameKey}/players`),
      database.ref(`games/${this.props.gameKey}/judgeId`)
    ])
    .then(refs => {
      console.log('refs are ', refs)
      let beenJudgeRef = refs[0]
      let playersRef = refs[1]
      let judgeId = refs[2]
      let newJudgeObj = {}
      let notJudgeYetPlayers = []

      console.log('VALUES ', beenJudgeRef, playersRef, judgeId)

      playersRef.once('value').then(snapshot => {
        let playersObj = snapshot.val()
        console.log('playersObj is ', playersObj)
        return playersObj
      })
      .then(playersObj => {
        beenJudgeRef.once('value').then(snapshot => {
          let beenJudgeObj = snapshot.val()
          for (let key in playersObj) {
            if (playersObj.hasOwnProperty(key) && beenJudgeObj.hasOwnProperty(key)){
              console.log('EACH KEY /OBJ pair', beenJudgeObj[key])
              newJudgeObj[key] = beenJudgeObj[key]
            } else if (playersObj.hasOwnProperty(key) && !beenJudgeObj.hasOwnProperty(key)){
              console.log('key is ', key)
              let obj = {[key]: playersObj[key]}
              console.log('obj is', obj)
              notJudgeYetPlayers.push(obj)
              console.log('ELSE IF ', notJudgeYetPlayers)
            }
          }
          return notJudgeYetPlayers
        })
        .then(notJudgeYetPlayers => {
          if (notJudgeYetPlayers.length){
            //pick new judge from array
            let judgeIndex = Math.floor(Math.random() * notJudgeYetPlayers.length)
            //add new judge to new judge Obj
            let individualJudge = notJudgeYetPlayers[judgeIndex]
            let individualKey = Object.keys(individualJudge)[0]
            let individualValue = Object.values(individualJudge)[0]
            newJudgeObj[individualKey] = individualValue
            //update the judge id

            judgeId.set(individualKey)
            beenJudgeRef.set(newJudgeObj)
            database.ref(`games/${this.state.gameKey}`).update({ judgeState: 'WAITING_TO_START' })
          } else {
            database.ref(`games/${this.state.gameKey}`).update({ judgeState: 'GAME_CLOSED' })
          }
        })
      })

    })
  }

  render(){
    return (
      <div>
        <div>
          <h3>Picking new judge... get ready to get squawkward!</h3>
        </div>
      </div>
    )
  }
}

// this will happen inside a set timeout for next round starting database.ref(`games/${this.props.gameKey}`).update({judgeState: 'GAME_CLOSED'})
