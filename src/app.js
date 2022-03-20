import React from 'react';
import Router from './router/index';
import { Provider } from 'react-redux';
import store from './redux/store';
import './app.css';


function App() {
  return (
      <Provider store={store}>
        <Router></Router>
      </Provider>
  )
}

export default App;