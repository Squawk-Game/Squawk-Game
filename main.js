import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader';
import Routes from './client/Routes'

function main() {
  render(
    <AppContainer>
        <div className="app">
            <nav className="navbar">
                SQUAWK
            </nav>
            <Routes />
        </div>
    </AppContainer>,
    document.getElementById('main'))
}

main()

module.hot && module.hot.accept('./client/App', main)
