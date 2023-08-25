import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FilterState } from '../../types/redux/types';

const initialState: FilterState = {
  platform: 0,
  genre: 0,
  sort: 0,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setPlatform(state, action: PayloadAction<number>) {
      state.platform = action.payload;
    },
    setGenre(state, action: PayloadAction<number>) {
      state.genre = action.payload;
    },
    setSort(state, action: PayloadAction<number>) {
      state.sort = action.payload;
    },
    setFilters(state, action) {
      state.platform = action.payload.genre;
      state.genre = action.payload.genre;
      state.sort = action.payload.sort;
    },
  }
});

export const { setPlatform, setSort, setGenre, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
