import {addError, clearError} from "./errors"

export const REQUEST_ACCOUNT = 'REQUEST_ACCOUNT'
export const RECEIVE_ACCOUNT = 'RECEIVE_ACCOUNT'
export const SEARCH_ACCOUNT = 'SEARCH_ACCOUNT'
export const INVALIDATE_ACCOUNT = 'INVALIDATE_ACCOUNT'
export const CLEAR_ACCOUNTS = "CLEAR_ACCOUNTS"

export function searchAccount(account_id = null) {
    return {
        type: SEARCH_ACCOUNT,
        account_id: account_id
    }
}

export function invalidateAccount(account_id = null) {
    return {
        type: INVALIDATE_ACCOUNT,
        account_id: account_id
    }
}

function requestAccount(account_id = null) {
    return {
        type: REQUEST_ACCOUNT,
        account_id: account_id
    }
}

function receiveAccount(account_id = null, json) {
    return {
        type: RECEIVE_ACCOUNT,
        account_id: account_id,
        accounts: json,
        receivedAt: Date.now()
    }
}

function fetchAccount(email=null, account_id = null) {
    return dispatch => {
        dispatch(requestAccount(account_id));
        
        return $.post("/account", {"email":email, "account_id":account_id})
            .fail(function(data){
                console.log("ERROR: ", data);
                var error_data = data.responseJSON;
                dispatch(addError(error_data));
            })
            .done(function(data){
                dispatch(receiveAccount(account_id, data));
                dispatch(clearError());
            })
    }
}

function shouldFetchAccount(state, account_id = null) {
    if(state.wepay_user.isFetching){
        return false;
    }
    else {
        return true;
    }
    return false;
}

export function fetchAccountIfNeeded(email=null, account_id=null) {
    return (dispatch, getState) => {
        if (shouldFetchAccount(getState(), account_id)) {
            return dispatch(fetchAccount(email, account_id))
        }
    }
}

export function clearAccounts() {
    return {
        type: CLEAR_ACCOUNTS
    }
}