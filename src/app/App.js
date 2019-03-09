import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { web3 } from '../setup'

import './App.scss';
import { fetchMetaMaskAccount } from './store/actions/account.js';
import configureStore from './store/configureStore';
import AddLicence from "./components/addLicence";
const store = configureStore();

class App extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            address: '',
            price: null,
            file: ''
        };
    }

    async componentDidMount() {
        store.dispatch(fetchMetaMaskAccount());
        setInterval(async () => {
            const accounts = await web3.eth.getAccounts();
            if(accounts[0].toLowerCase() !== store.getState().account.toLowerCase()) {
                store.dispatch(fetchMetaMaskAccount());
                this.setState({address: store.getState().account.toLowerCase()});
            }
        }, 1000);
    }

    render() {

        return (
            <Provider store={ store }>
                <div className="app">
                    <AddLicence />
                </div>
            </Provider>
        );
    }
}

export default App;
