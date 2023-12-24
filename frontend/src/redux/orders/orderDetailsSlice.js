import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const orderDetailsSlice = createSlice({
    name: 'orderDetail',
    initialState: {
        loading: true,
        error: null,
        success: false,
        orderInfo: [],
    },
    reducers: {
        getOrderDetailsRequest: (state, action) => {
            state.loading = true;
        },
        getOrderDetailsSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.orderInfo = action.payload;
        },
        getOrderDetailsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        
    },

});

const { getOrderDetailsRequest, getOrderDetailsSuccess, getOrderDetailsFail } = orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;


export const getOrderInfo = (id) => async (dispatch) => {
    try {
        dispatch(getOrderDetailsRequest());
        const { data } = await axios.get(`/api/v1/order/${id}`);
        dispatch(getOrderDetailsSuccess(data.order));
    } catch (error) {
        dispatch(getOrderDetailsFail(error.response.data.message));
    }
};

