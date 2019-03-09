export function accountHasErrored(state = false, action) {
    switch (action.type) {
        case 'ACCOUNT_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function accountIsLoading(state = false, action) {
    switch (action.type) {
        case 'ACCOUNT_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function account(state = '', action) {
    switch (action.type) {
        case 'ACCOUNT_FETCH_DATA_SUCCESS':
            return action.account;

        default:
            return state;
    }
}
