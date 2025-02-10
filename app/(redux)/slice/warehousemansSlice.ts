import { createSlice } from "@reduxjs/toolkit";


export interface warehousemans {
    id: number;
    name: string;
    dob: string; 
    city: string;
    secretKey: string;
    warehouseId: string;
}

const initialState: { warehousemans: warehousemans[] } = {
    warehousemans: []
};
const warehousemansSlice = createSlice({
    name: 'warehousemans',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        
    }
});



export default warehousemansSlice.reducer;


