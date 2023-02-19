import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const selectedProduct = state.cart.find(
                (product) => product._id === action.payload._id
            );
            if (!selectedProduct) {
                state.cart.push({ ...action.payload, quantity: 1 });
            } else {
                selectedProduct.quantity += 1;
                // state.cart = state.cart
                //     .filter((product) => product._id !== selectedProduct._id)
                //     .push(selectedProduct);
            }
        },

        //
        //
        //
        //
        removeFromCart: (state, action) => {
            const selectedProduct = state.cart.find(
                (product) => product._id === action.payload._id
            );
            console.log(selectedProduct.quantity);
            if (selectedProduct.quantity > 1) {
                selectedProduct.quantity -= 1;
            } else {
                state.cart = state.cart.filter(
                    (product) => product._id !== selectedProduct._id
                );
            }
        },
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
