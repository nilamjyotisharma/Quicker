import { configureStore } from '@reduxjs/toolkit';
import productReducer from './pruducts/productSlice';
import productDetailsReducer from './pruducts/productDetailsSlice';
import authReducer from './users/authSlice';
import profileReducer from './profile/profileSlice'
import forgotPasswordReducer from './users/forgotPasswordSlice';
import cartReducer from './cart/cartSlice';
import { combineReducers } from 'redux';
import orderReducer from './orders/orderSlice';
import orderDetailsReducer from './orders/orderDetailsSlice';


const store = configureStore({
    reducer: combineReducers({
        products: productReducer,
        productDetails: productDetailsReducer,
        authentication: authReducer,
        profile: profileReducer,
        forgotPassword: forgotPasswordReducer,
        cart: cartReducer,
        order: orderReducer,
        orderDetails: orderDetailsReducer,
    }),


   

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
    });



export default store;