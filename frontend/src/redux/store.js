import { configureStore } from '@reduxjs/toolkit';
import productReducer from './pruducts/productSlice';
import productDetailsReducer from './pruducts/productDetailsSlice';
import { combineReducers } from 'redux';


const store = configureStore({
    reducer: combineReducers({
        products: productReducer,
        productDetails: productDetailsReducer,
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
    });


export default store;