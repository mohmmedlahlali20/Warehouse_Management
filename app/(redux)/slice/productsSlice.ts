import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Products } from "~/constant/types";
import { addProduct, checkIfProductsExistByBarcode, getAllProduct, getProductsById, removeProductById, UpdateQuantity } from "../(services)/api/products";

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
    async (barcode: string, { rejectWithValue }) => {

            const Product = await checkIfProductsExistByBarcode(barcode);
            return Product ;
       
    }
);

export const createNewProduct = createAsyncThunk(
    "create Products",
    async ({ ProductData }: { ProductData: Products }, { rejectWithValue }) => {
        try {
            return await addProduct(ProductData)
        } catch (error) {
            return rejectWithValue('Product or stocks not found');
        }

    }
)
export const updateQuantityInStock = createAsyncThunk(
    'products/updateQuantity',
    async (
        { type, productId, stokId, warehousemanId }: { type: string; productId: string; stokId: string | number; warehousemanId: number }    ) => {

            const product = await UpdateQuantity(type, productId, stokId as string, warehousemanId);

            console.log("Updating selectedProduct state:",product);

            return product;
       
    }
);



export  const deleteProductById = createAsyncThunk('remove Products', async( productId: string, {rejectWithValue})=>{
    try {
        return await removeProductById(productId);
    } catch (error) {
        return rejectWithValue('cannot remove products');

    }
})



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
            .addCase(checkIfProductsExist.fulfilled, (state, action: PayloadAction<Products>) => {
                state.isLoading = false;
                state.selectedProduct = {...action.payload};
                console.log('fulfilled',action.payload);
                
            })
            .addCase(checkIfProductsExist.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })





            .addCase(updateQuantityInStock.pending, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(updateQuantityInStock.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedProduct = action.payload ;
            })
            .addCase(updateQuantityInStock.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || "An error occurred";
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
            })
            .addCase(deleteProductById.pending, (state)=>{
                state.isLoading = true;
                state.error = null
            })
            .addCase(deleteProductById.fulfilled, (state, action) => {
                state.isLoading =  false;
                state.selectedProduct = action.payload ;
            })
            .addCase(deleteProductById.rejected, (state, action) => {
                state.isLoading = true;
                state.error = action.payload as string
            })


    },
});

export default productSlice.reducer;
