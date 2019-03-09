import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { web3 } from '../setup'

import logo from '../logo.svg';
import './App.css';
import { fetchMetaMaskAccount } from './store/actions/account.js';
import configureStore from './store/configureStore';
const store = configureStore();

class App extends Component {
  componentDidMount() {
    store.dispatch(fetchMetaMaskAccount());

    setInterval(function() {
      if(store.getState().account.toLowerCase() !== web3.eth.accounts[0]) {
        store.dispatch(fetchMetaMaskAccount());
      }
    }, 100);
  }

  render() {
    return (
        <Provider store={ store }>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </div>
        </Provider>
    );
  }
}

export default App;
