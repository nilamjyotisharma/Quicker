import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        loading: false,
        error: null,
        isUpdated: null,
    },
    reducers: {
        updateProfileRequest: (state) => {
            state.loading = true;
        },
        updateProfileSuccess: (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        },
        updateProfileFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateProfileReset: (state) => {
            state.isUpdated = false;
        },
        updatePasswordRequest: (state) => {
            state.loading = true;
        },
        updatePasswordSuccess: (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        },
        updatePasswordFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updatePasswordReset: (state) => {
            state.isUpdated = false;
        },
    },

});

const { updateProfileRequest, updateProfileSuccess, updateProfileFail, updateProfileReset, updatePasswordRequest, updatePasswordSuccess, updatePasswordFail, updatePasswordReset } = profileSlice.actions;

export default profileSlice.reducer;

export const updateProfile = (userData) => async (dispatch, getState) => {
    try {
        dispatch(updateProfileRequest());

        const { authentication: { userInfo } } = getState();

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/v1/me/update`, userData, config);

        dispatch(updateProfileSuccess(data.success));

    } catch (error) {
        dispatch(updateProfileFail(error.response.data.message));
    }
}

export const resetUpdateProfile = () => async (dispatch) => {
    dispatch(updateProfileReset());
}

export const updatePassword = (passwords) => async (dispatch, getState) => {
    try {
        dispatch(updatePasswordRequest());

        const { authentication: { userInfo } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/v1/password/update`, passwords, config);

        dispatch(updatePasswordSuccess(data.success));

    } catch (error) {
        dispatch(updatePasswordFail(error.response.data.message));
    }
}

export const resetUpdatePassword = () => async (dispatch) => {
    dispatch(updatePasswordReset());
}