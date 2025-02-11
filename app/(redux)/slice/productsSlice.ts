import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Products } from "~/constant/types";
import { getAllProduct } from "../(services)/api/products";


const initialState: {
    products: Products[];
    isLoading: boolean;
    error: string | null;
} = {
    products: [],
    isLoading: false,
    error: null,
};

export const getProducts = createAsyncThunk(
    "products/getAll",
    async (_, { rejectWithValue }) => {
        try {
            
            return await getAllProduct();
        } catch (error) {
            return rejectWithValue("Failed to fetch products");
        }
    }
);

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getProducts.fulfilled, (state, action: PayloadAction<Products[]>) => {
                state.products = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export default productSlice.reducer;

