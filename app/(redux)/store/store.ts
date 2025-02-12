import { configureStore } from '@reduxjs/toolkit';
import warehousemansSlice from '../slice/warehousemansSlice'
import productSlice from '../slice/productsSlice'
import statistiqueSlice from "../slice/statistiqueSlice"

const store = configureStore({
  reducer: {
    warehousemans: warehousemansSlice,
    Products: productSlice,
    statistique: statistiqueSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
