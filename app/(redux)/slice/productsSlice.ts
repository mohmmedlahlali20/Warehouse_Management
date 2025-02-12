import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Products } from "~/constant/types";
import { getAllProduct, getProductsById } from "../(services)/api/products";

const initialState: {
    products: Products[];
    selectedProduct: Products | null;
    isLoading: boolean;
    error: string | null;
} = {
    products: [],
    selectedProduct: null,
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

export const getProductById = createAsyncThunk(
    "products/details",
    async (productId: string, { rejectWithValue }) => {

        
        try {
            return await getProductsById(productId);
        } catch (error) {
            return rejectWithValue("Failed to fetch product details");
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
            })
            .addCase(getProductById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getProductById.fulfilled, (state, action: PayloadAction<Products>) => {
                state.selectedProduct = action.payload;
                state.isLoading = false;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export default productSlice.reducer;
