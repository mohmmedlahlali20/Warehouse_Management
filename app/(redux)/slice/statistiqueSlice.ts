import { createSlice } from "@reduxjs/toolkit";
import { Statistics } from "~/constant/types"


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


const statistiqueSlice = createSlice({
    name: "statistique",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
    }
})


export default statistiqueSlice.reducer
