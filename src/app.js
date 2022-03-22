import React from 'react';
import Router from './router/index';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import './app.css';


function App() {
  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router></Router>
        </PersistGate>
      </Provider>
  )
}

export default App;