import {web3, printerContract} from '../../../setup'

export function licenceHasErrored(bool) {
    return {
        type: 'LICENCE_HAS_ERRORED',
        hasErrored: bool
    };
}

export function licenceIsLoading(bool) {
    return {
        type: 'LICENCE_IS_LOADING',
        isLoading: bool
    };
}

export function licenceFetchDataSuccess(marketLicences) {
    return {
        type: 'LICENCE_FETCH_DATA_SUCCESS',
        marketLicences
    };
}

export function createLicenceSuccess(licence) {
    return {
        type: 'CREATE_LICENCE_SUCCESS',
        licence
    };
}

export function fetchMarketLicences() {
    return async (dispatch) => {
        dispatch(licenceIsLoading(true));
        fetch('https://ethparis.herokuapp.com/all_piece', {
            method: 'get',
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(licences => {
            if (licences != null) {
                console.log(licences);
                dispatch(licenceIsLoading(false));
                dispatch(licenceFetchDataSuccess(licences));
            }
        });
    }
}

export function createLicence(account, payload) {
    return async (dispatch) => {
        dispatch(licenceIsLoading(true));
        console.log({
            "price": payload.price,
            "file": payload.file.toString(),
            "public_key": account
        });
        fetch('https://ethparis.herokuapp.com/new_product', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "price": payload.price,
                "file": payload.file.toString(),
                "public_key": account
            })
        })
        .then(response => response.json())
        .then(objectHash => {
            if (objectHash != null) {
                console.log(objectHash);
                printerContract.methods.createLicence(objectHash).send({from: account})
                    .on('receipt', (receipt) => {
                        dispatch(licenceIsLoading(false));
                        dispatch(createLicenceSuccess(receipt));
                    })
                    .on('error', () => {
                        dispatch(licenceHasErrored(true));
                        dispatch(licenceIsLoading(false));
                    });
            }
        });

    }
}

export function setLicence(account, objectHash, price) {
    return async (dispatch) => {
        dispatch(licenceIsLoading(true));
        if (objectHash != null) {
            console.log(objectHash);
            printerContract.methods.setLicence(objectHash).send({from: account, value: web3.utils.toWei(price > "1" ? "1": price , "ether")})
                .on('receipt', (receipt) => {
                    dispatch(licenceIsLoading(false));
                    dispatch(createLicenceSuccess(receipt));
                })
                .on('error', () => {
                    dispatch(licenceHasErrored(true));
                    dispatch(licenceIsLoading(false));
                });
        }

    }
}
