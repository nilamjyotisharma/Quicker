import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const authSlice = createSlice({
    name: "authentication",
    initialState: {
        loading: false,
        error: null,
        userInfo: null,
        isAuthenticated: false,
    },
    reducers: {
        
        loginRequest: (state) => {
            state.loading = true;
            state.isAuthenticated = false;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.userInfo = action.payload;
        },
        loginFail: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        },
        signupRequest: (state) => {
            state.loading = true;
            state.isAuthenticated = false;
            },
        signupSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.userInfo = action.payload;
            },
        signupFail: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.userInfo = null;
            state.error = action.payload;
            },
        loadUserRequest: (state) => {
            state.loading = true;
            state.isAuthenticated = false;
        },
        loadUserSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.userInfo = action.payload;
        },
        loadUserFail: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.userInfo = null;
            state.error = action.payload;
        },
        logOutSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.userInfo = null;
        },
        logOutFail: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.error = action.payload;
        },
    },
});

export const { loginRequest, loginSuccess, loginFail, signupRequest, signupSuccess, signupFail, loadUserRequest, loadUserSuccess, loadUserFail, logOutSuccess, logOutFail } = authSlice.actions;

export default authSlice.reducer;


export function login(email, password){
    return async function loginThunk(dispatch, getState){
        try {
            dispatch(loginRequest());
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const {data} = await axios.post('/api/v1/login', {email, password}, config);
            dispatch(loginSuccess(data.user));
            localStorage.setItem('userInfo', JSON.stringify(data.user));
        } catch (error) {
            dispatch(loginFail(error.response.data.message));
        }
    }
}

export function signup(userData){
    return async function signupThunk(dispatch, getState){
        try {
            dispatch(signupRequest());
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            };
            const {data} = await axios.post(`/api/v1/register`, userData, config);

            dispatch(signupSuccess(data.user));

            localStorage.setItem('userInfo', JSON.stringify(data.user));
            
        } catch (error) {
            dispatch(signupFail(error.response.message));
        }
    }
}

export function loadUser(){
    return async function loadUserThunk(dispatch, getState){
        try {
            dispatch(loadUserRequest());
            const {data} = await axios.get('/api/v1/me');
            dispatch(loadUserSuccess(data.user));
            localStorage.setItem('userInfo', JSON.stringify(data.user));
        } catch (error) {
            dispatch(loadUserFail(error.response.message));
        }
    }
}

export function logOut(){
    return async function logOutThunk(dispatch, getState){
        try {
            await axios.get('/api/v1/logout');
            dispatch(logOutSuccess());
            // localStorage.setItem('userInfo', JSON.stringify(data.user));
        } catch (error) {
            dispatch(logOutFail(error.message));
        }
    }
}