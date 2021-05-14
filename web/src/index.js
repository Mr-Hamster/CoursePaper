import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";
import { Router } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/reducer'

export const store = createStore(reducer);

window.history_ = require('history').createBrowserHistory();

ReactDOM.render((
  <Provider store={store}>
    <Router history={window.history_}>
      <App />
    </Router>
  </Provider>
  ), document.getElementById('root'))