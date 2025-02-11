import { configureStore } from '@reduxjs/toolkit';
import warehousemansSlice from '../slice/warehousemansSlice'
import productSlice from '../slice/productsSlice'

const store = configureStore({
  reducer: {
    warehousemans: warehousemansSlice,
    Products: productSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
