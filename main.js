import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader';
import Routes from './client/Routes'

function main() {
  render(
    <AppContainer>
        <Routes />
    </AppContainer>,
    document.getElementById('main'))
}

main()

module.hot && module.hot.accept('./client/App', main)
