import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Constants from "expo-constants";


const API_URL = Constants.expoConfig?.extra?.URL_JSON_SERVER
export interface Warehouseman {
    id: number;
    name: string;
    dob: string;
    city: string;
    secretKey: string;
    warehouseId: string;
}

const initialState: { warehousemans: Warehouseman[]; loading: boolean; error: string | null } = {
    warehousemans: [],
    loading: false,
    error: null
};

export const login = createAsyncThunk(
    "warehousemans/login",
    async ({ name, secretKey }: { name: string; secretKey: string }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/warehousemans`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, secretKey })
            });

            if (!response.ok) {
                throw new Error("Échec de la connexion");
            }

            const data = await response.json();
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const register = createAsyncThunk(
    "warehousemans/register",
    async ({ name, secretKey, birthday,city }: { name: string; secretKey: string; birthday: string, city:string }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/warehousemans`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, secretKey, birthday, city })
            });

            if (!response.ok) {
                throw new Error("Échec de l'inscription");
            }

            const data = await response.json();
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);


export const checkUserIfExist = createAsyncThunk(
    "warehousemans/checkUserIfExist",
    async (secretKey: string, { rejectWithValue }) => {
      try {
        const response = await fetch(`${API_URL}/warehousemans?secretKey=${secretKey}`);
        const data = await response.json();
        return { exists: data.length > 0 };
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );


const warehousemansSlice = createSlice({
    name: "warehousemans",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.warehousemans = [action.payload]; 
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.warehousemans.push(action.payload);
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(checkUserIfExist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkUserIfExist.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.exists) {
                    console.log("Utilisateur trouvé");
                } else {
                    console.log("Aucun utilisateur avec ce secretKey");
                }
            })
            .addCase(checkUserIfExist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default warehousemansSlice.reducer;
