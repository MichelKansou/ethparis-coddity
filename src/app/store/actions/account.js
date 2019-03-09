import { web3 } from '../../../setup'

export function accountHasErrored(bool) {
    return {
        type: 'ACCOUNT_HAS_ERRORED',
        hasErrored: bool
    };
}

export function accountIsLoading(bool) {
    return {
        type: 'ACCOUNT_IS_LOADING',
        isLoading: bool
    };
}

export function accountFetchDataSuccess(account) {
    return {
        type: 'ACCOUNT_FETCH_DATA_SUCCESS',
        account
    };
}

export function fetchMetaMaskAccount() {
    return (dispatch) => {
        dispatch(accountIsLoading(true));
        if (window.web3 && window.web3.currentProvider) {
            web3.eth.getAccounts((error, accounts) => {
                dispatch(accountIsLoading(false));
                if(error != null) { dispatch(accountHasErrored(true)) }
                web3.eth.defaultAccount = accounts[0];
                accounts[0] != null ? dispatch(accountFetchDataSuccess(accounts[0])) : dispatch(accountHasErrored(true))
            })
        } else {
            dispatch(accountHasErrored(true))
        }
    }
}
