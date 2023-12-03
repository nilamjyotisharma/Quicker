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
        },
        getProductsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {getProductsRequest, getProductsSuccess, getProductsFail} = productSlice.actions;

export default productSlice.reducer;

export function getAllProducts(){
    return async function getProductsThunk(dispatch, getState){
        const {data} = await axios.get("/api/v1/products");
        // const products = await data.json();
        dispatch(getProductsSuccess(data));
    }
}

// export function getAllProducts(keyword = '', currentPage = 1, price, category, rating = 0){
//     return async function getProductsThunk(dispatch, getState){
//         try {
//             dispatch(getProductsRequest());
//             let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`;

//             if(category){
//                 link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`;
//             }

//             const {data} = await axios.get(link);
//             // const products = await data.json();
//             dispatch(getProductsSuccess(data));
//         } catch (error) {
//             dispatch(getProductsFail(error.message));
//         }
//     }
// }