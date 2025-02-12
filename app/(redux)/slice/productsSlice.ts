import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Products } from "~/constant/types";
import { checkIfProductsExistByBarcode, getAllProduct, getProductsById } from "../(services)/api/products";

const initialState: {
    products: Products[];
    selectedProduct: Products | null;
    isLoading: boolean;
    error: string | null;
    productExists: boolean;
} = {
    products: [],
    selectedProduct: null,
    isLoading: false,
    error: null,
    productExists: false,
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
        console.log('slice', productId);

        try {
            return await getProductsById(productId);
        } catch (error) {
            return rejectWithValue("Failed to fetch product details");
        }
    }
);

export const checkIfProductsExist = createAsyncThunk(
    "products/checkIfProductsExist",
    async (barcode: number, { rejectWithValue }) => {
        try {
            const exists = await checkIfProductsExistByBarcode(barcode);
            return { barcode, exists };
        } catch (err) {
            return rejectWithValue("Failed to check product existence");
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
            })
            .addCase(checkIfProductsExist.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(checkIfProductsExist.fulfilled, (state, action: PayloadAction<{ barcode: number; exists: boolean }>) => {
                state.isLoading = false;
                state.productExists = action.payload.exists;
            })
            .addCase(checkIfProductsExist.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export default productSlice.reducer;
