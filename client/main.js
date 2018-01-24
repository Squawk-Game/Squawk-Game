import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux'
import Routes from './Routes'
import store from './store'

function main() {
  render(
    <AppContainer>
      <Provider store={store}>
        <Routes />
      </Provider>
    </AppContainer>,
    document.getElementById('main'))
}

main()

module.hot && module.hot.accept('./Routes', main)
