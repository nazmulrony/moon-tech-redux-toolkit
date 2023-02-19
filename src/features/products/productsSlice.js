import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteProduct, fetchProducts, postProduct } from "./productsAPI";

const initialState = {
    isLoading: false,
    products: [],
    isError: false,
    error: "",
    postSuccess: false,
    deleteSuccess: false,
};

export const getProducts = createAsyncThunk(
    "products/getProducts",
    async () => {
        const products = await fetchProducts();
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

export const removeProduct = createAsyncThunk(
    "products/deleteProduct",
    async (id, thunkApi) => {
        const product = await deleteProduct(id);
        thunkApi.dispatch(removeFromList(id));

        return product;
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        togglePostSuccess: (state) => {
            state.postSuccess = false;
        },

        toggleDeleteSuccess: (state) => {
            state.deleteSuccess = false;
        },
        removeFromList: (state, action) => {
            state.products = state.products.filter(
                (product) => product._id !== action.payload
            );
        },
    },
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
        builder.addCase(removeProduct.pending, (state) => {
            state.isLoading = true;
            state.deleteSuccess = false;
            state.isError = false;
        });
        builder.addCase(removeProduct.fulfilled, (state) => {
            state.isLoading = false;
            state.deleteSuccess = true;
        });
        builder.addCase(removeProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.products = [];
            state.isError = true;
            state.error = action.error.message;
            state.deleteSuccess = false;
        });
    },
});

export const { togglePostSuccess, toggleDeleteSuccess, removeFromList } =
    productsSlice.actions;

export default productsSlice.reducer;
