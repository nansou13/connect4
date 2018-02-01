import React from 'react'

import { Provider } from 'react-redux'
import { render } from 'react-dom'

import { store } from './store'

import App from './containers/App'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker'

render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'))
registerServiceWorker();
