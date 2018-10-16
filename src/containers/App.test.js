import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import App from './App';
import { store } from '../store'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
