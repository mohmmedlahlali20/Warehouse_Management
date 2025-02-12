import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Statistics } from "~/constant/types"
import { getStatistique } from "../(services)/api/statistique";


const initialState: {
    statistique: Statistics;
    isLoading: boolean;
    error: string | null;
} = {
    statistique: {
        totalProducts: 0,
        outOfStock: 0,
        totalStockValue: 0,
        mostAddedProducts: [],
        mostRemovedProducts: []
    },
    isLoading: false,
    error: null
};


export const Statistique = createAsyncThunk("getStatistique",
    async (_, {rejectWithValue}) => {
        try {
            return await getStatistique()
            
        } catch (err) {
            return rejectWithValue('cannot get statistique')
        }
    }
)


const statistiqueSlice = createSlice({
    name: "statistique",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(Statistique.pending, (state) => {
            state.isLoading = true;
            state.error = null
        })
        .addCase(Statistique.fulfilled, (state, action: PayloadAction<Statistics>)=> {
            state.statistique = action.payload
            state.isLoading = false;
            state.error = null
        })
        .addCase(Statistique.rejected , (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string
        })
    }
})








export default statistiqueSlice.reducer
