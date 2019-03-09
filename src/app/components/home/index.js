import React, { Component } from 'react';
import './style.scss';
import { connect } from 'react-redux';
import { fetchMarketLicences, setLicence } from '../../../app/store/actions/licence.js';
import Button from '../button';
import LicenceList from "../licenceList";

class Index extends Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {
        if (this.props.account !== '') {
            this.props.fetchMarketLicences();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.account !== '' && prevProps.account !== this.props.account) {
            this.props.fetchMarketLicences();
        }
    }

    render() {
        const { history, fetchLicences } = this.props;
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }
        return (
            <div className="home-container">
                <div className="header">
                    <h4 className="title">Licence MarketPlace</h4>
                    <Button history={history} text="New Licence" link="/create"/>
                </div>
                <div className="market-place-container">
                    {fetchLicences.length > 0 ? <LicenceList history={history} account={this.props.account} licences={fetchLicences} setLicence={this.props.setLicence}/> : null}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.account,
        hasErrored: state.accountHasErrored,
        isLoading: state.accountIsLoading,
        fetchLicences: state.fetchLicences
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMarketLicences: () => dispatch(fetchMarketLicences()),
        setLicence: (account, objectHash, price) => dispatch(setLicence(account, objectHash, price))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
