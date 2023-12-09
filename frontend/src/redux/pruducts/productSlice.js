import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        loading: false,
        error: null,
    },
    reducers: {
        getProductsRequest: (state) => {
            state.loading = true;
        },
        getProductsSuccess: (state, action) => {
            state.loading = false;
            state.products = action.payload.products;
            state.productsCount = action.payload.productsCount;
            state.resultPerPage = action.payload.resultPerPage;
        },
        getProductsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {getProductsRequest, getProductsSuccess, getProductsFail} = productSlice.actions;

export default productSlice.reducer;


export function getAllProducts(keyword = '', currentPage = 1, price = [1, 50000], category, ratings = 0){
    return async function getProductsThunk(dispatch, getState){
        try {
            dispatch(getProductsRequest());


            let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${ratings}`;

            if(category){
                link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${ratings}`;
            }

            const {data} = await axios.get(link);
            dispatch(getProductsSuccess(data));


        } catch (error) {
            dispatch(getProductsFail(error.message));
        }
    }
}