import { combineReducers } from 'redux';
import { account, accountHasErrored, accountIsLoading } from './account';


export default combineReducers({
    account,
    accountHasErrored,
    accountIsLoading,
});
