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
      database.ref(`games/${this.props.gameKey}/judgeId`),
      database.ref(`games/${this.props.gameKey}`)
    ])
    .then(refs => {
      let beenJudgeRef = refs[0]
      let playersRef = refs[1]
      let judgeId = refs[2]
      let gameRef = refs[3]
      let newJudgeObj = {}
      let notJudgeYetPlayers = []

      gameRef.update({audio: ''})
      gameRef.update({winningAudio: ''})


      playersRef.once('value').then(snapshot => {
        let playersObj = snapshot.val()
        return playersObj
      })
      .then(playersObj => {
        beenJudgeRef.once('value').then(snapshot => {
          let beenJudgeObj = snapshot.val()
          for (let key in playersObj) {
            if (playersObj.hasOwnProperty(key) && beenJudgeObj.hasOwnProperty(key)){
              newJudgeObj[key] = beenJudgeObj[key]
            } else if (playersObj.hasOwnProperty(key) && !beenJudgeObj.hasOwnProperty(key)){
              let obj = {[key]: playersObj[key]}
              notJudgeYetPlayers.push(obj)
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
            let individualKey = Object.keys(individualJudge) //it's the array now

            let individualValue = Object.values(individualJudge)[0]
            newJudgeObj[individualKey] = individualValue
            //update the judge id
            let filteredKey = individualKey.filter(key => {
             return newJudgeObj.hasOwnProperty(key)
            })
            judgeId.set(filteredKey[0])
            .then(() => {
              beenJudgeRef.set(newJudgeObj)
              .then(() => {
                database.ref(`games/${this.state.gameKey}`).update({ judgeState: 'WAITING_TO_START' })
              })
            })
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
