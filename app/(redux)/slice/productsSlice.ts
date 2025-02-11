import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Products } from "~/constant/types";
import { getAllProduct } from "../(services)/api/products";




const initialState: {
    product: Products | null;
    isLoading: boolean;
    error: string | null
} = {
    product: null,
    isLoading: true,
    error: null
};

export const getProducts = createAsyncThunk('Product', async (_, { rejectWithValue }) => {
    try {
        const fetchProducts = await getAllProduct()
        return fetchProducts;
    } catch (err) {
        console.log('error log', err);
        return rejectWithValue("Failed to fetch products");

    }
})





const producSlice = createSlice({
    name: "Products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProducts.fulfilled, (state, action: PayloadAction<Products[]>) => {
                state.product = action.payload;
                state.isLoading = false;
                state.error = null;
            })
    }
})


export default producSlice.reducer