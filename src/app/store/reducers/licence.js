export function licenceHasErrored(state = false, action) {
    switch (action.type) {
        case 'LICENCE_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function licenceIsLoading(state = false, action) {
    switch (action.type) {
        case 'LICENCE_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function newLicence(state = {}, action) {
    switch (action.type) {
        case 'CREATE_LICENCE_SUCCESS':
            return action.licence;

        default:
            return state;
    }
}

export function fetchLicences(state = {}, action) {
    switch (action.type) {
        case 'LICENCE_FETCH_DATA_SUCCESS':
            return action.marketLicences;
        default:
            return state;
    }
}
