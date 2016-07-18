import { combineReducers } from 'redux'

import {
    SEARCH_USER, INVALIDATE_USER,
    REQUEST_USER, RECEIVE_USER
} from '../actions/wepay_actions'

function searchedUser(state = '', action) {
    switch (action.type) {
        case SEARCH_USER:
            return action.email
        default:
            return state
    }
}

function user_base(state = {
    isFetching: false,
    didInvalidate: false,
    userInfo: {}
}, action) {
    switch (action.type) {
        case INVALIDATE_USER:
        return Object.assign({}, state, {
            didInvalidate: true
        })
        case REQUEST_USER:
        return Object.assign({}, state, {
            isFetching: true,
            didInvalidate: false
        })
        case RECEIVE_USER:
        return Object.assign({}, state, {
            isFetching: false,
            didInvalidate: false,
            userInfo: action.user,
            lastUpdated: action.receivedAt
        })
        default:
        return state
    }
}

function user(state = { }, action) {
    switch (action.type) {
        case INVALIDATE_USER:
        case RECEIVE_USER:
        case REQUEST_USER:
            return Object.assign({}, state, user_base(state, action))
        default:
            return state
    }
}

const wepay = combineReducers({
    searchedUser,
    user
})

export default wepay