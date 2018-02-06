import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader';
import Routes from './client/Routes'
import Navbar from './client/components/Navbar'

function main() {
  render(
    <AppContainer>
    <div>
        <Navbar />
        <div className="app">
            <Routes />
        </div>
    </div>
    </AppContainer>,
    document.getElementById('main'))
}

main()

module.hot && module.hot.accept('./client/App', main)
