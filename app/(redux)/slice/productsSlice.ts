import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Products } from "~/constant/types";
import { addProduct, checkIfProductsExistByBarcode, getAllProduct, getProductsById, UpdateQuantity } from "../(services)/api/products";

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
export const updateQuantityInStock = createAsyncThunk(
    'products/updateQuantity',
    async (
        { type, productId, stokId, warehousemanId }: { type: string, productId: string, stokId: number | string, warehousemanId: number },
        { rejectWithValue }
    ) => {
        try {
            const response = await UpdateQuantity(type, productId, stokId, warehousemanId);

            if (!response.ok) {
                return rejectWithValue('Failed to fetch product');
            }

            const product = await response.json();

            if (!product || !product.stocks) {
                return rejectWithValue('Product or stocks not found');
            }

            const updatedStocks = product.stocks.map((stock: any) => {
                if (stock.id === stokId) {
                    const newQuantity = type === 'add' ? stock.quantity + 1 : stock.quantity - 1;
                    return { ...stock, quantity: newQuantity };
                }
                return stock;
            });

            const updateResponse = await fetch(`${process.env.EXPO_PUBLIC_URL}/products/${productId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    stocks: updatedStocks,
                    editedBy: [
                        ...product.editedBy,
                        { warehousemanId, at: new Date().toISOString().split('T')[0] },
                    ],
                }),
            });

            if (!updateResponse.ok) {
                return rejectWithValue('Failed to update stock');
            }

            return await updateResponse.json();
        } catch (error: any) {
            return rejectWithValue(error.message || 'An error occurred');
        }
    }
);
export const createNewProduct = createAsyncThunk("create Products",
    async ({ ProductData }: { ProductData: Products }, { rejectWithValue }) => {
        try {
            return await addProduct(ProductData)
        } catch (error) {
            return rejectWithValue('Product or stocks not found');
        }

    }
)



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
            })
            .addCase(updateQuantityInStock.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateQuantityInStock.fulfilled, (state, action) => {
                state.isLoading = false;
                const updatedProduct = action.payload;
                const updatedProductIndex = state.products.findIndex(product => product.id === updatedProduct.id);
                if (updatedProductIndex !== -1) {
                    state.products[updatedProductIndex] = updatedProduct;
                }
            })
            .addCase(updateQuantityInStock.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'An error occurred while updating stock';
            })
            .addCase(createNewProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createNewProduct.fulfilled, (state, action: PayloadAction<Products>) => {
                state.isLoading = false;
                state.products.push(action.payload);
            })
            .addCase(createNewProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'Failed to create product';
            });
            

    },
});

export default productSlice.reducer;
