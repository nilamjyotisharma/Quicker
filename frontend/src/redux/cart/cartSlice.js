import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        loading: false,
        error: null,
        success: false,
        shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {},
    },
    reducers: {
        cartAddItem: (state, action) => {
            const item = action.payload;
            const isItemExist = state.cartItems.find((cartItem) => cartItem.product === item.product);
            if (isItemExist) {
                state.cartItems = state.cartItems.map((cartItem) =>
                cartItem.product === isItemExist.product ? item : cartItem
                );
            } else {
                state.cartItems = [...state.cartItems, item];
            }
        },
        cartRemoveItem: (state, action) => {
            state.cartItems = state.cartItems.filter((cartItem) => cartItem.product !== action.payload);
        },
        saveShippingInfo: (state, action) => {
            state.shippingInfo = action.payload;
        },
    },
});

const { cartAddItem, cartRemoveItem, saveShippingInfo } = cartSlice.actions;

export default cartSlice.reducer;

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch(cartAddItem({
        product: data.product._id,
        name: data.product.name,
        desc: data.product.description,
        image: data.product.images[0].url,
        price: data.product.price,
        stock: data.product.Stock,
        qty,
    }));
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

    //getState() is used to get the current state of the application
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch(cartRemoveItem(id));
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingDetails = (data) => (dispatch) => {
    dispatch(saveShippingInfo(data));
    localStorage.setItem("shippingInfo", JSON.stringify(data));
};