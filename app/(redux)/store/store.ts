import { configureStore } from '@reduxjs/toolkit';
import warehousemansSlice from '../slice/warehousemansSlice'; 

const store = configureStore({
  reducer: {
    warehousemans: warehousemansSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
