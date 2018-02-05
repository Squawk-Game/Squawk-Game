import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default function Instructions() {

    console.log("inside instructions")
    return (
      <div id='instructions'>
      <div className='instructions-header' >HOW TO START A NEW GAME</div>
      <ul>
      <li>1. Log in with your Google or email account.</li>
      <li>2. Click START A NEW GAME.</li>
      <li>3. Enter the email addresses of friends you'd like to invite to play. Press SUBMIT.</li>
      <li>4. Wait for your friends. Their names will appear as they join.</li>
      <li>5. When everyone has joined or when you're ready, press SEND VIDEO.</li>
      <li>6. You will see each player's audio as they send it. Listen to each one, and choose a winner!</li>
      </ul>

      <div className='instructions-header'>HOW TO JOIN A GAME</div>
      <ul>
      <li>1. Log in with your Google or email account.</li>
      <li>2. Click JOIN A GAME.</li>
      <li>3. Enter the code you received via email and click GET SQUAWKING.</li>
      <li>4. Wait for your friends. Their names will appear as they join.</li>
      <li>5. When the judge has sent out a video, you'll automatically see it.</li>
      <li>6. The video will play twice on loop. Then you'll see a countdown telling you when to begin recording.</li>
      <li>7. Record your voice over/sound effects/dubbing. No need to click or press anything.</li>
      <li>8. Hang tight while the judge chooses the winner!.</li>
      </ul>
      <Link to='/'><button className="btn-large waves-effect waves-orange white">Back to Homepage</button></Link>
      </div>
    )

  }
