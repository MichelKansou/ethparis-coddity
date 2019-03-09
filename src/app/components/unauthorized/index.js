import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style.scss';

class Unauthorized extends Component {
    shouldComponentUpdate(nextProps) {
        if (nextProps.account !== this.props.account) {
            this.props.history.push('/')
        }
        return true
    }

    render() {
        return (
            <div className="unauthorized-container">
                <img src="./images/metamask-logo.svg" alt='Metamask logo' />
                <a href="https://metamask.io/">Please install Metamask and log in to your account</a>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.account
    };
};

export default connect(mapStateToProps, null)(Unauthorized);
