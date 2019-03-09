import { combineReducers } from 'redux';
import { account, accountHasErrored, accountIsLoading } from './account';
import { fetchLicences, licenceHasErrored, licenceIsLoading, newLicence } from './licence';


export default combineReducers({
    account,
    accountHasErrored,
    accountIsLoading,
    fetchLicences,
    licenceHasErrored,
    licenceIsLoading,
    newLicence
});
