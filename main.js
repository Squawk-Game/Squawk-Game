import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux'
import App from './client/App'
import store from './client/store'

function main() {
  render(
    <AppContainer>
      <Provider store={store}>
        <App />
      </Provider>
    </AppContainer>,
    document.getElementById('main'))
}

main()

module.hot && module.hot.accept('./client/App', main)
