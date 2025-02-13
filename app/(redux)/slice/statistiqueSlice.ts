import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Statistics } from "~/constant/types"
import { getStatistics } from "../(services)/api/statistique";


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


export const Statistique = createAsyncThunk(
    "statistics/loadStatistics",
    async ()=>{
        const response = await getStatistics();
        return response;
    }
);


const statistiqueSlice = createSlice({
    name: "statistique",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(Statistique.pending, (state)=>{
            state.isLoading=true;
        })
        .addCase(Statistique.fulfilled, (state, action)=>{ 
            state.statistique=action.payload;
            state.isLoading=false;
        })
        .addCase(Statistique.rejected, (state)=>{
            state.isLoading=false;
            state.error="Error";
        })
    }
})








export default statistiqueSlice.reducer
