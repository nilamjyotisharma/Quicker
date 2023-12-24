import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        loading: false,
        error: null,
        success: false,
        order: {},
        orders: [],
    },
    reducers: {
        createOrderRequest: (state, action) => {
            state.loading = true;
        },
        createOrderSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.order = action.payload;
        },
        createOrderFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state, action) => {
            state.error = null;
        },
        myOrdersRequest: (state, action) => {
            state.loading = true;
        },
        myOrdersSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.orders = action.payload;
        },
        myOrdersFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
       
        
    },
});

const { createOrderRequest, createOrderSuccess, createOrderFail, clearErrors, myOrdersRequest, myOrdersSuccess, myOrdersFail } = orderSlice.actions;

export default orderSlice.reducer;

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch(createOrderRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const { data } = await axios.post(`/api/v1/order/new`, order, config);
        dispatch(createOrderSuccess(data));
    } catch (error) {
        dispatch(createOrderFail(error.response.data.message));
    }
};


export const myOrders = () => async (dispatch, getState) => {
    try {
        dispatch(myOrdersRequest());
        const { data } = await axios.get(`/api/v1/orders/me`);
        dispatch(myOrdersSuccess(data.orders));
    } catch (error) {
        dispatch(myOrdersFail(error.response.data.message));
    }
};
