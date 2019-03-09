import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Home from '../home';
import AddLicence from '../addLicence';
import Unauthorized from '../unauthorized';

const ProtectedRoute = ({ isAllowed, ...props }) => isAllowed
    ? <Route {...props}/>
    : <Redirect to="/unauthorized"/>;

const Switcher = (props) => (
    <Switch>
        <Route exact path="/unauthorized" component={Unauthorized}/>
        <ProtectedRoute exact isAllowed={!props.hasErrored} path="/" component={Home}/>
        <ProtectedRoute exact isAllowed={!props.hasErrored} path="/create" component={AddLicence}/>
    </Switch>
)

const mapStateToProps = (state) => {
    return {
        account: state.account,
        hasErrored: state.accountHasErrored,
        isLoading: state.accountIsLoading
    };
};

export default withRouter(connect(mapStateToProps, null)(Switcher));
