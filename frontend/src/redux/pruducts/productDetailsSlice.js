import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const productDetailsSlice = createSlice({
    name: "productDetails",
    initialState: {
        product: {},
        loading: false,
        error: null,
    },
    reducers: {
        getProductDetailsRequest: (state) => {
            state.loading = true;
        },
        getProductDetailsSuccess: (state, action) => {
            state.loading = false;
            state.product = action.payload;
        },
        getProductDetailsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {getProductDetailsRequest, getProductDetailsSuccess, getProductDetailsFail} = productDetailsSlice.actions;

export default productDetailsSlice.reducer;


export function getProductDetails(id){
    return async function getProductDetailsThunk(dispatch, getState){
        try {
            dispatch(getProductDetailsRequest());
            const {data} = await axios.get(`/api/v1/product/${id}`);
            // const products = await data.json();
            dispatch(getProductDetailsSuccess(data.product));
        } catch (error) {
            dispatch(getProductDetailsFail(error.message));
        }
    }
}



