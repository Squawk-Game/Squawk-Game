/* global describe beforeEach it */

import { expect } from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Game from '../Game'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Game', () => {
  let game
  beforeEach(() => {
    game = shallow(<Game
      game1= {
        {
        audio:{
          abcUser2: 'audioURL'
        },
        beenJudge: {
          abcUser1: 'Bob Loblaw'
        },
        code: 12345,
        judgeId: 'abcUser1',
        judgeState: 'WINNER_SENT',
        players: {
  
        },
        video: 'videoURL',
        winningAudio: ''
      }
    }

    user1 = {
      {
        email: 'bobloblaw@gmail.com',
        gameId: 'game1',
        id: 'abcUser1',
        inGame: true,
        name: 'Bob Loblaw',
        points: 0,
        pushKey: 'pushkey1',
        state: 'LOGGED_IN'
      }
    }

    user2 = {
      {
        email: 'michaelbluth@gmail.com',
        gameId: 'game1',
        id: 'abcUser2',
        inGame: true,
        name: 'Michael Bluth',
        points: 0,
        pushKey: 'pushkey2',
        state: 'LOGGED_IN'
      }
    }
    />)
  })
  describe('basic architecture', () => {
    if (game.game1.judgeState === 'WINNER_SENT') {
      it('renders the Winner Page', () => {
        console.log(game.find('Confetti'))
      })
    }
  })
})
