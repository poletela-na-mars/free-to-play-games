import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './filter/slice';
import gamesSlice from './games/slice';

export const store = configureStore({
  reducer: {
    filterSlice,
    gamesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
