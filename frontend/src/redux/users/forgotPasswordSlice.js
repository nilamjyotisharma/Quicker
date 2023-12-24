import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const forgotPasswordSlice = createSlice({
    name: "forgotPassword",
    initialState: {
        loading: false,
        error: null,
        message: null,
    },
    reducers: {
        forgotPasswordRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        forgotPasswordSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        forgotPasswordFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        resetPasswordRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        resetPasswordSuccess: (state, action) => {
            state.loading = false;
            state.success = action.payload;
        },
        resetPasswordFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },

});

const { forgotPasswordRequest, forgotPasswordSuccess, forgotPasswordFail } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;

export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch(forgotPasswordRequest());
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post("/api/v1/password/forgot", email, config);
        dispatch(forgotPasswordSuccess(data.message));

    } catch (error) {
        dispatch(forgotPasswordFail(error.message));
    }
}

export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch(forgotPasswordRequest());
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.put(`/api/v1/password/reset/${token}`, passwords, config);
        dispatch(forgotPasswordSuccess(data.success));

    } catch (error) {
        dispatch(forgotPasswordFail(error.message));
    }
}