import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,

    LOGOUT
} from './constants';

export const login = (username, password) => ({
    type: LOGIN,
    payload: {
        username,
        password
    }
})

export const loginSuccess = token => ({
    type: LOGIN_SUCCESS,
    payload: token
})

export const loginError = error => ({
    type: LOGIN_FAILURE,
    error
})

export const logout = () => ({
    type: LOGOUT
})
