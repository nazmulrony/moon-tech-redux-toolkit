import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts, postProduct } from "./productsAPI";

const initialState = {
    isLoading: false,
    products: [],
    isError: false,
    error: "",
    postSuccess: false,
};

export const getProducts = createAsyncThunk(
    "products/getProducts",
    async () => {
        const products = fetchProducts();
        return products;
    }
);

export const addProduct = createAsyncThunk(
    "products/addProducts",
    async (data) => {
        const product = postProduct(data);
        return product;
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
            state.isError = false;
        });
        builder.addCase(getProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.products = [];
            state.isError = true;
            state.error = action.error.message;
        });
        builder.addCase(addProduct.pending, (state) => {
            state.isLoading = true;
            state.postSuccess = false;
            state.isError = false;
        });
        builder.addCase(addProduct.fulfilled, (state) => {
            state.isLoading = false;
            state.postSuccess = true;
        });
        builder.addCase(addProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.products = [];
            state.isError = true;
            state.error = action.error.message;
            state.postSuccess = false;
        });
    },
});

export default productsSlice.reducer;
